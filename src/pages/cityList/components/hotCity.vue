<template>
  <div class="hot">
    <h3>热门城市</h3>
    <ul class="clearfix">
      <el-col tag="li" :span="6" v-for="item in hotCityList" :key="item.id" v-if="hotCityList.length">
        <router-link :to="'/city/' + item.id">{{item.name}}</router-link>
      </el-col>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hotCity',
  data () {
    return {
      hotCityList: []
    }
  },
  methods: {
    hot (xhr) {
      this.hotCityList = xhr.data
    }
  },
  created () {
    this.axios.get('/v1/cities?type=hot').then(this.hot)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .hot
    background $fff
    margin-bottom $pad
    h3
      border-bottom $bottom
      padding-left $pad
      font-weight 200
      font-size .35rem
      line-height .91rem
      color #333
    ul
      .el-col
        text-align center
        border-left $bottom
        border-bottom $bottom
        a
          color $color
          line-height 1.09rem
      .el-col:nth-child(1),
      .el-col:nth-child(5)
        border-left 0 none
</style>
