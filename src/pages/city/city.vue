<template>
  <div class="city">
    <city-header :opction="opction"></city-header>
    <div class="siteList" ref="scroll">
      <div>
        <city-search></city-search>
        <city-site-list></city-site-list>
      </div>
    </div>
  </div>
</template>

<script>
import CityHeader from '@/components/header'
import CitySearch from './components/search'
import CitySiteList from './components/siteList'
export default {
  name: 'city',
  components: {
    CityHeader,
    CitySearch,
    CitySiteList
  },
  data () {
    return {
      opction: {
        left: {
          icon: 'icon-jiantou4',
          handleClick: () => {
            this.$router.go(-1)
          }
        },
        center: {
          text: '数据获取中...'
        },
        right: {
          text: '切换城市',
          handleClick: () => {
            this.$router.push('/cityList')
          },
          css: {
            'font-size': '.37rem',
            'text-align': 'right',
            'font-weight': '200'
          }
        }
      }
    }
  },
  methods: {
    getCity (xhr) {
      this.opction.center.text = xhr.data.name
    }
  },
  created () {
    let cityId = this.$router.currentRoute.params.id
    this.axios.get('/v1/cities/' + cityId).then(this.getCity)
  },
  mounted () {
    this.scroll = new this.Bscroll(this.$refs.scroll, {
      click: true
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'home') {
      let obj = {
        name: to.query.name,
        address: to.query.address,
        latitude: to.query.latitude,
        longitude: to.query.longitude
      }
      localStorage.address = JSON.stringify(obj)
      let his = localStorage.his
      his = his ? JSON.parse(his) : []
      let lock = his.some(item => {
        return item.name === obj.name
      })
      if (!lock) his.unshift(obj)
      localStorage.his = JSON.stringify(his)
    }
    next()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .siteList
    background $container
    position absolute
    overflow hidden
    top 1.32rem
    left 0
    right 0
    bottom 0
</style>
