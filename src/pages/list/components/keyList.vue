<template>
  <div class="box">
    <div class="left" ref="leftScroll">
      <ul>
        <li
          v-for="(list, idx) in keyItemList"
          :key="idx"
          class="clearfix"
          :class="{active: listActive === list.name}"
          @click="handleLeftClick(list.name)"
          v-if="keyItemList"
        >
          <span class="nickname">{{list.name}}</span>
          <span class="number">
            <span>{{list.count}}</span>
            <i class="iconfont icon-jiantou"></i>
          </span>
        </li>
      </ul>
    </div>
    <div class="right" ref="rightScroll">
      <ul>
        <li v-for="item in activeList" :key="item.id">
          <router-link :to="'/list/' + item.name" replace @click.native="handleUrl">
            <img :src="item.image_url | img_home" alt="">
            <span class="itemName" :class="{active: isActive === item.name}">{{item.name}}</span>
            <span class="count">
              <i :class="{active: isActive === item.name}">{{item.count}}</i>
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'keyList',
  data () {
    return {
      activeList: [],
      isActive: '全部',
      listActive: '美食'
    }
  },
  computed: {
    keyItemList () {
      return this.$store.state.allList
    },
    changeState () {
      return this.$store.state.num
    }
  },
  watch: {
    keyItemList () {
      this.computedActive()
      this.leftScroll = new this.Bscroll(this.$refs.leftScroll, {
        click: true
      })
      this.rightScroll = new this.Bscroll(this.$refs.rightScroll, {
        click: true
      })
    },
    changeState () {
      this.computedActive()
      this.leftScroll.refresh()
      this.rightScroll.hasVerticalScroll = true
    }
  },
  methods: {
    handleLeftClick (listName) {
      this.listActive = listName
      this.isActive = '全部'
      this.keyItemList.some(item => {
        if (item.name === listName) {
          this.activeList = item.sub_categories
        }
      })
      this.$nextTick(() => {
        this.rightScroll = new this.Bscroll(this.$refs.rightScroll, {
          click: true
        })
        this.rightScroll.hasVerticalScroll = true
      })
    },
    handleUrl () {
      this.$router.go(0)
    },
    computedActive () {
      this.keyItemList.some(item => {
        if (item.name === this.$route.params.category) {
          this.activeList = item.sub_categories
          this.listActive = item.name
          return true
        } else {
          let isTrue = item.sub_categories.some(it => {
            if (it.name === this.$route.params.category) {
              this.activeList = item.sub_categories
              this.listActive = item.name
              this.isActive = it.name
              return true
            }
          })
          if (isTrue) return true
        }
      })
    }
  },
  created () {
    if (this.keyItemList) this.computedActive()
  }
}
</script>

<style lang="stylus" scoped>
  .box
    display flex
    position absolute
    z-index 1000
    top 101%
    left 0
    width 10rem
    border-bottom 1px solid #ccc
    transform-origin center top
    .left,
    .right
      flex 3
      font-size .32rem
      line-height 1.09rem
      height 10rem
      overflow hidden
    .left
      flex 2
      background-color #f1f1f1
      li.active
        background #fff
      li
        padding 0 .4rem
        border-bottom 1px solid #ccc
        .nickname
          float left
          margin-left .27rem
        .number
          float right
          span
            border-radius .11rem
            border 1px solid #ccc
            font-size .24rem
            padding 0 .08rem
            line-height .3rem
            vertical-align middle
    .right
      background #fff
      z-index 1000
      ul
        height 100%
        li
          padding 0 .37rem
          display flex
          img
            width .99rem
            height .99rem
            display inline
            padding-right .27rem
            vertical-align middle
          .itemName
            flex 1
            font-size .37rem
            font-weight 400
            vertical-align middle
          span.active
            color #2395ff
          .count
            font-size .27rem
            color #999
            vertical-align middle
            i
              border 1px solid #ccc
              padding 0 .11rem
              border-radius .08rem
            i.active
              border-color #2395ff
              font-size 400
              background-color #2395ff
              color #fff
</style>
