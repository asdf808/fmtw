export default {
  dbUrl: 'mongodb://root:123456@101.132.102.217:27017/mt-app?authSource=admin',
  radis: {
    get host () {
      return '101.132.102.217'
    },
    get port () {
      return 6379
    }
  },
  smtp: {
    get host () {
      return 'smtp.qq.com'
    },
    get user () {
      return '1045303254@qq.com'
    },
    get pass () {
      return 'pnutzedtixnubcgb'
    },
    get code () {
      return Math.random().toString(36).slice(2, 6).toUpperCase()
    },
    get expire () {
      return Date.now() + 10 * 60 * 1000
    }
  }
}
