<template>
  <div class="near-by-sights">
    <!-- 身边的人在玩 -->
    <h5 class="tip">
      未获取到定位信息，小驼自动为您推荐北京旅行清单~
    </h5>
    <h3 class="title">
      <span>附近景点</span>
    </h3>
    <!-- 图片轮播 -->
    <section class="swiper">
      <!-- class swiper-container -->
      <swiper :options="swiperOption">
        <!-- 自动生成一个标签class swiper-wrapper-->
        <!-- 每个标签 swiper-slide swiper-slide-duplicate  -->
        <swiper-slide v-for="swiper in nearList" :key="swiper.id">
          <div class="picture">
            <div class="pic-wrapper">
              <img :src="swiper.imgUrl">
            </div>
            <span class="distance">距您{{swiper.distance}}km</span>
            <span class="img-title">{{swiper.title}}</span>
          </div>
        </swiper-slide>
      </swiper>
    </section>
    <section class="info" v-if="nearItem">
      <div class="content">
        <div class="sightLabel">
            <span class="border"
              v-for="lable in nearItem.lableList"
              :key="lable.id">
              {{lable.name}}
            </span>
        </div>
        <div class="desc">
            {{nearItem.desc}}
        </div>
        <div class="addr">
            <span class="iconfont addr-icon">&#xe64c;</span>
            {{nearItem.addr}}
        </div>
        <div class="ticket-wrapper border-top">
            <div class="ticket"
              v-for="ticket in nearItem.ticketList"
              :key="ticket.id">
                <div class="name">
                  {{ticket.name}}
                </div>
                <div class="price-wrapper">
                  <span class="price">
                    ¥<em>{{ticket.price}}</em><span>起</span>
                  </span>
                </div>
            </div>
        </div>
      </div>
      <div class="more-info border-top">
          查看更多信息<span class="iconfont">&#xe60b;</span>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { GET_NEAR_LIST } from '@/util/config'

export default {
  name: 'NearBySights',
  data () {
    return {
      swiperOption: {
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        centeredSlides: false,
        slidesPerView: 3,
        initialSlide: 0,
        loop: true,
        onInit: swiper => {
          var _this = this
          setTimeout(function () {
            _this.initStatus = false
            swiper.wrapper.transform('translate3d(-380px, 0px, 0px)')
            swiper.slides.eq(3).addClass('swiper-slide-active')
          }, 300)
        },
        onSetTranslate: (swiper, translate) => {
          if (this.initStatus) {
            return
          }
          const slide = swiper.slides.eq(swiper.activeIndex)
          const index = slide[0].getAttribute('data-swiper-slide-index')
          this.selectIndex = index
          let newTranslate = translate + 5
          swiper.wrapper.transform('translate3d(' + newTranslate + 'px, 0px, 0px)')
        }
      },
      nearList: [],
      initStatus: true,
      selectIndex: 0
    }
  },
  mounted () {
    this.getNearDatas()
    this.init()
  },
  computed: {
    nearItem () {
      return this.nearList[this.selectIndex]
    }
  },
  methods: {
    init () {
      this.$emit('tabSelect', this.$route.query.index)
    },
    getNearDatas () {
      axios.get(GET_NEAR_LIST).then(this.getNearDataSuccess)
    },
    getNearDataSuccess (res) {
      const resData = res.data.data
      this.nearList = resData.nearList
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
.swiper >>> .swiper-wrapper
  padding: .3rem .2rem
  align-items: center
  transition-duration: 0ms
.swiper >>> .swiper-slide
    // margin: 0 .1rem
.swiper-slide-active
  -webkit-transform: scale(1.1)
  -moz-transform: scale(1.1)
  -o-transform: scale(1.1)
  -ms-transform: scale(1.1)
  margin: 0 .1rem 0 .12rem
.near-by-sights
  padding-top: .3rem
  .tip
    text-align: center
    padding: .2rem 0
    font-size: .24rem
    color: #7e7e7e
    background-color: #fff
    box-shadow: 0 0 0.2rem 0.1rem #EEE
  .title
    margin-top: .2rem
    text-align: center
    span
      position: relative
      color: #10d9b9
      font-size: .38rem
      font-weight: 600
      &:before
      &:after
        content: ' '
        display: inline-block
        position: absolute
        top: .22rem
        width: .08rem
        height: .08rem
        background-color: #29dca1
        border-radius: .04rem
        box-shadow: -0.2rem 0 #69e6bd, -0.4rem 0 #a9f1d9
      &:before
        left: -.2rem
      &:after
        right: -.16rem
        box-shadow: 0.2rem 0 #69e6bd, 0.4rem 0 #a9f1d9
  .swiper
    .picture
      position: relative
      width: 2.3rem
      // padding-bottom: 136.087%
      // height: 0
      border-radius: .1rem
      overflow: hidden
      .pic-wrapper
        padding-bottom: 136.087%
        height: 0
        img
          width: 100%
      .distance
        position: absolute
        top: 0
        width: auto
        max-width: 2.3rem
        padding: .1rem .2rem
        font-size: .24rem
        color: #fff
        background-image: linear-gradient(90deg,#ffb076,#ff8a8d)
        background-image: -webkit-linear-gradient(90deg,#ffb076,#ff8a8d)
        background-image: -moz-linear-gradient(90deg,#ffb076,#ff8a8d)
        background-image: -o-linear-gradient(90deg,#ffb076,#ff8a8d)
        border-radius: .1rem 0
        ellipsis()
      .img-title
        position: absolute
        bottom: 0
        width: auto
        max-width: 2.1rem
        padding: .16rem .1rem
        font-size: .3rem
        font-weight: 500
        color: $colFff
        ellipsis()
  .info
    position: relative
    margin: .2rem .2rem 0
    padding: .2rem 0
    background-color: $colFff
    border-radius: .1rem
    box-shadow: 0 0 0.2rem 0.1rem #EEE
    &:before
      position: absolute
      content: ' '
      width: 0
      height: 0
      top: -.36rem
      left: 1.12rem
      border: .18rem solid transparent
      border-bottom-color: $colFff
    .content
      padding: 0 .2rem
    .sightLabel
      transform: scale(.83) translateX(-.7rem)
      -webkit-transform: scale(.83) translateX(-.7rem)
      -o-transform: scale(.83) translateX(-.7rem)
      -ms-transform: scale(.83) translateX(-.7rem)
      -moz-transform: scale(.83) translateX(-.7rem)
      .border
        display: inline-block
        margin-right: .2rem
        padding: .03rem .08rem
        color: $emColor
        &:before
          border-color: $emColor
    .desc
      margin-top: .2rem
      font: 400 .26rem sans-serif
      color: #3a3a3a
      ellipsis2()
      -webkit-line-clamp: 3
    .addr
      margin-top: .3rem
      font-size: .24rem
      color: #7e7e7e
    .ticket-wrapper
      margin-top: .4rem
      padding-top: .2rem
      .ticket
        display: flex
        justify-content: space-between
        .name
          width: auto
          max-width: 5rem
          align-self: flex-end
          font: 500 .28rem sans-serif
          color: #3a3a3a
          text-align: left
          ellipsis()
      .price
        color: #ff6c00
        em
          padding: 0 .03rem
          font: 500 .48rem arial
        span
          display: inline-block
          color: #9c9c9c
    .more-info
      margin-top: .3rem
      padding-top: .2rem
      text-align: center
      color: #7e7e7e
      font-size: .24rem
</style>
