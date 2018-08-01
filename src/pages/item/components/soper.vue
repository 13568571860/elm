<template>
  <div>
    <item-sidebar :soper="soper" :floor="floor" ref="sidebar"></item-sidebar>
    <item-soper-main :soper="soper"></item-soper-main>
  </div>
</template>

<script>
import ItemSidebar from './sidebar'
import ItemSoperMain from './soperMain'
export default {
  name: 'soper',
  components: {
    ItemSidebar,
    ItemSoperMain
  },
  data () {
    return {
      soper: {},
      floor: 0
    }
  },
  methods: {
    getMenu (xhr) {
      this.soper = xhr.data
    }
  },
  created () {
    let shopId = this.$router.currentRoute.params.shopId
    this.axios.get(`/shopping/v2/menu?restaurant_id=${shopId}`).then(this.getMenu)
  }
}
</script>

<style lang="stylus" scoped>

</style>
