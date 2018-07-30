<template>
  <swiper class="swiper"  :options="swiperOptions" v-if="nav.length">
    <swiper-slide v-for="(list, idx) in nav" :key="idx">
      <ul>
        <el-col
          tag="li"
          :span="6"
          v-for="item in list"
          :key="item.id"
        >
          <img :src="'https://fuss10.elemecdn.com/' + item.image_url" alt="">
          <p>{{item.title}}</p>
        </el-col>
      </ul>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  name: 'homeNav',
  props: {
    axios: Function
  },
  data () {
    return {
      nav: [],
      swiperOptions: {
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  methods: {
    home_nav (xhr) {
      let len = xhr.data.length
      for (let i = 0; i < len; i++) {
        if (i % 8 === 0) this.nav.push([])
        this.nav[this.nav.length - 1].push(xhr.data[i])
      }
    }
  },
  created () {
    this.axios.get('/v2/index_entry').then(this.home_nav)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .swiper >>> .swiper-pagination
    bottom -0.13rem
    .swiper-pagination-bullet
      width .21rem
      height .21rem
      margin 0 .13rem
  .swiper
    padding .01rem 0 .37rem
    background $fff
    margin-bottom $pad
  ul
    text-align center
    li
      padding .19rem 0
    img
      width 1.12rem
      margin 0 auto .19rem
    p
      font-size .35rem
      line-height .48rem
</style>
