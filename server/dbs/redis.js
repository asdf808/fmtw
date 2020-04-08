import Redis from 'koa-redis'

const url = 'redis://localhost:6379'
const authPass = '123456'
export default new Redis({
  url,
  auth_pass: authPass
})
