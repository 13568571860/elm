<template>
  <div class="search">
    <form action="#" @submit.prevent="searchSite">
      <el-input
        v-model="site"
        placeholder="输入学校、商务楼、地址"
        class="input_text"
      >
      </el-input>
      <el-button type="primary" native-type="submit">提交</el-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      site: ''
    }
  },
  methods: {
    searchSite () {
      this.axios.get(`/v1/pois?city_id=${this.$router.currentRoute.params.id}&keyword=${this.site}&type=search`).then(this.siteList)
    },
    siteList (xhr) {
      this.$store.dispatch('searchCity', xhr.data)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .search >>> .el-input__inner
    line-height .88rem
    font-weight 200
    color #666
    height auto
  .search
    background $fff
    padding .25rem .49rem
    .el-input
      height .88rem
      font-size .4rem
      line-height .88rem
    .el-button
      width 100%
      font-size .4rem
      line-height .44rem
      font-weight 200
      background $bgColor
</style>
