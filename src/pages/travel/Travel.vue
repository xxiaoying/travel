<template>
  <div>
    <!-- 导航 滚动时候出现 -->
    <nav>
      <ul>
      </ul>
    </nav>
    <header>
      <router-link class="icon-wrapper" to="/" tag="div">
        <div class="icon-back iconfont">&#xe624;</div>
      </router-link>
      <img class="img-content" :src="theme[selectMenu.type]">
      <div class="img-title">
        <img src="http://s.qunarzz.com/piao/image/touch/channel/traveling/banner-txt.png">
      </div>
      <div class="addr">
        南京
        <span class="iconfont">&#xe60b;</span>
      </div>
    </header>
    <!-- icon list -->
    <nav class="menu">
      <ul class="clear"
        :class="{'theme-blue': selectMenu.type === 'blue', 'theme-green': selectMenu.type === 'green'}">
        <li
          v-for="(menu, index) in list"
          :key="menu.id"
          @click="iconClick(index)"
          >
          <div class="item" :class="{active: menu.id === selectMenu.id}">
            <h3 v-html="menu.newTitle"></h3>
            <div class="bot-img">
              <img src="http://s.qunarzz.com/piao/image/touch/channel/traveling/theme-blue-normal.png">
            </div>
          </div>
        </li>
      </ul>
    </nav>
    <router-view @tabSelect="tabSelect"></router-view>
    <!-- content -->
    <!-- <punch :punchList="punchList"></punch> -->
    <!-- <near-by-sights :nearList="nearList"></near-by-sights>
    <section style="height: 200px"></section> -->
  </div>
</template>
<script>
import axios from 'axios'
// import Punch from '@/pages/travel/components/Punch'
// import NearBySights from '@/pages/travel/components/NearBySights'
export default {
  name: 'Travel',
  data () {
    return {
      iconList: [],
      selectIndex: 0,
      // punchList: [],
      // nearList: [],
      selectMenu: {},
      theme: {}
    }
  },
  // components: {
  //   Punch,
  //   NearBySights
  // },
  mounted () {
    this.getTravelDatas()
  },
  computed: {
    list () {
      this.iconList.forEach(item => {
        if (item.text.length / 3 >= 2) {
          item.newTitle = item.text.slice(0, 3) + '<br>' + item.text.slice(3)
        } else {
          item.newTitle = item.text.slice(0, 2) + '<br>' + item.text.slice(2)
        }
      })
      console.log(this.iconList)
      return this.iconList
    }
  },
  methods: {
    getTravelDatas () {
      axios.get('/api/traveling.json').then(this.getTravelDataSuccess)
    },
    getTravelDataSuccess (res) {
      const resData = res.data.data
      this.iconList = resData.iconList
      // this.punchList = resData.punchList
      // this.nearList = resData.nearList
      this.theme = resData.theme
      if (this.selectIndex !== 0) {
        this.selectMenu = this.iconList[this.selectIndex]
      } else {
        this.selectMenu = this.iconList[0]
      }
    },
    iconClick (index) {
      this.selectMenu = this.iconList[index]
      this.$router.push({path: this.selectMenu.path, query: { index: index }})
      // this.$router.push(menu.path)
    },
    tabSelect (index) {
      if (index) {
        this.selectIndex = index
      } else {
        this.selectIndex = 0
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
@import '~styles/header.styl'
header
  height: 0
  padding-bottom: 55.867%
  position: relative
  .icon-wrapper
    position: relative
    z-index: 99
    .icon-back
      iconBackCircle()
      background: none
  .img-title
    position: absolute
    top: 0
    left:0
    right:0
    width: 38.9%
    padding-top: 10.6%
    margin: auto
    img
      width: 100%
  .img-content
    width: 100%
  .addr
    position: absolute
    top: 46%
    right: .46rem
    font-size: .36rem
    color: $colFff
.menu
  position: relative
  background-image: linear-gradient(to bottom,rgba(255,255,255,.6),#fff 40%,#fff 50%,rgba(255,255,255,.6))
  margin: -22% .2rem .2rem
  border-radius: .1rem
  padding: .2rem .4rem
  li
    float: left
    width: 33.3%
    padding: .2rem 0
    .item
      // 保证底边图片不超出border-radius设置
      overflow: hidden
      position: relative
      border-radius: 40%
      text-align: center
      margin: 0 auto
      width: 1.34rem
      height: 1.34rem
      color: #6d7dff
      background-color: $colFff
      box-shadow: 0 0.1rem 0.24rem rgba(0,0,0,.06)
      h3
        padding-top: .28rem
        font-size: .28rem
        line-height: .36rem
      .bot-img
        position: absolute
        bottom: 0
        img
          width: 100%
    .active
      background-image: linear-gradient(135deg,#e192ff,#7286ff)
      color: $colFff
      h3
        font-weight: bold
  .theme-blue
    .item
      color: #4c98ff
    .active
      background-image: linear-gradient(135deg,#54c6ff,#4c98ff)
      color: $colFff
  .theme-green
    .item
      color: #00baad
    .active
      background-image: linear-gradient(135deg,#36edac,#00d4c5)
      color: $colFff
</style>
