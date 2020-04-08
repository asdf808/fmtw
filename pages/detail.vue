<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :keyword="keyword" :type="type" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summar :meta="product" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="m-title">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <list v-if="login" :list="list" />
        <div
          v-else
          class="deal-need-login">
          <img
            src="/img/public/pleaselogin.png"
            alt="登录查看"
          >
          <span>请登录后查看详细团购优惠</span>
          <el-button type="primary" round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs'
import Summar from '@/components/detail/summary'
import List from '@/components/detail/list'
export default {
  components: {
    Crumbs,
    Summar,
    List
  },
  async asyncData (ctx) {
    const { keyword, type } = ctx.query
    const { status, data: { product, more: list } } = await ctx.$axios.get('http://cp-tools.cn/search/products', {
      params: {
        city: ctx.store.state.geo.city,
        keyword,
        type
      }
    })
    let login
    const { status: status2, data: { user } } = await ctx.$axios.get('/user/getUser')
    if (status2 === 200 && user) {
      login = true
    } else {
      login = false
    }
    if (status === 200) {
      return {
        keyword,
        type,
        product,
        list,
        login
      }
    } else {
      return {
        keyword: '',
        type: '',
        product: {},
        list: [],
        login
      }
    }
  },
  data () {
    return {
      keywords: '',
      type: '',
      product: {},
      list: [],
      login: false
    }
  },
  computed: {
    canOrder () {
      return this.list.filter(item => item.photos.length).length
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/detail/index.scss'
</style>
