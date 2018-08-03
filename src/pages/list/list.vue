<template>
  <div class="list">
    <search-header :opction="opction"></search-header>
  </div>
</template>

<script>
import SearchHeader from '@/components/header'
export default {
  name: '',
  components: {
    SearchHeader
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
          text: this.$route.params.category
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list
    height 100%
    display flex
    flex-direction column
    justify-content space-between
</style>
