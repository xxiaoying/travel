import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
// import City from '@/pages/city/CityClassic'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'
import Strategy from '@/pages/detail/Strategy'
import Fusion from '@/pages/fusion/Fusion'
import Travel from '@/pages/travel/Travel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/strategy',
      name: 'Strategy',
      component: Strategy
    },
    {
      path: '/fusion/:type',
      name: 'Fusion',
      component: Fusion
    },
    {
      path: '/travel',
      name: 'Travel',
      component: Travel
    }
  ],
  // 跳转到新的页面，页面滚到顶部
  // 只在支持 history.pushState 的浏览器用
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
