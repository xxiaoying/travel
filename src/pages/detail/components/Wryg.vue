<template>
  <!-- 去哪儿推荐 -->
  <section class="wryg">
    <h2 class="border-bottom catalog">
      <span class="iconfont fabulous">&#xe680;</span>
      去哪儿推荐
    </h2>
    <section class="detail border-bottom" @click="reserveClick">
      <div class="summarily">
        <h3 class="title">
          【当日8点前可定】总统府成人票【限18-59周岁成人购买】
        </h3>
        <div>
          <span class="iconfont clock">&#xe670;</span>
          <span class="tomorrow">可订明日</span>
        </div>
        <div class="ticket-info">
          <button class="border"><span class="iconfont wryg-col">&#xe71b;</span><i>自营</i></button>
          <button>无需换票</button>
          <button>条件退</button>
        </div>
      </div>
      <div class="dispose">
        <div><i class="unit">￥</i><em class="price">37</em><span class="moneny">起</span></div>
        <a class="reserve">预订</a>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Wryg',
  methods: {
    reserveClick () {
      this.$emit('displayReserve')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
.wryg
  background: $colFff
  margin-bottom: .2rem
  padding-left: .2rem
  .catalog
    title()
    .fabulous
      top: 0
      color: #ff684b
      z-index: 1
  .detail
    display: flex
    padding: .2rem 0
    .summarily
      flex: 1
      color: $darkTextColor
      .title
        margin-right: .1rem
        line-height: .52rem
        padding: 0
        font-size: .3rem
      .clock
        color: $colBcd
      .tomorrow
        font-size: .24rem
      .ticket-info
        position: relative
        .wryg-col
          color: $ticketCol
          position: absolute
          left: 0
          top: -.04rem
        i
          margin-left: .26rem
        button
          margin-top: .1rem
          font-size: .24rem
          color: $ticketCol
          background: $colFff
          border: .02rem solid #a5e4ec
          // border-radius: .1rem
          padding: 0 .04rem
    .dispose
      color: $emColor
      text-align: center
      display: flex
      flex-direction: column
      justify-content: center
      font-size: .24rem
      .price
        font-size: .4rem
        line-height: .4rem
      .moneny
        color: $nextIconCol
      .reserve
        font-size: .28rem
        display: block
        margin: 0 .2rem
        color: $colFff
        background-image: -webkit-gradient(linear,left top,right bottom,from(#ffab1e),to(#ff8c12))
        padding: .16rem .46rem
        border-radius: .1rem
</style>
