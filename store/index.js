import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo
  },
  actions: {
    async nuxtServerInit (cxt, { req, app }) {
      // const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
      // cxt.commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })

      // const { status: status2, data: { result } } = await app.$axios.get('/search/hotPlace', {
      //   params: {
      //     city: app.store.state.geo.position.city.replace('市', '')
      //   }
      // })
      // cxt.commit('/home/setHotPlace', status2 === 200 ? result : [])
      const { status, data: { city } } = await app.$axios.get('http://cp-tools.cn/geo/getPosition')
      cxt.commit('geo/setPosition', status === 200 ? { city: '北京' } : { city })
    }
  }
})

export default store
