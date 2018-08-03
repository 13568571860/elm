<template>
  <div class="search">
    <search-header :opction="opction"></search-header>
    <search-form></search-form>
    <search-content class="content"></search-content>
    <search-footer></search-footer>
  </div>
</template>

<script>
import SearchHeader from '@/components/header'
import SearchForm from './components/searchForm'
import SearchContent from './components/content'
import SearchFooter from '@/components/footer'
export default {
  name: 'search',
  components: {
    SearchHeader,
    SearchFooter,
    SearchForm,
    SearchContent
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
          text: '搜索'
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .search
    background #f5f5f5
    height 100%
    display flex
    flex-direction column
    justify-content space-between
    .content
      flex 1
</style>
