<template>
  <div>
    <item-header :item="headerItem"></item-header>
    <item-nav></item-nav>
    <div class="soperItem">
      <transition name="el-fade-in">
        <component :is="isShow ? 'item-soper' : 'item-evaluate'"></component>
      </transition>
    </div>
    <item-car></item-car>
    <item-message-box></item-message-box>
    <item-car-item></item-car-item>
    <item-shade></item-shade>
    <item-commodity-details></item-commodity-details>
  </div>
</template>

<script>
import ItemHeader from './components/header'
import ItemNav from './components/nav'
import ItemSoper from './components/soper'
import ItemEvaluate from './components/evaluate'
import ItemCar from './components/car'
import ItemMessageBox from './components/message'
import ItemCarItem from './components/carItem'
import ItemShade from './components/shade'
import ItemCommodityDetails from './components/commodityDetails'
export default {
  name: 'item',
  components: {
    ItemHeader,
    ItemNav,
    ItemSoper,
    ItemEvaluate,
    ItemCar,
    ItemMessageBox,
    ItemCarItem,
    ItemShade,
    ItemCommodityDetails
  },
  data () {
    return {
      headerItem: {}
    }
  },
  computed: {
    isShow () {
      return this.$store.state.switchCon
    }
  },
  methods: {
    getMerchant (xhr) {
      this.headerItem = xhr.data
      this.$store.commit('restaurant', xhr.data)
    }
  },
  created () {
    this.$store.commit('switchCon', true)
    let shopId = this.$router.currentRoute.params.shopId
    this.axios.get('/shopping/restaurant/' + shopId).then(this.getMerchant)
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
