<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="(item,index) in hotCityList"
        :key="index"
        @click="changeCity(item.name)"
      >
        {{ item.name }}
      </dd>
    </dl>
  </div>
</template>

<script>
import hotCity from './hot-city'
export default {
  data () {
    return {
      hotCity
    }
  },
  computed: {
    hotCityList () {
      return this.hotCity.map(item => ({
        name: item.name === '市辖区' ? item.province : item.name
      }))
    }
  },
  methods: {
    changeCity (city) {
      this.$store.commit('geo/setPosition', { city })
      console.log(this.$store.state.geo.city)
      // window.location.href = '/'
    }
  }
}
</script>

<style lang='scss' scope>
  @import '@/assets/css/changecity/hot.scss';
  .m-hcity dl dd {
    cursor: pointer;
  }
</style>
