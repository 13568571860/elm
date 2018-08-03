<template>
  <div>
    <div>
      <search-lists :data="search.inside['0'].restaurant_with_foods"></search-lists>
      
    </div>
  </div>
</template>

<script>
import SearchLists from '@/components/lists'
export default {
  name: 'searchContent',
  components: {
    SearchLists
  },
  computed: {
    search () {
      return this.$store.state.search
    }
  }
}
</script>

<style lang="stylus" scoped>
  
</style>
