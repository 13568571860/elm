<template>
  <el-header height="auto" class="clearfix">
    <el-col :span="8">
      <p @click="handleBackClick">
        <span class="iconfont icon-jiantou4"></span>
      </p>
    </el-col>
    <el-col :span="8" class="cen">{{city.name}}</el-col>
    <el-col :span="8" class="right">
      <router-link to="/cityList">切换城市</router-link>
    </el-col>
  </el-header>
</template>

<script>
export default {
  name: 'Cityheader',
  data () {
    return {
      city: {
        name: '获取数据中...'
      }
    }
  },
  methods: {
    getCity (xhr) {
      this.city = xhr.data
    },
    handleBackClick () {
      window.history.go(-1)
    }
  },
  created () {
    let cityId = this.$router.currentRoute.params.id
    this.axios.get('/v1/cities/' + cityId).then(this.getCity)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .el-header
    background $bgColor
    color $fff
    line-height 1.2rem
    margin-bottom $pad
    a
      color $fff
    .iconfont
      font-size .64rem
    .cen
      text-align  center
      font-size .49rem
      font-weight 400
    .right
      text-align right
      font-size .37rem
</style>
