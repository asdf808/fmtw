export default {
  dbUrl: 'mongodb://127.0.0.1:27017/mt-app',
  radis: {
    get host () {
      return '127.0.0.1'
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
      return 'xxxxx@qq.com'
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
