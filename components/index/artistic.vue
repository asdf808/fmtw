<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点"
      >
        全部
      </dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食"
      >
        约会聚餐
      </dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人"
      >
        丽人SPA
      </dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影"
      >
        电影演出
      </dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游"
      >
        品质出游
      </dd>
    </dl>
    <ul class="ibody">
      <li v-for="item in cur" :key="item.timestamp">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur () {
      return this.list[this.kind]
    }
  },
  async mounted () {
    const _this = this
    const keyword = '景点'
    const { status, data: { count, pois } } = await this.$axios.get('http://cp-tools.cn/search/resultsByKeywords', {
      params: {
        keyword,
        city: _this.$store.state.geo.city
      }
    })
    if (status === 200 && count > 0) {
      const res = pois.filter(item => item.photos.length).map(item => ({
        title: item.name,
        pos: item.type.split(';')[0],
        price: item.biz_ext.cost.length ? item.biz_ext.cost[0] : '暂无价格',
        img: item.photos[0].url,
        url: '#'
      }))
      _this.list.all = res.slice(0, 9)
    }
  },
  methods: {
    async over (e) {
      const dom = e.target
      const tag = dom.tagName.toLowerCase()
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        if (this.list[this.kind].length === 0) {
          const _this = this
          const keyword = dom.getAttribute('keyword')
          const { status, data: { count, pois } } = await this.$axios.get('http://cp-tools.cn/search/resultsByKeywords', {
            params: {
              keyword,
              city: _this.$store.state.geo.city
            }
          })
          if (status === 200 && count > 0) {
            const res = pois.filter(item => item.photos.length).map(item => ({
              title: item.name,
              pos: item.type.split(';')[0],
              price: item.biz_ext.cost.length ? item.biz_ext.cost[0] : '暂无价格',
              img: item.photos[0].url,
              timestamp: item.timestamp,
              url: '#'
            }))
            _this.list[_this.kind] = res.slice(0, 9)
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
