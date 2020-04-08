import Router from 'koa-router'
import Order from '../dbs/models/order'
import Cart from '../dbs/models/cart'
import generateUUID from './utils/generateUUID'

const router = new Router({
  prefix: '/order'
})

router.post('/createOrder', async (ctx) => {
  const { params: { id: cartNo, price, count } } = ctx.request.body
  const time = Date()
  const orderId = generateUUID()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'Please login'
    }
  } else {
    console.log(cartNo)
    const cart = await Cart.findOne({ cartNo })
    console.log(cart)
    const order = new Order({
      id: orderId,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: cart.detail[0].name,
      img: cart.detail[0].imgs[0],
      status: 0
    })
    try {
      const result = await order.save()
      if (result) {
        await cart.remove()
        ctx.body = {
          code: 0,
          id: orderId
        }
      } else {
        ctx.body = {
          code: -1,
          msg: 'error'
        }
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: error
      }
    }
  }
})

router.post('/getOrders', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'Please login'
    }
  } else {
    try {
      const result = await Order.find({ user: ctx.session.passport.user })
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          list: [],
          msg: 'error'
        }
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        list: [],
        msg: error
      }
    }
  }
})

export default router

// 👴是什么？爷的意思，一般用来尊称长辈。一群年轻人，用爷自称，这本身就体现了一种不尊重。
// 其次，为什么用👴自称，因为他不自信。把自己叫的老一点，年纪大一点，给自己的胡作非为套上一层倚老卖老的面纱。无怪乎现在的人感叹：不是老人变坏了，是坏人变老了。
// 第三，把爷说成👴，用图片表述文字，这说明了什么。试想一下，在你幼年，在人类的早期，尚未识字的阶段，是否都会用图片表述自己要表达的意思？他们作为21世纪的新人，还在用图片表意，这说明什么，说明他们文化程度低，文化又低又不自信，用👴来自称给自己壮胆。
// 综上所述，用👴的人一般道德修养品味都很低。

// 👴除外。
