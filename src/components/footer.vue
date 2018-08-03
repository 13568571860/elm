<template>
  <div class="footer">
    <router-link :to="item.link" v-for="(item, idx) in data" :key="idx">
      <el-col :span="6" class="active">
        <span class="iconfont" :class="item.icon"></span>
        <p>{{item.text}}</p>
      </el-col>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'comFooter',
  data () {
    return {
      data: [{
        icon: 'icon-changyonglogo40',
        text: '首页',
        link: '/'
      }, {
        icon: 'icon-zhinanzhen',
        text: '发现',
        link: '/search'
      }, {
        icon: 'icon-dingdanyichenggong',
        text: '订单',
        link: '/order'
      }, {
        icon: 'icon-daohanglan-05',
        text: '我的',
        link: '/mein'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .footer
    border 1px solid #ccc
    height 1.21rem
    padding-top .14rem
    background #fff
    .el-col
      text-align center
      .iconfont
        font-size .63rem
        display block
        line-height .6rem
      .icon-changyonglogo40
        font-size .90rem
      p
        font-size .32rem
        line-height .45rem
    .active
      color #409EFF
</style>
