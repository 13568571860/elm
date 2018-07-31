<template>
  <div class="allCity">
    <ul
      v-if="show"
      v-for="(list, key) in group"
      :key="key"
      class="clearfix"
    >
      <h3>{{key}}</h3>
      <el-col
        tag="li"
        :span="6"
        v-for="item of list"
        :key="item.id"
      >
        <router-link :to="'/city/' + item.id">{{item.name}}</router-link>
      </el-col>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'allCity',
  data () {
    return {
      group: {},
      show: false
    }
  },
  methods: {
    result (xhr) {
      let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      let obj = {}
      arr.forEach(item => {
        obj[item] = xhr.data[item] ? xhr.data[item] : null
      })
      this.group = obj
      this.show = true
    }
  },
  created () {
    this.axios.get('/v1/cities?type=group').then(this.result)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .allCity
    ul
      background $fff
      margin-bottom $pad
      h3
        border-bottom $bottom !important
        padding-left $pad
        font-weight 200
        color #999
      li
        text-align center
        border-right $bottom
        border-bottom $bottom
        a
          nowrap()
          display block
      li:nth-of-type(4n)
        border-right 0 none
</style>
