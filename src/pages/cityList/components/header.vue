<template>
  <el-header height="auto" class="clearfix">
    <router-link to="/cityList">
      <el-col tag="h1" :span="12">饿了么</el-col>
    </router-link>
    <el-col :span="12" class="login">
      <router-link to="/login">
        登录 | 注册
      </router-link>
    </el-col>
  </el-header>
</template>

<script>
export default {
  name: 'cityHeader'
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .el-header
    background $bgColor
    .el-col
      color #fff
      font-size .37rem
      font-weight 200
      a
        color #fff
    .login
      text-align right
</style>
