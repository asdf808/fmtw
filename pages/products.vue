<template>
  <div class="page-product">
    <crumbs :keyword="keyword" />
    <el-row>
      <el-col :span="19">
        <categroy :areas="areas" :types="types" />
        <list :list="list" />
      </el-col>
      <el-col :span="5">
        <amap />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/products/crumbs'
import Categroy from '@/components/products/categroy'
import List from '@/components/products/list'
import Amap from '@/components/public/map'
export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Amap
  },
  async asyncData (ctx) {
    const keyword = ctx.query.keyword

    const city = ctx.store.state.geo.city
    const { status, data: { areas, types } } = await ctx.$axios.get('http://cp-tools.cn/categroy/crumbs', {
      params: {
        city
      }
    })
    const { status: status2, data: { count, pois } } = await ctx.$axios.get('http://cp-tools.cn/search/resultsByKeywords', {
      params: {
        city,
        keyword
      }
    })
    if (status === 200 && status2 === 200 && count > 0) {
      return {
        keyword,
        list: pois.filter(item => item.photos.length).map(item => ({
          name: item.name,
          type: item.type,
          img: item.photos[0].url,
          comment: Math.floor(Math.random() * 10000),
          rate: item.biz_ext.rating.length ? Number(item.biz_ext.rating) : Math.floor(10 + Math.random() * 40) / 10,
          scene: item.tag,
          tel: item.tel,
          status: '可订明日',
          location: item.location,
          module: item.type.split(';')[0],
          price: item.biz_ext.cost.length ? item.biz_ext.cost : '0.00'
        })),
        areas: areas.filter(item => item.type !== '').slice(0, 5),
        types: types.filter(item => item.type !== '').slice(0, 5),
        point: (pois.find(item => item.location).location || '').split(',')
      }
    } else {
      return {
        keyword
      }
    }
  },
  data () {
    return {
      keyword: ''
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/products/index.scss'
</style>
