<template>
  <div class="search clearfix">
    <form action="#" @submit.prevent="searchSubmit" class="form">
      <el-input
        placeholder="请输入商家或美食名称"
        v-model="search_text"
        clearable>
      </el-input>
      <el-button type="primary" native-type="submit">提交</el-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'searchForm',
  data () {
    return {
      search_text: ''
    }
  },
  methods: {
    searchSubmit () {
      this.$store.dispatch('search', {'search_text': this.search_text, offset: 0})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .search
    background #fff
    height auto
    padding-bottom .19rem
  .search >>> .form
    padding-left .53rem
    padding-top .33rem
    .el-input
      width 75%
      .el-input__inner
        height auto
        font-size .41rem
        line-height .93rem
        background #f5f5f5
    .el-button
      font-size .41rem
      line-height .59rem
      margin-left .27rem
</style>
