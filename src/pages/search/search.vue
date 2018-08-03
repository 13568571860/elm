<template>
  <div class="search">
    <search-header :opction="opction"></search-header>
    <search-form></search-form>
    <div class="main">
      <search-lists class="content" :list="list" @jiazai="jiazai"></search-lists>
    </div>
    <search-footer></search-footer>
  </div>
</template>

<script>
import SearchHeader from '@/components/header'
import SearchForm from './components/searchForm'
import SearchLists from '@/components/lists'
import SearchFooter from '@/components/footer'
export default {
  name: 'search',
  components: {
    SearchHeader,
    SearchFooter,
    SearchForm,
    SearchLists
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
      },
      list: []
    }
  },
  computed: {
    search () {
      return this.$store.state.search
    }
  },
  watch: {
    search () {
      this.search_text = this.search.inside['0'].highlights[0]
      this.list = this.search.inside['0'].restaurant_with_foods
    }
  },
  methods: {
    jiazai () {
      this.$store.dispatch('search', {
        'search_text': this.search_text,
        offset: this.search.inside['0'].restaurant_with_foods.length
      })
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
    .main
      flex 1
      position relative
</style>
