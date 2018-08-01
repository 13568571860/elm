<template>
  <div>
    <item-header :item="headerItem"></item-header>
    <item-nav></item-nav>
    <div class="soperItem">
      <item-soper></item-soper>
    </div>
    <item-car></item-car>
    <item-message-box></item-message-box>
    <item-car-item></item-car-item>
  </div>
</template>

<script>
import ItemHeader from './components/header'
import ItemNav from './components/nav'
import ItemSoper from './components/soper'
import ItemCar from './components/car'
import ItemMessageBox from './components/message'
import ItemCarItem from './components/carItem'
export default {
  name: 'item',
  components: {
    ItemHeader,
    ItemNav,
    ItemSoper,
    ItemCar,
    ItemMessageBox,
    ItemCarItem
  },
  data () {
    return {
      headerItem: {}
    }
  },
  methods: {
    getMerchant (xhr) {
      this.headerItem = xhr.data
    }
  },
  created () {
    let shopId = this.$router.currentRoute.params.shopId
    this.axios.get('/shopping/restaurant/' + shopId).then(this.getMerchant)
  },
  beforeRouteLeave (to, from, next) {
    let buyCar = this.$store.state.buyCar
    localStorage.buyCar = JSON.stringify(buyCar)
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .soperItem
    position absolute
    top 3.73rem
    left 0
    right 0
    bottom 1.27rem
</style>
