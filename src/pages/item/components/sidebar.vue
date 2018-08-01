<template>
  <div class="sidebar" ref="scroll">
    <ul v-if="soper">
      <li
        v-for="(item, idx) in soper"
        :key="item.id"
        :class="{active: idx === floors}"
        ref="li"
        @click="handleClick(idx)"
      >
        <img :src="item.icon_url ? 'https://fuss10.elemecdn.com/5/da/3872d782f707b4c82ce4607c73d1ajpeg.jpeg' : ''" alt="" v-if="item.icon_url">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: ['soper', 'floor'],
  computed: {
    floors () {
      return this.$store.state.floor
    }
  },
  mounted () {
    this.scroll = new this.Bscroll(this.$refs.scroll, {
      click: true
    })
  },
  methods: {
    handleClick (y) {
      this.$store.dispatch('changeActiveSidebar', y)
      this.$store.dispatch('changeSidebar', y)
    }
  },
  watch: {
    floors () {
      this.scroll.scrollToElement(this.$refs.li[this.floors], 100)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .sidebar
    overflow hidden
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    width 2.37rem
    li
      background-color #f5f5f5
      padding .43rem .39rem
      border-bottom 1px solid #ccc
      nowrap()
      img
        display inline-block
        width .29rem
        margin-right .13rem
      span
        font-size .333rem
        line-height .53rem
    .active
      background-color #fff
      border-left .07rem solid #3190e8
</style>
