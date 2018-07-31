<template>
  <form action="" @submit.prevent="handleSubmit">
    <div class="input_box">
      <div class="box">
        <input type="text" placeholder="账号" v-model="username">
      </div>
      <div class="box">
        <input :type="isPass" placeholder="密码" v-model="password">
        <el-switch
          v-model="isPass"
          active-color="#13ce66"
          inactive-color="#ccc"
          active-value="password"
          inactive-value="text"
        >
        </el-switch>
      </div>
      <div class="box">
        <input
          type="text"
          placeholder="验证码"
          class="code_input"
          v-model="captcha_code"
        >
        <img :src="codeUrl" alt="" @click="handleCodeClick">
      </div>
    </div>
    <p class="tips">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="tips">注册过的用户可凭账号密码登录</p>
    <el-button
      type="primary"
      native-type="submit"
    >
      登 录
    </el-button>
    <p class="alterPsd">
      <router-link to="/forget">修改密码？</router-link>
    </p>
  </form>
</template>

<script>
export default {
  name: 'loginFrom',
  data () {
    return {
      codeUrl: '',
      isPass: 'password',
      password: '',
      username: '',
      captcha_code: '',
      message: '<div class="iconfont icon-jiazai" style="margin: .27rem">'
    }
  },
  methods: {
    getCode (xhr) {
      this.codeUrl = xhr.data.code
    },
    change () {
      this.isPass = this.isPass === 'password' ? 'text' : 'password'
    },
    handleCodeClick () {
      this.codeAxios()
    },
    codeAxios () {
      this.axios.post('/v1/captchas').then(this.getCode)
    },
    handleSubmit () {
      if (this.username !== '' && this.password !== '' && this.captcha_code !== '') {
        this.axios.post('/v2/login', {
          password: this.password,
          username: this.username,
          captcha_code: this.captcha_code
        }).then(this.verify)
        this.loadClose = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      } else {
        this.$alert('请输入账号密码', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        })
      }
    },
    verify (xhr) {
      if (xhr.data.message) {
        this.loadClose.close()
        this.$alert(xhr.data.message, {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        })
      } else if (xhr.data.is_active) {
        localStorage.usemd5_id = JSON.stringify(xhr.data)
        this.loadClose.close()
        window.history.go(-1)
      }
    }
  },
  created () {
    this.codeAxios()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  form >>> .el-switch
    .el-switch__core
      transform scale(2, 2)
  .input_box
    background-color $fff
    margin-top .37rem
    .box
      border-bottom $bottom
      padding-left .49rem
      input
        font-size .40rem
        line-height 1.28rem
        font-weight 200
        width 80%
        color #666
      .code_input
        width 60%
        vertical-align middle
      img
        width 2.19rem
        display inline-block
        margin-left .21rem
        vertical-align middle
  .tips
    font-size .32rem
    line-height .8rem
    color red
    padding-left $pad
  .el-button
    width 90%
    font-size .40rem
    line-height 70px
    display block
    margin .27rem auto .63rem
    background-color #4cd964
    font-weight 200
  .alterPsd
    font-size .37rem
    line-height .40rem
    text-align right
    padding-right $pad
    a
      color #3b95e9
</style>
