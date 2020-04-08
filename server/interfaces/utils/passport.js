import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async (username, password, done) => {
  const where = {
    username
  }
  const result = await UserModel.findOne(where)
  if (result) {
    if (result.password === password) {
      done(null, result)
    } else {
      done(null, result, '密码错误')
    }
  } else {
    done(null, result, '用户不存在')
  }
}))

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  return done(null, user)
})

export default passport
