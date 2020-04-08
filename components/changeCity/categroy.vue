<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="letter in letters" :key="letter">
        <a :href="'#city-'+letter">{{ letter }}</a>
      </dd>
    </dl>
    <dl v-for="(item,index1) in cityCategroy" :key="index1" class="m-categroy-section">
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd>
        <span v-for="(city,index2) in item.cities" :key="index2">
          {{ city }}
        </span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pinyin from 'js-pinyin'
import cityOfProvince from './city-province'
export default {
  data () {
    return {
      letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      cityCategroy: {}
    }
  },
  mounted () {
    // const allcities = []
    const temp = {}
    for (const pid in cityOfProvince) {
      for (const city of cityOfProvince[pid]) {
        let name
        if (city.name === '市辖区') {
          name = city.province
        } else {
          name = city.name
        }
        const p = pinyin.getFullChars(name).slice(0, 1)
        if (!temp[p]) {
          temp[p] = []
        }
        temp[p].push(name)
      }
    }
    const cityCategroy = []
    for (const [k, v] of Object.entries(temp)) {
      cityCategroy.push({
        title: k,
        cities: v
      })
    }
    cityCategroy.sort((a, b) => {
      return a.title.charCodeAt() - b.title.charCodeAt()
    })
    this.cityCategroy = cityCategroy
  }
}
</script>

<style lang='scss'>
  @import '@/assets/css/changecity/categroy.scss';
</style>
