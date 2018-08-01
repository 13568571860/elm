<template>
  <div class="login">
    <login-header :opction="headerOpc"></login-header>
    <login-from></login-from>
  </div>
</template>

<script>
import LoginHeader from '@/components/header'
import LoginFrom from './components/loginFrom'
export default {
  name: 'login',
  data () {
    return {
      headerOpc: {
        left: {
          icon: 'icon-jiantou4',
          handleClick: () => {
            this.$router.go(-1)
          }
        },
        center: {
          text: '登录密码'
        }
      }
    }
  },
  components: {
    LoginHeader,
    LoginFrom
  }
}
</script>

<style lang="stylus" scoped>
  .login
    background-color #f5f5f5
    position absolute
    top 0
    left 0
    right 0
    bottom 0
</style>
