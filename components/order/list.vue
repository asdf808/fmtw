<template>
  <div class="m-order">
    <ul>
      <li v-if="current.length">
        <el-row v-for="(item,index) in current" :key="index">
          <el-col :span="4">
            <img :src="item.img">
          </el-col>
          <el-col :span="10">
            <h4>{{ item.name }}</h4>
            <p>数量：{{ item.count }}</p>
          </el-col>
          <el-col :span="4">
            总价：￥{{ item.total }}
          </el-col>
          <el-col :span="6">
            {{ item.statusTxt }}
          </el-col>
        </el-row>
      </li>
      <li v-else class="empty">
        没有订单
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Array,
      required: true
    }
  }
}
</script>
