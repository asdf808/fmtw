import Router from 'koa-router'
// import axios from './utils/axios'
// import md5 from 'crypto-js/md5'
import Cart from '../dbs/models/cart'
import generateUUID from './utils/generateUUID'

const router = new Router({
  prefix: '/cart'
})

router.post('/create', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'Please login'
    }
  } else {
    const time = Date()
    const cartNo = generateUUID()
    const { params: { id, detail } } = ctx.request.body
    const cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    const result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        id: cartNo,
        msg: ''
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'create fail'
      }
    }
  }
})

router.post('/getCart', async (ctx) => {
  const { params: { id: cartNo } } = ctx.request.body
  try {
    const result = await Cart.findOne({ cartNo })
    // console.log(result)
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})
export default router
