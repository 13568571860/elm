<template>
  <el-header class="clearfix" height="auto">
    <el-col
      :span="6"
      class="iconfont"
      :class="[opction.left.icon, opction.left.text ? 'text' : '']"
      :style="opction.left.css"
      @click.native="opction.left.handleClick"
      v-if="opction.left"
    >
      {{opction.left.text}}
    </el-col>
    <el-col v-else :span="6"> </el-col>
    <el-col
      :span="12"
      :class=" opction.center.text ? 'text' : ''"
      :style="opction.center.css"
      @click.native="opction.center.handleClick"
      v-if="opction.center"
    >
      {{opction.center.text}}
    </el-col>
    <el-col v-else :span="12"> </el-col>
    <el-col
      :span="6"
      :class=" opction.right.text ? 'text' : ''"
      :style="opction.right.css"
      @click.native="opction.right.handleClick"
      v-if="opction.right"
    >
      {{opction.right.text}}
    </el-col>
    <el-col v-else :span="6"> </el-col>
  </el-header>
</template>

<script>
export default {
  name: 'comHeader',
  props: {
    opction: Object
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .el-header
    background $bgColor
    .el-col
      color $fff
      font-size .49rem
      font-weight 400
      line-height 1.21rem
      text-align center
      min-height  .27rem
      nowrap()
    .iconfont
      font-size .63rem
      ling-height 1.21rem
      text-align left
    .text
      font-size .49rem
</style>
