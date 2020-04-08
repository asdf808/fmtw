<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="/img/public/meituan-logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" placeholder="搜索" @input="getSearch" @focus="isFocus=true" @blur="handleBlur" />
          <el-button type="primary"><i class="el-icon-search" /></el-button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,idx) in hotPlace.slice(0,5)" :key="idx">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item,idx) in searchList" :key="idx">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <p class="suggset">
          <a
            v-for="(item,idx) in hotPlace.slice(0,5)"
            :key="idx"
            :href="'/products?keyword='+encodeURIComponent(item.name)"
          >
            {{ item.name }}
          </a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿／公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single" />
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue" />
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFocus: false,
      search: '',
      hotPlace: [],
      searchList: []
    }
  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.search
    },
    isSearchList () {
      return this.isFocus && this.search
    }
  },
  mounted () {
    const _this = this
    // if (!this.$store.state.geo.city) {
    //   const _this = this
    //   await this.$axios.get('http://cp-tools.cn/geo/getPosition')
    //     .then(({ status, data: { city, province } }) => {
    //       if (status === 200) {
    //         _this.$store.commit('geo/setPosition', { city, province })
    //       } else {
    //         alert('获取位置信息失败')
    //       }
    //     })
    // }
    this.$axios.get('http://cp-tools.cn/search/hotPlace', {
      params: {
        city: _this.$store.state.geo.city.replace('市', '')
      }
    }).then(({ status, data: { result } }) => {
      // console.log(result)
      _this.hotPlace = result
    })
  },
  methods: {
    handleFocus () {
      this.isFocus = true
    },
    handleBlur () {
      setTimeout(() => {
        this.isFocus = false
      }, 300)
    },
    getSearch () {
      if (this.search) {
        const _this = this
        this.$axios.get('http://cp-tools.cn/search/top', {
          params: {
            city: _this.$store.state.geo.city.replace('市', ''),
            input: _this.search
          }
        }).then(({ status, data: { top } }) => {
          _this.searchList = top.slice(0, 10)
        })
      }
    }
  }
}
</script>
