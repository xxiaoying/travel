<template>
  <div>
    <header class="header">
      <section class="icon-wrapper" v-show="!flag">
          <div class="icon-back iconfont" @click="handleBack">&#xe624;</div>
      </section>
      <div class="header-wrapper"
        v-show="flag"
        :style="opacityStyle">
        <router-link to="/">
          <div class="header-left">
          <span class="iconfont icon-back">&#xe624;</span>
        </div>
        </router-link>
          景点详情
      </div>
    </header>
    <!-- 图片详情 -->
    <section>
      <div class="img-wrapper" @click="handleBannerClick">
        <img class="img-content" :src="bannerImg">
        <div class="img-info">
          <h3 class="title">{{sightName}}</h3>
          <div class="total"><span class="iconfont icon-img">&#xe678;</span>{{totals}}</div>
        </div>
      </div>
      <fade-animation>
        <gallary :gallaryImgs="gallaryImgs" v-if="gallaryStatus" @changSwiper="changSwiper"></gallary>
      </fade-animation>
    </section>
    <!-- 基本信息 -->
    <section class="base-info">
      <div class="border-bottom info">
        <router-link class="border-right comment" to="/strategy" tag="div">
          <div class="score-wrapper">
            <em class="score">4.9</em>分
            <span class="text">很棒</span>
          </div>
          <div class="num">
            <em>50744</em>条评论
            <span>38条攻略</span>
          </div>
          <span class="iconfont next">&#xe613;</span>
        </router-link>
        <div class="tips">
          <div class="introduction">
            景点简介
          </div>
          <div class="tip">
            开发时间、贴士
          </div>
          <span class="iconfont next pos-right">&#xe613;</span>
        </div>
      </div>
      <div class="gps">
        <span class="iconfont">&#xe64c;</span>
        <span>江苏省苏州市平江区东北街178号</span>
        <span class="iconfont fr">&#xe613;</span>
      </div>
    </section>
    <!-- 公告 -->
    <section class="notice">
      <div class="text">
      <span class="iconfont">&#xe612;</span>
        每个手机号身份证全网每个月只能预订一次，每次最多预订1张门票，否则将预订失败，请更换手机号与身份证重新预订。
      </div>
      <span class="iconfont fr next">&#xe613;</span>
    </section>
    <!-- 去哪儿推荐 -->
    <wryg @displayReserve='displayReserve'></wryg>
    <!-- 门票 一日游 景区服务 -->
    <!-- <nav class="border-bottom tab-title">
      <ul>
        <li><span class="active">门票</span></li>
        <li><span>一日游</span></li>
        <li><span>一日游</span></li>
      </ul>
    </nav> -->
    <ticket
      :categoryList="categoryList"
      :scrollY="scrollY"
      @displayReserve='displayReserve'></ticket>
    <comment :userCommentList="userCommentList" @picGallary="picGallary"></comment>
    <footprints :footprints="footprints"></footprints>
    <transition enter-active-class="animated fast fadeInUp" leave-active-class="animated faster fadeOutDown">
      <reserve v-show="reserveFlag" @closeReserveClick="closeReserveClick"></reserve>
    </transition>
    <div class="mask" v-show="maskFlag"></div>
    <!-- <section style="height: 200px;"></section> -->
  </div>
</template>

