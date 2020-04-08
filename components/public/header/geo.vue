<template>
  <div class="m-geo">
    <i class="el-icon-location" />
    <span>{{ $store.state.geo.city }}</span>
    <nuxt-link to="/changeCity" class="changeCity">切换城市</nuxt-link>
    [上海 杭州 深圳]
  </div>
</template>

<script>
export default {
  data () {
    return {
      city: ''
    }
  },
  mounted () {
    // if (!this.$store.state.geo.city) {
    //   const _this = this
    //   this.$axios.get('http://cp-tools.cn/geo/getPosition')
    //     .then(({ status, data: { city, province } }) => {
    //       if (status === 200) {
    //         _this.$store.commit('geo/setPosition', { city, province })
    //       } else {
    //         alert('获取位置信息失败')
    //       }
    //     })
    // }
  }
}
</script>

<style>
</style>
