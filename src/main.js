// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import common from 'js/common'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Bscroll from 'better-scroll'
import store from './store'
import 'css/base.css'
import 'css/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import 'css/messagebox.styl'
import axios from 'axios'
import './filter/filter'

Vue.config.productionTip = false
Vue.use(ElementUI)
common.vp()
Vue.prototype.axios = axios
Vue.prototype.Bscroll = Bscroll
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