<script>
import FadeAnimation from '@/common/animation/FadeAnimation'
import Gallary from '@/common/gallary/Gallary'
import Ticket from '@/pages/detail/components/Ticket'
import Wryg from '@/pages/detail/components/Wryg'
import Comment from '@/pages/detail/components/Comment'
import Footprints from '@/pages/detail/components/Footprints'
import Reserve from '@/pages/detail/components/Reserve'
import axios from 'axios'
export default {
  name: 'Detail',
  components: {
    Gallary,
    FadeAnimation,
    Ticket,
    Wryg,
    Comment,
    Footprints,
    Reserve
  },
  data () {
    return {
      flag: false,
      opacityStyle: {
        opacity: 0
      },
      reserveFlag: false,
      maskFlag: false,
      sightName: '',
      bannerImg: '',
      defaultImgs: [],
      gallaryImgs: [],
      categoryList: [],
      userCommentList: [],
      footprints: [],
      gallaryStatus: false,
      scrollY: 0
    }
  },
  mounted () {
    this.getDetailDatas()
    window.addEventListener('scroll', this.scroll)
  },
  computed: {
    totals () {
      return this.gallaryImgs.length
    }
  },
  methods: {
    getDetailDatas () {
      axios.get('/api/detail.json').then(this.getDetailDatasSuccess)
    },
    getDetailDatasSuccess (res) {
      const resData = res.data.data
      this.sightName = resData.sightName
      this.bannerImg = resData.bannerImg
      this.gallaryImgs = resData.gallaryImgs
      this.defaultImgs = resData.gallaryImgs
      this.categoryList = resData.categoryList
      this.userCommentList = resData.userCommentList
      this.footprints = resData.footprints
    },
    scroll () {
      let top = document.documentElement.scrollTop
      this.scrollY = top
      if (top > 50) {
        let opacity = top / 200 > 1 ? 1 : top / 200
        this.opacityStyle.opacity = opacity
        this.flag = true
      } else {
        this.flag = false
      }
      // console.log('scrollY:' + document.documentElement.scrollTop)
    },
    handleBannerClick () {
      this.gallaryStatus = true
    },
    changSwiper () {
      this.gallaryStatus = false
      this.gallaryImgs = this.defaultImgs
    },
    handleBack () {
      if (this.gallaryStatus) {
        this.gallaryStatus = false
        this.gallaryImgs = this.defaultImgs
      } else {
        this.$router.push('/')
      }
    },
    picGallary (imgs) {
      this.gallaryStatus = true
      let images = []
      imgs.forEach(item => {
        images.push(item.imgUrl)
      })
      this.gallaryImgs = images
    },
    displayReserve () {
      this.maskFlag = true
      this.reserveFlag = true
    },
    closeReserveClick () {
      this.reserveFlag = false
      this.maskFlag = false
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
.fr
  float: right
  font-size: .28rem
  color: $nextIconCol
.header
  .header-wrapper
    position: fixed
    top: 0
    right: 0
    left: 0
    height: .86rem
    line-height: .86rem
    color: $colFff
    background: $colBcd
    text-align: center
    font-size: .32rem
    z-index: 88
    .header-left
      width: .64rem
      padding-left: .2rem
      position: absolute
      text-align: left
      top: 0
      .icon-back
        font-size: .32rem
        font-weight: bold
        color: $colFff
  .icon-wrapper
    position: relative
    z-index: 99
    .icon-back
      position: absolute
      top: .1rem
      left: .1rem
      width: .72rem
      height: .72rem
      border-radius: 50%
      text-align: center
      background: rgba(0, 0, 0, .5)
      color: $colFff
      font-size: .32rem
      font-weight: bold
      display: flex
      flex-direction: column
      justify-content: center
.img-wrapper
  position: relative
  padding-bottom: 55%
  height: 0
  .img-content
    width: 100%
  .img-info
    display: flex
    position: absolute
    bottom: 0
    left: 0
    right: 0
    color: $colFff
    padding: .16rem
    background: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .7))
    .title
      flex: 1
      font-size: .32rem
    .total
      background: rgba(0, 0, 0, .75)
      padding: .06rem .4rem
      border-radius: .5rem
      .icon-img
        padding-right: .1rem
        font-size: .24rem
.base-info
  background: $colFff
  position: relative
  top: -.1rem
  border-radius: .1rem  .1rem  0  0
  padding: .1rem .2rem 0 .2rem
  margin-bottom: .1rem
  .next
    position: absolute
    font-size: .28rem
    top:.3rem
    right: .2rem
    color: $nextIconCol
  .info
    display: flex
    padding: .1rem 0 .2rem 0
    .comment
      flex: 1
      position: relative
      .score-wrapper
        font-size: .28rem
        color: $emColor
        line-height: .48rem
        .score
          font-size: .44rem
        .text
         margin-left: .2rem
    .num
      font-size: .24rem
      color: $nextIconCol
      line-height: .32rem
      margin-right: .2rem
  .tips
    flex: 1
    padding-left: .3rem
    position: relative
    .introduction
      font-size: .28rem
      line-height: .48rem
      padding-bottom: .06rem
    .tip
      font-size: .24rem
      color: $nextIconCol
    .pos-right
      right: 0
  .gps
    padding: .2rem 0
.notice
  position: relative
  background-color: #fff5e5
  color: $emColor
  margin-bottom: .2rem
  height: .88rem
  line-height: .88rem
  padding-left: .23rem
  .text
    ellipsis()
    padding-right: .6rem
  .next
    position: absolute
    right: .2rem
    top: 0
.tab-title
  background: $colFff
  ul
    li
      width: 33%
      display: inline-block
      height: .98rem
      line-height: .94rem
      width: 2.4rem
      text-align: center
      font-size: .32rem
      span
        display: block
        width: 80%
        margin: auto
        border-bottom: .04rem solid $colFff
        box-sizing: border-box
      .active
         border-bottom: .04rem solid $colBcd
.mask
  top: 0
  right: 0
  bottom: 0
  left: 0
  width: 100%
  height: 100%
  position: fixed
  z-index: 91
  background: rgba(0,0,0,.5)
.fade-enter-active
.fade-leave-active
  transition: top .5s
.fade-enter
.fade-leave-to
  top: 15rem
</style>
