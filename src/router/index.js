import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
// import City from '@/pages/city/CityClassic'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'
import Strategy from '@/pages/detail/Strategy'
import Fusion from '@/pages/fusion/Fusion'
import Travel from '@/pages/travel/Travel'
import Punch from '@/pages/travel/components/Punch'
import NearBySights from '@/pages/travel/components/NearBySights'
import Play from '@/pages/travel/components/Play'
import Video from '../pages/video/Video'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
      // 根据项目情况使用异步组件加载
      // component: () => import('@/pages/home/Home')
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
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/travel',
      name: 'Travel',
      component: Travel,
      children: [
        {
          path: '',
          component: Punch
        },
        {
          // Punch 会被渲染在 Travel 的 <router-view> 中
          path: 'punch',
          component: Punch
        },
        {
          path: 'near',
          component: NearBySights
        },
        {
          path: 'play/:type',
          component: Play
        }
      ]
    }
  ],
  // 跳转到新的页面，页面滚到顶部
  // 只在支持 history.pushState 的浏览器用
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
