<template>
  <section class="item border-bottom">
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
      <div><i class="unit">$</i><em class="price">37</em></div>
      <a class="reserve">预订</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TicketItem',
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
.item
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
    .price
      font-size: .4rem
      line-height: .4rem
    .reserve
      font-size: .28rem
      display: block
      margin: 0 .2rem
      color: $colFff
      background-image: -webkit-gradient(linear,left top,right bottom,from(#ffab1e),to(#ff8c12))
      padding: .16rem .46rem
      border-radius: .1rem
</style>
