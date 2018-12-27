<template>
  <div>
    <header class="header">
      <div class="header-left">
        <span class="iconfont icon-back">&#xe624;</span>
      </div>
      <div class="header-input">
        <span class="iconfont icon-search">&#xe632;</span>
        输入城市/景点/游玩主题
      </div>
      <router-link to="/city" tag="div">
        <div class="header-right">
          <!-- {{this.$store.state.currentCity}} -->
          {{currentCity}}
          <span class="iconfont icon-select">&#xe64a;</span>
        </div>
      </router-link>
    </header>
    <div>
      <!-- 图片轮播 -->
      <section class="swiper">
        <swiper :options="swiperOption" v-if="showSwiper">
          <swiper-slide v-for="swiper in swiperList" :key="swiper.id">
            <router-link  :to="swiper.path">
              <img class="swiper-img" :src="swiper.imgUrl">
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </section>
      <!-- 图片轮播 -->
      <section class="icons">
        <swiper :options="swiperOptionIcons">
          <swiper-slide v-for="(page, index) in pages" :key="index">
            <router-link class="icon" v-for="icon in page" :key="icon.id" :to="icon.path" tag="div">
            <!-- <div class="icon" v-for="icon in page" :key="icon.id"> -->
              <div class="icon-img">
                <img class="icon-img-content" :src="icon.imgUrl">
              </div>
              <p class="icon-p">{{icon.text}}</p>
            <!-- </div> -->
          </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </section>
      <!-- 定位 + 必游榜单 -->
      <section class="gps-hot border-top">
        <div class="gps border-right">
          <span class="iconfont">&#xe64c;</span>定位失败
        </div>
        <div class="hot">
          <span class="iconfont">&#xe639;</span>必游榜单
        </div>
      </section>
      <!-- 限时抢购 + 打卡圣地 -->
      <section class="activity border-topbottom">
        <div class="img-warpper  border-right">
          <div  class="img-content">
            <img src="http://img1.qunarzz.com/piao/fusion/1811/12/999862443f79a902.png">
          </div>
        </div>
        <div class="img-warpper">
          <div  class="img-content">
            <img src="http://img1.qunarzz.com/piao/fusion/1811/d5/20dc542eb839c702.png">
          </div>
        </div>
      </section>
      <!-- 本周热门 -->
      <section class="scenic-spot">
        <div class="title">
          <h3><span class="iconfont hot">&#xe6a0;</span>本周热门榜单</h3>
          <h5 class="all">全部榜单<span class="iconfont next">&#xe613;</span></h5>
        </div>
        <ul class="hot-sale-list">
          <router-link class="hot-sale-item" :to="'/detail/' + item.id" tag="li" v-for="item in hotList" :key="item.id">
            <div v-if="item.top">
              <img class="top-img" :src="item.top">
            </div>
            <div class="img-content">
              <img :src="item.imgUrl">
            </div>
            <h4 class="name">{{item.title}}</h4>
            <div class="ticket"><span class="unit">￥<em class="price">{{item.price}}</em></span>起</div>
          </router-link>
        </ul>
      </section>
      <!-- 猜你喜欢 -->
      <section class="scenic-spot">
        <div class="title">
          <h3><span class="iconfont like">&#xe65c;</span>猜你喜欢</h3>
        </div>
        <ul class="like-list">
          <!-- 使用插槽 -->
          <router-link :to="'/detail/' + item.id" tag="li" v-for="item in likeList" :key="item.id">
            <tourist-attraction :item="item" >
              <div class="feature"> <span class="bg-feature"> {{item.feature}} </span></div>
            </tourist-attraction>
          </router-link>
        </ul>
        <a class="like-more">查看所有产品</a>
      </section>
      <!-- 周末去哪儿 -->
      <section class="weekend">
        <div class="hot-title">周末去哪儿</div>
        <router-link class="week-wrapper" :to="'/detail/' + item.id" tag="div" v-for="item in weekendList" :key="item.id">
        <!-- <div class="week-wrapper" v-for="item in weekendList" :key="item.id"> -->
          <div class="weekend-img">
            <img class="hot-img-content" :src="item.imgUrl">
          </div>
          <div class="hot-info">
            <h3 class="title">{{item.title}}</h3>
            <h4 class="desc">{{item.desc}}</h4>
          </div>
        <!-- </div> -->
        </router-link>
      </section>
      <section class="price-desc">
        <span class="iconfont">&#xe620;</span>
        <strong>票面价</strong>是指通过景区指定窗口售卖的纸质门票上标注的价格
      </section>
    </div>
  </div>
</template>

<script>
// 首页
import TouristAttraction from '@/pages/common/attraction/TouristAttraction'
import axios from 'axios'
import { mapState } from 'vuex'
import { GET_INDEX_LIST } from '@/util/config'

