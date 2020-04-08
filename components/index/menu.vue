<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="leaveNav">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in menu" :key="index" @mouseenter="currentIndex=index">
        <i :class="item.type" />
        {{ item.name }}
        <span class="arrow" />
      </dd>
    </dl>
    <div v-if="currentIndex!=-1" class="detail" @mouseenter="showDetail" @mouseleave="currentIndex=-1">
      <template v-for="(item,index) in currentDetail">
        <h4 :key="index">{{ item.title }}</h4>
        <span v-for="detail in item.child" :key="detail">
          {{ detail }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import menuData from './menuData'
export default {
  data () {
    return {
      currentIndex: -1,
      menu: menuData
    }
  },
  computed: {
    currentDetail () {
      return this.menu[this.currentIndex].child
    }
  },
  methods: {
    leaveNav () {
      this._timer = setTimeout(() => {
        this.currentIndex = -1
      }, 100)
    },
    showDetail () {
      clearTimeout(this._timer)
    }

  }
}
</script>

<style>

</style>
