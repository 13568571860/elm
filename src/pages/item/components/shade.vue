<template>
  <div class="shade" @click="hide" v-show="show"></div>
</template>

<script>
export default {
  name: 'shade',
  computed: {
    show () {
      return this.$store.state.lock
    }
  },
  methods: {
    hide () {
      this.$store.dispatch('upTopCar', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shade
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background rgba(0, 0, 0, .6)
</style>
