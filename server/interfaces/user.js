import Router from 'koa-router'
import Mailer from 'nodemailer'
import Redis from '../dbs/redis'
import UserModel from '../dbs/models/users'
import Config from '../dbs/config'
import Passport from './utils/passport'
// import axios from './utils/axios'
const router = new Router({
  prefix: '/user'
})

const redisClient = Redis.client
router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body
  if (!username) {
    ctx.body = {
      code: -1,
      msg: '用户名不能为空'
    }
    return
  }
  if (!password) {
    ctx.body = {
      code: -1,
      msg: '密码不能为空'
    }
    return
  }

  if (code) {
    const saveCode = await redisClient.hget(`mail${username}`, 'code')
    const saveExpire = await redisClient.hget(`mail${username}`, 'expire')
    if (code === saveCode) {
      if (Date.now() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期,请重新发送'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证码错误'
      }
    }
  }
  const user = await UserModel.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户名已被使用'
    }
    return
  }
  const newUser = UserModel.create({
    username,
    password,
    email
  })
  if (newUser) {
    ctx.body = {
      code: 0,
      msg: '注册成功'
    }
    return true
  //   const res = await axios.post('/users/signin', { username, password })
  //   if (res.data && res.data.code === 0) {
  //     ctx.body = {
  //       code: 0,
  //       msg: '注册成功',
  //       user: res.data.user
  //     }
  //   } else {
  //     ctx.body = {
  //       code: -1,
  //       msg: 'error'
  //     }
  //   }
  // } else {
  //   ctx.body = {
  //     code: -1,
  //     msg: '注册失败'
  //   }
  }
})

router.post('/signin', (ctx, next) => {
  return Passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else if (user) {
      ctx.body = {
        code: 0,
        msg: '登录成功',
        user
      }
      return ctx.login(user)
    } else {
      ctx.body = {
        code: 1,
        msg: info
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => {
  const username = ctx.request.body.username
  const saveExpire = await redisClient.hget(`mail${username}`, 'expire')
  if (saveExpire && Date.now() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁'
    }
    return false
  }
  const transporter = Mailer.createTransport({
    host: Config.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Config.smtp.user,
      pass: Config.smtp.pass
    }
  })
  const recv = {
    code: Config.smtp.code,
    expire: Config.smtp.expire,
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  const mailOptions = {
    from: `认证邮件 <${Config.smtp.user}>`,
    to: recv.email,
    subject: '<仿美团网> 注册码',
    html: `<仿美团网>  您正在进行注册操作,验证码是${recv.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return false
    } else {
      redisClient.hmset(`mail${recv.user}`, 'code', recv.code, 'expire', recv.expire, 'email', recv.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送,有效期10分钟'
  }
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: '退出成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '退出失败'
    }
  }
})

router.get('/getUser', (ctx) => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router
