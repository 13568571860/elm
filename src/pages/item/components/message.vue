<template>
  <el-dialog
    width="80%"
    :visible.sync="dialogFormVisible"
    :append-to-body="true"
    :show-close="false"
    style="margin-top: 50%; transform: translate(0, -10%)"
    :before-close="beforeClose"
    v-if="specs"
  >
    <div slot="title" class="boxTitle">
      {{specs.name}}
    </div>
    <div class="boxContent">
      <p>规格</p>
      <el-radio-group
        v-model="foods_id"
        size="medium"
        @change="handleValue">
        <el-radio-button
          v-for="res in specs.specfoods"
          :key="res.food_id"
          :label="res.food_id"
        >
          {{res.specs_name}}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div slot="footer" class="boxFooter">
      <el-col :span="12">
        <span class="money">￥</span>
        <span class="prices">{{foodPrice}}</span>
      </el-col>
      <el-button :span="12" type="primary" @click="paysCar">加入购物车</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'messageBox',
  data () {
    return {
      dialogFormVisible: false,
      foods_id: 0,
      foodPrice: 0
    }
  },
  computed: {
    specs () {
      return this.$store.state.specs
    }
  },
  watch: {
    specs () {
      this.dialogFormVisible = true
      this.foods_id = this.specs.specfoods && this.specs.specfoods[0].food_id
      this.foodPrice = this.specs.specfoods && this.specs.specfoods[0].price
    }
  },
  methods: {
    handleValue (foodId) {
      this.foods_id = foodId
      this.specs.specfoods.some(item => {
        if (item.food_id === foodId) {
          this.foodPrice = item.price
          return true
        }
      })
    },
    paysCar () {
      let obj = localStorage.buyCar ? JSON.parse(localStorage.buyCar) : {}
      let buyCar = obj[this.$route.params.shopId] || {}
      if (buyCar && buyCar[this.foods_id]) {
        buyCar[this.foods_id].quantity++
      } else {
        this.specs.specfoods.some(item => {
          if (item.food_id === this.foods_id) {
            buyCar[this.foods_id] = this.setFram(item)
            return true
          }
        })
      }
      this.toLocal(buyCar)
    },
    beforeClose (done) {
      this.$store.dispatch('showSpecs', {})
      this.$nextTick(() => {
        this.dialogFormVisible = false
      })
    },
    setFram (item) {
      return {
        attrs: [],
        extra: {},
        id: item.food_id,
        name: item.name,
        packing_fee: item.packing_fee,
        price: item.price,
        quantity: 1,
        sku_id: item.sku_id,
        stock: item.stock,
        specs: [item.specs_name]
      }
    },
    toLocal (buyCar) {
      let obj = localStorage.buyCar ? JSON.parse(localStorage.buyCar) : {}
      buyCar = Object.assign({}, buyCar)
      obj[this.$route.params.shopId] = buyCar
      localStorage.buyCar = JSON.stringify(obj)
      this.$store.dispatch('changeCar', buyCar)
      this.$nextTick(() => {
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .boxTitle
    text-align center
    font-size .44rem
    line-height .61rem
  .boxContent
    font-size .37rem
    line-height .53rem
    color #777
    p
      margin .19rem 0
    .el-radio-button
      margin-right .27rem
  .boxFooter
    color #f50
    .el-col
      text-align left
      .money
        font-size .27rem
      .prices
        font-size .49rem
    .el-button
      color #fff
      font-size .37rem
      line-height .47rem
      border-radius .11rem
</style>
