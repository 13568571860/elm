<template>
  <div class="nav clearfix">
    <el-col v-for="item in navData" :key="item.id" :span="8" @click.native="handleClick(item)">
      <span>{{item.text}}</span>
      <i class="iconfont icon-jiantouarrow486"  :class="{'active_icon': isShow === item.com}"></i>
    </el-col>
    <transition name="key">
      <component :is="isShow" @hide="hideNav" :keySort="keySort"></component>
    </transition>
  </div>
</template>

<script>
import KeyList from './keyList'
import Sort from './sort'
import Support from './support'
export default {
  name: 'listNav',
  props: ['nav'],
  components: {
    KeyList,
    Sort,
    Support
  },
  data () {
    return {
      isShow: 0,
      navData: this.nav
    }
  },
  computed: {
    keySort () {
      return [this.nav[0].text, this.nav[1].text]
    }
  },
  methods: {
    handleClick (item) {
      switch (item.id) {
        case 1:
          this.$store.commit('changeState', 1)
          this.isShow = item.com === this.isShow ? '' : 'KeyList'
          break
        case 2:
          this.$store.commit('changeState', 2)
          this.isShow = item.com === this.isShow ? '' : 'Sort'
          break
        case 3:
          this.$store.commit('changeState', 3)
          this.isShow = item.com === this.isShow ? '' : 'Support'
      }
    },
    hideNav (names) {
      if (names) {
        this.navData[1].text = names
      }
      this.isShow = 0
    }
  }
}
</script>

<style lang="stylus" scoped>
  .key-enter-active, .key-leave-active
    transform scale(1, 1) !important
    transition all .2s
  .key-enter, .key-leave-to
    transform scale(1, 0) !important
    opacity 0 !important
  .nav
    border-bottom 1px solid #ccc
    position relative
  .el-col
    text-align center
    color #333
    font-weight 300
    border-right 1px solid #ccc
    .iconfont:before
      font-size .33rem
      display inline-block
      color #666
      transition all .3s
    .active_icon:before
      transform rotate(180deg)
  .el-col:last-child
    border 0 none
</style>
