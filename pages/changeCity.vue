<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iselect />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot-city />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HotCity from '@/components/changeCity/hotCity'
import Category from '@/components/changeCity/categroy'
import Iselect from '@/components/changeCity/iselect'
export default {
  components: {
    Iselect,
    HotCity,
    Category
  }
}
</script>

<style>

</style>
