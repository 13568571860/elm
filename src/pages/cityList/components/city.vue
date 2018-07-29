<template>
  <el-main>
    <el-row class="head">
      <el-col :span="10" class="atCity">当前定位城市:</el-col>
      <el-col :span="14" class="posi">定位不准时,请在城市列表中选择</el-col>
    </el-row>
    <el-row class="dis">
      <el-col :span="12" class="city">
        <router-link :to="'city/' + city.id">
          {{city.name}}
        </router-link>
      </el-col>
      <router-link :to="'city/' + city.id">
        <el-col class="iconfont icon-jiantou" :span="2" :push="10"></el-col>
      </router-link>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'city',
  props: ['axios'],
  data () {
    return {
      city: '未定位'
    }
  },
  methods: {
    atCity (xhr) {
      this.city = xhr.data
    },
    defeated () {
      this.city = '定位失败,请手动定位'
    }
  },
  created () {
    this.axios.get('/v1/cities?type=guess').then(this.atCity).catch(this.defeated)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .el-main
    padding 0
    background $fff
    margin-bottom $pad
    .head
      font-size .35rem
      line-height .91rem
      font-weight 300
      padding-top $pad
      border-bottom $bottom
      .atCity
        padding-left $pad
      .posi
        text-align right
        padding-right $pad
    .dis
      border-bottom $bottom
      .city
        padding-left $pad
        font-size .48rem
        font-weight 400
        line-height 1.12rem
        a
          color $color
      a
        display block
      .iconfont
        font-size .37rem
        font-weight 400
</style>
