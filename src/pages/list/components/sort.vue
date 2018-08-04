<template>
  <div class="content">
    <ul>
      <li
        v-for="item in sort"
        :key="item.value"
        :class="{active: isActive === item.name}"
        @click="handleClick(item)"
      >
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sort',
  data () {
    return {
      isActive: '综合排序'
    }
  },
  computed: {
    sort () {
      return this.$store.state.sort
    }
  },
  methods: {
    handleClick (item) {
      this.isActive = item.name
      this.$emit('hide', item.name)
      this.$store.dispatch('search', {
        'search_text': this.$route.params.category,
        offset: 0,
        order_by: item.value
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content
    position absolute
    z-index 1000
    top 101%
    left 0
    width 10rem
    border-bottom 1px solid #ccc
    transform-origin center top
    li
      background #f3f3f3
      border-bottom 1px solid #ccc
      padding-left .63rem
    .active
     background #ffffff
     color #333
     font-weight 400
</style>
