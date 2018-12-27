<template>
  <div>
    <header class="header border-bottom" @click="menuMarkClick">
      <router-link to="/" class="header-left" tag="div">
        <span class="iconfont icon-back">&#xe624;</span>
      </router-link>
      <div class="header-input">
        <input type="text" placeholder="请输入城市或景点" v-model="keyword">
        <span class="iconfont icon-search">&#xe62d;</span>
      </div>
      <div class="header-right">
        搜索
      </div>
    </header>
    <!-- 导航 -->
    <section class="nav" :class="{'fixed-nav': filterNavFlag}">
      <!-- 头部导航 -->
      <nav class="border-bottom filter">
        <ul class="select">
          <li class="border-right"
            v-for="tab in tabList"
            :key="tab.id"
            @click="switchTabClick(tab)">
            <span :class="{active: tab.menuFlag}">{{tab.title}}</span>
            <span class="caption iconfont" v-html="tabTitleSwitch(tab.menuFlag)"></span>
          </li>
        </ul>
      </nav>
      <nav class="main clear" v-show="tabList[0].menuFlag">
        <div class="wrapper">
          <ul>
            <li class="menu-item border-bottom"
                v-for="(menu, index) in menuList"
                :class="{bg: !(selectIndex === index)}"
                :key="menu.id"
                @click="switchMenu(index)">
                <span >
                  <img :src="menu.imgUrl">
                  {{menu.name}}
                </span>
                <em>{{menu.num}}</em>
            </li>
           </ul>
         </div>
         <div class="wrapper">
          <ul v-show="isShowchildren">
            <li
              class="menu-item pad"
              v-for="menu in children"
              :key="menu.id"
              @click="getSightListClick(menu)">
              <span >
                {{menu.name}}
              </span>
              <em>{{menu.num}}</em>
            </li>
          </ul>
        </div>
      </nav>
      <nav class="main sort" v-show="tabList[1].menuFlag" @click="switchSortMenu($event)">
        <div class="border-bottom">推荐排序</div>
        <div class="border-bottom">离我最近</div>
        <div>人气最高</div>
      </nav>
    </section>
    <div class="menu-mask" v-show="menuMark" @click="menuMarkClick"></div>
    <section class="scenic-spot">
      <ul>
        <li v-for="item in likeList" :key="item.id" class="item">
        <router-link :to="'/detail/' + item.id">
          <tourist-attraction :item="item" :paddingTop="0.06">
              <div class="tag-list" v-if="item.tagList">
                <span class="border" :class="tag.class" v-for="tag in item.tagList" :key="tag.id">
                  <em>{{tag.txt}}</em>
                </span>
              </div>
          </tourist-attraction>
        </router-link>
        <div class="ticket-item border-bottom" v-for="(ticket, index) in item.ticketList" :key="index">
           <h3>{{ticket.name}}</h3>
           <span>¥<em>{{ticket.price}}</em></span>
        </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import TouristAttraction from '@/pages/common/attraction/TouristAttraction'