export default {
  name: 'Home',
  components: {
    TouristAttraction
  },
  data () {
    return {
      swiperOption: {
        // 修改swiper自己或子元素时，自动初始化swiper
        observer: true,
        // 修改swiper的父元素时，自动初始化swiper
        observeParents: true,
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 1500
      },
      swiperOptionIcons: {
        observer: true,
        observeParents: true,
        pagination: '.swiper-pagination'
      },
      swiperList: [],
      iconList: [],
      hotList: [],
      likeList: [],
      weekendList: [],
      lastCity: null
    }
  },
  computed: {
    ...mapState(['currentCity']),
    showSwiper () {
      return this.swiperList.length
    },
    pages () {
      let pages = []
      this.iconList.forEach((item, i) => {
        let index = Math.floor(i / 8)
        if (!pages[index]) {
          pages[index] = []
        }
        pages[index].push(item)
      })
      return pages
    }
  },
  methods: {
    getIndexDatas () {
      // axios.get('/api/index.json?city=' + this.currentCity).then(this.getIndexInfoSuccess)
      axios.get(GET_INDEX_LIST + this.currentCity).then(this.getIndexInfoSuccess)
      // axios.get('/api/index.json').then(this.getIndexInfoSuccess)
    },
    getIndexInfoSuccess (res) {
      const resData = res.data.data
      this.swiperList = resData.swiperList
      this.iconList = resData.iconList
      this.hotList = resData.hotList
      this.likeList = resData.likeList
      this.weekendList = resData.weekendList
    }
  },
  mounted () {
    this.getIndexDatas()
  },
  activated () {
    if (!this.lastCity) {
      this.lastCity = this.currentCity
    } else if (this.lastCity !== this.currentCity) {
      this.lastCity = this.currentCity
      this.getIndexDatas()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
@import '~styles/header.styl'
  >>> .swiper-pagination-bullet
    width: .12rem
    height: .12rem
  .header
    color: $colFff
    .header-input
      color: #dcdcdc
    .header-right
      min-width: 1.28rem
      color: $colFff
    .icon-select
      font-size: .1rem
      display: inline-block
      margin-left: -.04rem
  .swiper >>> .swiper-pagination-bullet-active
    background: $colFff
  .swiper
    height: 0
    padding-bottom: 26.67%
    background: #f3f3f3
    .swiper-img
      width: 100%
  .icons >>> .swiper-container
    position: static
  .icons >>> .swiper-pagination-bullets
    bottom: .04rem
  .icons
    width: 100%
    // 预留5%显示轮播切换
    padding-bottom: 55%
    height: 0
    position:relative
    background: $colFff
    .icon
      position: relative
      float: left
      width: 25%
      padding-bottom: 25%
      .icon-img
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: .44rem
        box-sizing: border-box
        padding-top: .3rem
        .icon-img-content
          display: block
          height: 100%
          margin: auto
      .icon-p
        position: absolute
        left: 0
        right: 0
        bottom: 0
        text-align: center
        line-height: .44rem
  .gps-hot
  .activity
    display: flex
    text-align: center
    background: $colFff
    .gps
    .hot
      flex: 1
      padding: .3rem
  .activity
    margin-top: .2rem
    .img-warpper
      flex: 1
      img
        width: 100%
  .scenic-spot
    margin-top: .2rem
    background: $colFff
    padding-left: .24rem
    .title
      display: flex
      title()
      .all
        font-size: .24rem
        .next
          margin-left: .04rem
          font-size: .24rem
          margin-right: .2rem
      .hot
        color: #ff7a47
        margin-right: .1rem
      .like
        color: #ff684b
        margin-right: .1rem
      h3
        flex: 1
        font-size: .32rem
      h5
        color: $darkTextColor
    .hot-sale-list
      white-space: nowrap
      overflow-x: scroll
      li + li
        margin-left: .12rem
      li:last-child
        margin-right: .24rem
      // 子容器出现滚动条，如果使用的块元素需要设置为内联元素撑出宽度，如果使用float会失效
      .hot-sale-item
        display: inline-block
        width: 2rem
        position: relative
        text-align: center
        font-size: .24rem
        .top-img
          position: absolute
          left: 0
          top: 0
          width: .84rem
        .img-content
          padding-bottom: 100%
          height: 0
          margin-top: .1rem
          img
            width: 100%
        .name
          line-height: .32rem
          margin-top: .12rem
        .ticket
          color: $darkTextColor
          padding: .04rem 0
          margin-bottom: .2rem
          .unit
            color: $emColor
          .price
            font-size: .28rem
    .like-more
      display: block
      padding: .2rem 0
      color: #00afc7
      font-size: .28rem
      line-height: .4rem
      text-align: center
  .weekend
    .hot-title
      height: 0.8rem
      line-height: 0.8rem
      text-indent: 0.2rem
    .week-wrapper
      background: $colFff
      margin-bottom: .1rem
      .weekend-img
        width: 100%
        height: 0
        padding-bottom: 38.6%
        .hot-img-content
          width: 100%
      .hot-info
        padding: .1rem
        .title
          line-height: .45rem
        .desc
          line-height: .45rem
          color: $darkTextColor
          font-size: .24rem
          ellipsis()
  .price-desc
    font-size: .24rem;
    line-height: .6rem;
    background: $colFff
    padding-left: .1rem
    strong
      font-weight: bold
</style>
