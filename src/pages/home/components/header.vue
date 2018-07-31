<template>
  <el-header height="auto" class="clearfix">
    <el-col :span="6">
      <router-link to="1">
        <span class="iconfont icon-sousuo"></span>
      </router-link>
    </el-col>
    <el-col :span="12" class="address">
      <router-link to="/cityList">
        {{address.name}}
      </router-link>
    </el-col>
    <el-col :span="6" class="login">
      <router-link to="/login">登录 | 注册</router-link>
    </el-col>
  </el-header>
</template>

<script>
export default {
  name: 'homeHeader',
  data () {
    return {
      address: {
        name: '北京'
      }
    }
  },
  methods: {
    guess (xhr) {
      let latitude = xhr.data.latitude
      let longitude = xhr.data.longitude
      this.axios.get(`/v2/pois/${latitude},${longitude}`).then(this.autoAddress)
    },
    autoAddress (xhr) {
      if (xhr.data.name !== this.address.name) {
        this.message(xhr.data)
      } else {
        this.changeAdd()
      }
    },
    message (data) {
      this.$confirm(`当前所在的地址与<span class="address">${data.address}</span>不同，是否更换当前地址`, {
        confirmButtonText: '更换',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        showClose: false,
        closeOnClickModal: false,
        center: true
      }).then(() => {
        this.address = data
        localStorage.address = JSON.stringify(data)
        this.changeAdd()
      }).catch(() => {
        this.changeAdd()
      })
    },
    changeAdd () {
      let obj = Object.assign({}, this.address)
      this.$store.dispatch('changeAddress', obj)
    }
  },
  created () {
    try {
      this.address = JSON.parse(localStorage.address)
      let obj = {}
      document.cookie.split('; ').forEach(item => {
        item = item.split('=')
        obj[item[0]] = item[1]
      })
      if (!(obj.change_add === 'true')) {
        this.axios.get('/v1/cities?type=guess').then(this.guess)
      }
    } catch (err) {
      this.axios.get('/v1/cities?type=guess').then(this.guess)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .el-header
    background-color $bgColor
    line-height 1.21rem
    .el-col
      color $fff
      text-align center
      nowrap()
      .iconfont
        color $fff
        font-size .56rem
    a
      color $fff
    .el-col:first-child
      text-align left
      padding-left $pad
    .address
      font-size .49rem
    .login
      text-align right
</style>
