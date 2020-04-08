import Router from 'koa-router'
import axios from './utils/axios'
const router = new Router({
  prefix: '/search'
})

router.get('/top', async (ctx) => {
  const { status, data: { top } } = await axios.get('http://cp-tools.cn/search/top', {
    params: {
      city: ctx.query.city,
      input: ctx.query.input
    }
  })
  if (status === 200) {
    ctx.body = {
      top
    }
  } else {
    ctx.body = {
      top: []
    }
  }
})

router.get('/hotPlace', async (ctx) => {
  const { status, data: { result } } = await axios.get('http://cp-tools.cn/search/hotPlace', {
    params: {
      city: ctx.query.city
    }
  })
  if (status === 200) {
    ctx.body = {
      result
    }
  } else {
    ctx.body = {
      result: []
    }
  }
})
