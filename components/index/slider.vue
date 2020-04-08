<template>
  <div class="slide">
    <el-carousel trigger="click" height="240px">
      <el-carousel-item v-for="item in imgUrl" :key="item">
        <div class="small" :style="{background: 'url(\''+item+'\')'}" />
      </el-carousel-item>
      <!-- <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item> -->
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgUrl: [
        '/img/life/slider/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png',
        '/img/life/slider/33ff80dc00f832d697f3e20fc030799560495.jpg',
        '/img/life/slider/826a5ed09dab49af658c34624d75491861404.jpg',
        '/img/life/slider/a97baf515235f4c5a2b1323a741e577185048.jpg'
      ]
    }
  }
}
</script>

<style>
  .el-carousel__item div.small {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    height: 100%;
    width: 100%;
    background-size: 100% 100% !important;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
