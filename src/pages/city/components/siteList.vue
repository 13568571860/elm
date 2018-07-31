<template>
  <div>
    <ul v-if="show" class="address">
      <li v-for="item in search" :key="item.geohash">
        <router-link :to="'/home?name=' + item.name + '&address=' + item.address + '&latitude=' + item.latitude + '&longitude=' + item.longitude">
          <h5>{{item.name}}</h5>
          <p>{{item.address}}</p>
        </router-link>
      </li>
    </ul>
    <p v-else>搜索历史</p>
  </div>
</template>

<script>
export default {
  name: 'siteList',
  data () {
    return {
      show: false
    }
  },
  computed: {
    search () {
      if (!this.$store.state.searchHis.message) {
        return this.$store.state.searchHis
      }
    }
  },
  watch: {
    search () {
      if (this.$store.state.searchHis.message) {
        this.show = false
      } else {
        this.show = true
      }
    }
  },
  created () {
    this.search.splice(0)
    this.state = this.$store.state
    try {
      let his = JSON.parse(localStorage.his)
      let date = new Date()
      date.setDate(date.getDate() + 3)
      document.cookie = `change_add=true;expires=${date.toUTCString()}`
      Array.prototype.push.apply(this.search, his)
      this.show = true
    } catch (err) {
      this.show = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  p
    padding-left $pad
    border-bottom $bottom
    border-top $bottom
    font-size .32rem
    line-height .48rem
    color #000
  .address
    background $fff
    border $bottom
    li
      padding .4rem
      padding-bottom .35rem
      border-bottom $bottom
      h5
        font-size .4rem
        line-height .56rem
        font-weight 300
        margin 0
        color #333
        margin-bottom .3rem
      p
        border 0 none
        color #666
        line-height .32rem
        padding 0
        margin-bottom .35rem
        nowrap()
</style>
