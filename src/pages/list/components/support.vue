<template>
  <div class="content">
    <form action="#" @submit.prevent="submit">
      <div class="clearfix box">
        <h5>商家服务(多选)</h5>
        <div class="main">
          <el-checkbox-group v-model="group">
            <el-checkbox-button :label="support.delivery_mode.id">
              <img :src="support.delivery_mode.icon_hash | img_icon" alt="">
              <span>{{support.delivery_mode.text}}</span>
            </el-checkbox-button>
            <el-checkbox-button
              v-for="item in support.supports"
              :key="item.ranking_weight"
              :label="item.id"
            >
              <img :src="item.icon_hash | img_icon" alt="">
              <span>{{item.name}}</span>
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div class="clearfix box">
        <h5>优惠活动(单选)</h5>
        <div class="main">
          <el-radio-group v-model="activity">
            <el-radio-button
              v-for="item in support.activity_types"
              :key="item.id"
              :label="item.id"
            >
              <span>{{item.name}}</span>
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="clearfix box">
        <h5>人均消费</h5>
        <div class="main">
          <el-radio-group v-model="shopping">
            <el-radio-button
              v-for="item in support.average_costs"
              :key="item.id"
              :label="item.id"
            >
              <span>{{item.description}}</span>
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" native-type="reset" @click="reset">取消</el-button>
        <el-button type="success" native-type="submit">确定</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'support',
  props: ['keySort'],
  data () {
    return {
      group: [],
      activity: null,
      shopping: null
    }
  },
  computed: {
    support () {
      return this.$store.state.support
    }
  },
  methods: {
    reset () {
      this.group = []
      this.activity = null
      this.shopping = null
      this.$emit('hide')
    },
    handleGroup () {
      let str = ''
      this.group.forEach(item => {
        str += '&support_ids[]=' + item
      })
      return str
    },
    handleActivity () {
      return this.activity ? '&activity_types[]=' + this.activity : ''
    },
    handleShopping () {
      switch (this.shopping) {
        case 1:
          return '&cost_to=20'
        case 2:
          return '&cost_to=40&cost_from=20'
        case 3:
          return '&cost_from=40'
        default:
          return ''
      }
    },
    handleSort () {
      let arr = this.$store.state.sort
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === this.keySort[1]) {
          return '&order_by=' + arr[i].value
        }
      }
      return ''
    },
    submit () {
      let group = this.handleGroup()
      let activity = this.handleActivity()
      let shopping = this.handleShopping()
      let sort = this.handleSort()
      let str = group + activity + shopping + sort + '&keyword=' + this.keySort[0]
      this.$store.dispatch('sortSubmit', str)
      this.$emit('hide')
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
    background #fff
    .box
      margin .27rem 0
      padding 0 .27rem
      h5
        font-size .32rem
        line-height .44rem
        margin 0 0 .2rem .09rem
      .main
        float left
        .el-checkbox-button,
        .el-radio-button
          >>> .el-checkbox-button__inner,
          >>> .el-radio-button__inner
            text-align center
            width 223px
            height .93rem
            margin .09rem
            color #333
            font-weight 300
            background #fafafa
            border 0 none
            img
              display inline
              width .32rem
              height .32rem
              margin-right .08rem
            span
              font-size .35rem
              line-height .61rem
        .is-checked,
        .is-active
          >>> .el-checkbox-button__inner,
          >>> .el-radio-button__inner
            background #409EFF
            box-shadow 0
            border-radius .08rem
            border 0 none
            color #fff
    .btn
      display flex
    .btn >>> .el-button
      font-size .43rem
      line-height 1.15rem
      text-align center
      flex 1
      margin 0
      border-radius 0
</style>
