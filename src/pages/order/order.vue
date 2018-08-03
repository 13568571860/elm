<template>
  <div class="order">
    <search-header :opction="opction"></search-header>
    <search-footer></search-footer>
  </div>
</template>

<script>
import SearchHeader from '@/components/header'
import SearchFooter from '@/components/footer'
export default {
  name: '',
  components: {
    SearchHeader,
    SearchFooter
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
          text: '订单列表'
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .order
    height 100%
    display flex
    flex-direction column
    justify-content space-between
</style>
