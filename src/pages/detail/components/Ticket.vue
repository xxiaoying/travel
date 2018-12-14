<template>
  <section ref="ticketWrapper">
    <!-- 门票 一日游 景区服务 -->
    <nav
      class="border-bottom tab-title clear"
      :class="{'fixed-nav': fixNavStatus}"
      ref="nav">
      <ul>
        <li
          @click="tabClick(ticket, index)"
          v-for="(ticket, index) in list"
          :key="index">
          <span :class="{active: (selectTabIndex === index)}">{{ticket.title}}</span>
        </li>
      </ul>
    </nav>
    <!-- 门票 一日游 景区服务 -->
    <section class="tickets" v-for="(tickets, i) in list" :key="i" :ref="tickets.type">
      <h3 class="title tit-bg"><span class="iconfont ticket">&#xe609;</span>{{tickets.title}}</h3>
      <div class="list"
        v-for="(ticket, j) in tickets.children" :key="j" v-show="ticket.show">
        <div class="item">
          <section class="sub-title border-top" @click="subTitleClick(ticket)">
            <h4 class="name">{{ticket.title}}
                <span class="subname" v-if="ticket.subTitle">{{ticket.subTitle}}</span>
            </h4>
            <div class="price">
              <div>
                <i>￥</i><em>{{ticket.price}}</em><span>起</span>
                <span class="iconfont" v-if="!ticket.childShow">&#xe60b;</span>
                <span class="iconfont" v-if="ticket.childShow">&#xe63a;</span>
              </div>
            </div>
          </section>
          <!-- 票组信息 -->
          <section class="group" v-show="ticket.childShow">
            <div class="item border-top"
              v-for="(item, index) in ticket.children"
              :key="index"
              v-show="item.show"
              @click="reserveClick">
              <div class="summarily">
                <h3 class="g-tit">{{item.title}}</h3>
                <div>
                  <span class="iconfont clock">&#xe670;</span>
                  <span class="tomorrow">可订明日</span>
                </div>
                <div class="ticket-info">
                  <button class="border"><span class="iconfont wryg-col">&#xe71b;</span><i>自营</i></button>
                  <button>无需换票</button>
                  <button>条件退</button>
                </div>
                <div class="supplier">
                  <span>去哪儿直销</span>
                  <span class="border-left">预订须知
                  <span class="iconfont next">&#xe613;</span></span>
                </div>
              </div>
              <div class="dispose">
                <div><i class="unit">$</i><em class="price">{{item.price}}</em></div>
                <a class="reserve">预订</a>
              </div>
            </div>
            <div class="border-top more-price" v-if="ticket.more" @click="moreProductClick(ticket)">查看剩余报价<span class="iconfont more-all">&#xe60b;</span></div>
          </section>
        </div>
      </div>
      <div class="border-top more" v-if="tickets.more" @click="moreProductClick(tickets)">查看剩余产品<span class="iconfont more-all">&#xe60b;</span></div>
    </section>
  </section>
</template>

<script>
import TicketItem from '@/pages/detail/components/Item'
export default {
  name: 'Ticket',
  components: {
    TicketItem
  },
  props: {
    categoryList: Array,
    scrollY: Number
  },
  data () {
    return {
      fixNavStatus: false,
      selectTabIndex: 0,
      navTop: 0,
      navHegiht: 0
    }
  },
  mounted () {
    const navEle = this.$refs.nav
    this.navTop = navEle.offsetTop
    this.navHegiht = navEle.clientHeight
  },
  computed: {
    // 添加标志加载更多
    // 添加行显示标志
    // 标志子组件是否显示
    list () {
      var addAttribute = function (arr, size) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i]
          // 第一层循默认显示所有
          // 第二层默认显示2条，第三层默认显示3条
          if (size !== 2) {
            item.show = !(i >= size - 1)
            item.childShow = false
          }
          if (!item.children) {
            continue
          }
          if (item.children.length > size) {
            item.more = true
          }
          addAttribute(item.children, size + 1)
        }
      }

      addAttribute(this.categoryList, 2)
      // console.log(this.categoryList)
      return this.categoryList
    }
  },
  methods: {
    moreProductClick (tickets) {
      console.log(tickets)
      tickets.more = !tickets.more
      tickets.children.forEach((item) => {
        item.show = true
      })
      this.$forceUpdate()
    },
    subTitleClick (ticket) {
      ticket.childShow = !ticket.childShow
      this.$forceUpdate()
    },
    tabClick (ticket, index) {
      console.log(ticket)
      this.selectTabIndex = index
      const letterEle = this.$refs[ticket.type][0]
      const top = letterEle.offsetTop
      // 减去头部信息 和 margintop
      document.documentElement.scrollTop = top - 79 - 10
    },
    reserveClick () {
      this.$emit('displayReserve')
    }
  },
  watch: {
    scrollY () {
      const wrapperHeight = this.$refs.ticketWrapper.clientHeight
      const endHeight = wrapperHeight + this.navTop - this.navHegiht - 79
      if (this.scrollY > this.navTop && this.scrollY < endHeight) {
        this.fixNavStatus = true
      } else {
        this.fixNavStatus = false
        this.selectTabIndex = 0
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
.tab-title
  background: $colFff
  ul
    li
      width: 33%
      // display: inline-block
      float: left
      height: .98rem
      line-height: .94rem
      // width: 2.4rem
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
.fixed-nav
  position: fixed
  top: .86rem
  z-index: 81
  width: 100%
  overflow-x: scroll
.tickets
  margin-bottom: .2rem
  .tit-bg
    background: #fff
  .title
    title()
    text-indent: .2rem
    .ticket
      color: $colBcd
      margin-right: .1rem
  .sub-title
    background: #fff
    margin-bottom: -.02rem
    padding: .24rem .2rem
    display: flex
    .name
      flex: 1
      font-size: .3rem
      line-height: .48rem
      .subname
        font-size: .24rem
        color: $col888
        line-height: .32rem
        margin-right: 1.84rem
    .price
      display: flex
      align-items: center
      justify-content: center
      font-size: .24rem
      padding-left: .04rem
      i, em
        color: $emColor
      em
        font-size: .4rem
      span
        color: $nextIconCol
  .group
    // background:
    .item
      display: flex
      padding: .2rem 0 .2rem .2rem
      .summarily
        flex: 1
        color: $darkTextColor
        .g-tit
          font-size: .28rem
          line-height: .4rem
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
        .supplier
          margin-top: .08rem
          color: $darkTextColor
          font-size: .24rem
          line-height: .34rem
          .next
            font-size: .24rem
            margin-left: -.04rem
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
  .more-price
  .more
    height: .8rem
    background: $colFff
    line-height: .8rem
    text-align: center
    color: $darkTextColor
    .more-all
      margin-left: .1rem
      vertical-align: sub
</style>
