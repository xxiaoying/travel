// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 300毫秒点击延迟问题
import fastClick from 'fastclick'
// 图片轮播
import VueAwesomeSwiper from 'vue-awesome-swiper'
// vuex
import store from './store/index'
// 重置移动端不同手机默认样式
import 'styles/reset.css'
// 不同dpr手机 1px问题
import 'styles/border.css'
// 图标样式
import 'styles/iconfont.css'
// 图片轮播样式
import 'swiper/dist/css/swiper.css'
// animate.css
import 'styles/animate.css'

Vue.config.productionTip = false
// 使用快速点击
fastClick.attach(document.body)
// 使用图片轮播
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
