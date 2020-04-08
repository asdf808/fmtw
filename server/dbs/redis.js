import Redis from 'koa-redis'

const url = 'redis://101.132.102.217:6379'
const authPass = '123456'
export default new Redis({
  url,
  auth_pass: authPass
})
