<template>
  <div class="m-iselect">
    <span class="name">请选择省份</span>
    <el-select v-model="selectedProvince" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="selectedCity" :disabled="isDisabled" placeholder="城市 ">
      <el-option
        v-for="item in cities"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import province from './province'
import cityOfProvince from './city-province'
export default {
  data () {
    return {
      province,
      cities: [],
      allcities: [],
      isDisabled: true,
      selectedProvince: '',
      selectedCity: '',
      searchList: [],
      state: ''
    }
  },
  watch: {
    selectedProvince (newVal) {
      this.isDisabled = false
      this.cities = cityOfProvince[newVal]
    }
  },
  mounted () {
    // console.log(cityOfProvince)
    for (const pid in cityOfProvince) {
      for (const city of cityOfProvince[pid]) {
        this.allcities.push(city)
      }
    }
  },
  methods: {
    querySearchAsync (queryString, cb) {
      console.log(queryString)
      const results = this.allcities.filter((city) => {
        if (!queryString) {
          return true
        }
        return city.name.toLowerCase().includes(queryString.toLowerCase())
      }).map((city) => {
        return { value: `${city.name}, ${city.province}` }
      })
      console.log(results)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000)
    },
    handleSelect () {
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/changecity/iselect.scss';
</style>