import { GET_FUSION_LIST } from '@/util/config'
export default {
  name: 'Fusion',
  components: {
    TouristAttraction
  },
  data () {
    return {
      keyword: null,
      likeList: [],
      menuList: [],
      selectIndex: 0,
      filterNavFlag: false,
      // 0表示第一次，两个tab都是未选中，1表示全部选中，2表示排序选中
      tabList: [
        {'id': '001', 'title': '全部分类', 'type': 'all', 'menuFlag': false},
        {'id': '002', 'title': '推荐排序', 'type': 'sort', 'menuFlag': false}
      ]
    }
  },
  mounted () {
    this.getIndexDatas()
    window.addEventListener('scroll', this.scroll)
    this.keyword = this.$route.params.type
  },
  computed: {
    // 在methods中，初始化 关闭 每点击一次tab和子菜单都会调用
    // 在计算属性中，会调用缓存，相对性能优化
    children () {
      const menu = this.menuList[this.selectIndex]
      if (!menu) {
        return []
      }
      if (!menu.children) {
        return []
      }
      return menu.children
    },
    isShowchildren () {
      return this.children.length
    },
    menuMark () {
      return this.tabList[0].menuFlag || this.tabList[1].menuFlag
    }
  },
  methods: {
    setDefaultTab () {
      this.tabList.forEach(item => {
        item.menuFlag = false
      })
    },
    getIndexDatas (menu) {
      // 根据选择的过滤条件获取景点数据
      let addr = GET_FUSION_LIST
      if (menu) {
        addr = `${addr}?menu=${menu.id}`
      }
      axios.get(addr).then(this.getIndexInfoSuccess)
    },
    getIndexInfoSuccess (res) {
      const resData = res.data.data
      this.likeList = resData.likeList
      this.menuList = resData.menuList
    },
    // active (index) {
    //   console.log(index + 'ddddddddd')
    //   return !(this.selectIndex === index)
    // },
    switchMenu (index) {
      // console.log(index + 'ccccccccc')
      // // 获取上一选择的ID, 修改为白色的背景
      // const preMenuId = this.menuList[this.selectIndex].id
      // console.log(this.$refs[preMenuId])
      // // 设置当前ID的背景为选中颜色
      this.selectIndex = index
    },
    getSightListClick (menu) {
      this.getIndexDatas(menu)
      this.tabList[0].title = menu.name
      this.setDefaultTab()
    },
    switchTabClick (tab) {
      this.setDefaultTab()
      tab.menuFlag = true
    },
    tabTitleSwitch (menuFlag) {
      return menuFlag ? '&#xe63a;' : '&#xe60b;'
    },
    menuMarkClick () {
      this.setDefaultTab()
    },
    // 使用非绑定修改样式,数据多可以使用记录上一次点击选择的数据，只改一次，不用所有都初始化
    switchSortMenu (event) {
      const sort = this.tabList[1]
      sort.title = event.target.innerHTML
      const nodes = event.target.parentNode.childNodes
      nodes.forEach(item => {
        if (item.nodeName === 'DIV') {
          item.style.background = ''
        }
      })
      event.target.style.background = '#f5f5f5'
      sort.menuFlag = false
      this.getIndexDatas(sort)
    },
    scroll () {
      let top = document.documentElement.scrollTop
      this.scrollY = top
      if (top > 50) {
        this.filterNavFlag = true
      } else {
        this.filterNavFlag = false
      }
      // console.log('scrollY:' + document.documentElement.scrollTop)
    }
  },
  beforeDestroy () {
    // 删除全局事件定义
    window.removeEventListener('scroll', this.scroll)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
@import '~styles/header.styl'
.header
  background: $colFff
  .header-input
    background: $colF2f
    border-radius: .3rem
    padding: 0 .6rem 0 .2rem
    position: relative
    input
      width: 100%
      line-height: .4rem
      padding: .1rem 0
      background: $colF2f
      font-size: .28rem
      text-align: center
    span
      font-size: .48rem
      position: absolute
      right: 0.1rem
      top: 0
.scenic-spot
  .ticket-item + .ticket-item
    &:before
      border-color: transparent
  .item
    padding-left: .24rem
    background: $colFff
    // margin-top: .2rem
    .tag-list
      margin-top: .18rem
      font-size: 0
      em
        font-size: .24rem
        transform: scale(.83)
        line-height: .336rem
        display: inline-block
      span
        display: inline-block
      span + span
        margin-left: .08rem
      .tag-y
        color: #ff8a00
        &:before
          border-color: #fa0
      .tag-g
        color: #00afc7
        &:before
          border-color: #a5e4ec
      .tag-g-b
        color: #00afc7
        background: #f0fbfd
        &:before
          border-color: transparent
    .ticket-item
      display: flex
      height: .96rem
      line-height: .96rem
      h3
        flex: 1
      span
        display: block
        padding: 0 .2rem
        font-size: .2rem
        color: $emColor
        em
          font-size: .32rem
  .item + .item
    margin-top: .2rem
.nav
  position: relative
  .filter
    background: $colFff
    z-index: 4
    .select
      display: flex
      li
        flex: 1
        text-align: center
        line-height: .6rem
        margin: .1rem 0
        .caption
          margin-left: .1rem
          vertical-align: bottom
      .active
        color: $colBcd
  .main
    height: 4.8rem
    display: flex
    position: absolute
    top: .8rem
    left: 0
    right: 0
    bottom: 0
    z-index: 4
    .wrapper
      flex: 1
      width: 50%
      overflow-y: auto
      position: relative
      z-index: 12
      background: #f5f5f5
      .menu-item
        padding-left: .2rem
        display: flex
        height: .8rem
        line-height: .8rem
        font-size: .24rem
        span
          flex: 1
          display: block
          img
            width: .3rem
            height: .3rem
            vertical-align: middle
            // margin-right: .1rem;
        em
          display: block
          padding-right: .2rem
      .pad
        padding-left: .3rem
      .bg
        background: $colFff
  .sort
    height: 2.4rem
    display: block
    text-align: center
    background: $colFff
    div
      line-height: .8rem
.fixed-nav
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: 9
.menu-mask
  background: rgba(0,0,0,0.45)
  position: fixed
  // display: none
  left: 0
  right: 0
  bottom: 0
  z-index: 3
  top: .88rem
  display: block
</style>
