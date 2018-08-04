<template>
  <div class="list">
    <list-header :opction="opction"></list-header>
    <list-nav :nav="nav"></list-nav>
    <div class="main">
      <list-lists :list="list" @jiazai="jiazai"></list-lists>
    </div>
  </div>
</template>

<script>
import ListHeader from '@/components/header'
import ListNav from './components/nav'
import ListLists from '@/components/lists'
export default {
  name: 'list',
  components: {
    ListNav,
    ListHeader,
    ListLists
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
      },
      nav: [{
        id: 1,
        text: this.$route.params.category,
        com: 'KeyList'
      }, {
        id: 2,
        text: '排序',
        com: 'Sort'
      }, {
        id: 3,
        text: '筛选',
        com: 'Support'
      }],
      list: []
    }
  },
  computed: {
    searchResult () {
      return this.$store.state.search
    }
  },
  watch: {
    searchResult () {
      if (this.searchResult.inside['0']) {
        this.search_text = this.searchResult.inside['0'].highlights[0]
        this.list = this.searchResult.inside['0'].restaurant_with_foods
      } else {
        this.list = []
      }
    }
  },
  methods: {
    searchKey (key, offset) {
      this.$store.dispatch('search', {
        search_text: key,
        offset
      })
    },
    jiazai () {
      this.searchKey(this.nav[0].text, this.searchResult.inside['0'].restaurant_with_foods.length)
    },
    getAllList (xhr, xml, support) {
      xhr.data.shift()
      this.$store.commit('allList', xhr.data)
      this.$store.commit('sort', xml.data.inside_sort_filter)
      this.$store.commit('support', support.data)
    },
    getNavKeyData (address) {
      return this.axios.get(`/shopping/v2/restaurant/category?latitude=${address.latitude}&longitude=${address.longitude}`)
    },
    getNavSortData (address) {
      return this.axios.get(`/shopping/v1/restaurants/outside_filter/attributes?latitude=${address.latitude}&longitude=${address.longitude}&terminal=h5`)
    },
    getsupportData (address) {
      return this.axios.get(`/shopping/v1/restaurants/filter-bar/attributes?latitude=${address.latitude}&longitude=${address.longitude}&terminal=h5`)
    }
  },
  created () {
    let address = JSON.parse(localStorage.address)
    this.searchKey(this.$route.params.category, 0)
    this.axios.all([this.getNavKeyData(address), this.getNavSortData(address), this.getsupportData(address)]).then(this.axios.spread(this.getAllList))
  }
}
</script>

<style lang="stylus" scoped>
  .list
    height 100%
    .main
      position absolute
      top 2.35rem
      left 0
      right 0
      bottom 0
</style>
