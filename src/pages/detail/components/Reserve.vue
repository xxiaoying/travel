<template>
  <!-- 预定弹出 -->
  <section class="reserve">
    <div class="header border-topbottom" style="display: block;">
      <div class="title">
        <h2 class="name">【当日8点前可定】总统府成人票【限18-59周岁成人购买】</h2>
      </div>
      <div class="iconfont close" @click="closeClick">&#xe670;</div>
    </div>
    <article class="content">
      <section class="group">
        <div class="item">
          <p class="title">预订说明</p>
          <div class="line">
            <div class="keyword">预订时间：</div>
            <div class="con">
              <div class="ellipsis">
                  <span class="light">可订明日</span>
              </div>
              <p class="desc">需要在游玩当天的08:00前预订</p>
            </div>
          </div>
          <div class="line">
            <div class="keyword">有 效 期：</div>
            <div class="con">
                <p class="desc">游玩日期当天有效</p>
            </div>
          </div>
          <div class="line">
            <div class="keyword">限购政策：</div>
            <div class="con">
                <p class="desc">每笔订单最多购买1份<br>同一身份证每30天最多预订1份<br>同一手机号每30天最多预订1份</p>
            </div>
          </div>
        </div>

        <div class="item">
          <p class="title">入园须知</p>
          <div class="line">
            <div class="keyword">入院方式</div>
            <div class="con">
              <div class="ellipsis">
                  <span class="light">无需换票，快速入园</span>
              </div>
              <p class="desc">凭身份证在江苏省南京市玄武区东长江路292号总统府景区大门口直接验证入园</p>
            </div>
          </div>
          <div class="line">
            <div class="keyword">开放时间：</div>
            <div class="con">
                <p class="desc">
                  3月～10月：08:30～18:00开放，17:00停止入园；
                  <br>
                  11月～2月：08:00～17:00开放，16:00停止入园；
                </p>
            </div>
          </div>
        </div>

        <div class="item">
          <p class="title">退款说明</p>
          <div class="line">
            <div class="keyword">退款规则</div>
            <div class="con">
              <div class="ellipsis">
                  <span class="light">条件退</span>
              </div>
              <p class="desc">使用日期截止后29天23:59前可申请退款</p>
            </div>
          </div>
          <div class="line">
            <div class="keyword">极速处理</div>
            <div class="con">
              <p class="desc">去哪儿网承诺，提交申请后一个工作日内完成退款申请的审核</p>
            </div>
          </div>
          <div class="line">
            <div class="keyword">额外说明：</div>
            <div class="con">
                <p class="desc">
                  本商品支持30天内未使用随时退。预订付款后未使用，可在“我的订单”中申请退款，且不收取任何手续费。
                </p>
            </div>
          </div>
        </div>
      </section>

    </article>
  </section>
</template>

<script>
export default {
  name: 'Reserve',
  methods: {
    closeClick () {
      this.$emit('closeReserveClick')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
.reserve
  position: fixed
  z-index: 92
  top: .88rem
  right: 0
  bottom: 0
  left: 0
  width: 100%
  background: #fff
  .header
    line-height: .5rem
    font-size: .34rem
    text-align: center
    color: #212121
    .title
      text-align: left
      padding: .4rem .2rem .4rem .2rem
      .name
        margin-right: .5rem
        font-size: .32rem
        font-weight: bold
    .close
      position: absolute
      top: .2rem
      right:0
      width: .88rem
      height: 1rem
      color: #9e9e9e
      font-size: .4rem
      line-height: 1rem
      text-align: center
  .content
    position: absolute
    overflow-y: auto
    bottom: 0
    right: 0
    left: 0
    top: 1.8rem
    .group
      position: relative
      padding: 0 .38rem .3rem .38rem
      .item
        padding-bottom: .2rem
        .title
          position: relative
          margin-top: .3rem
          height: .48rem
          color: #212121
          font-size: .34rem
          line-height: .48rem
          &:before
            content: ''
            position: absolute
            top: .06rem
            left: -.18rem
            width: .06rem
            height: .32rem
            background: #00bcd4
            border-radius: .06rem
        .line
          overflow: hidden
          margin-top: .2rem
          color: #616161
          font-size: .28rem
          line-height: .4rem
          word-break: break-all
          word-wrap: break-word
          .keyword
            float: left
            width: 1.4rem
            color: #212121
            text-align: justify
          .con
            overflow: hidden
            .ellipsis
              width: 100%
              margin-bottom: .08rem
              ellipsis()
              .light
                display: inline-block
                height: .38rem
                padding: 0 .1rem
                color: #fff
                font-size: .24rem
                line-height: .38rem
                border-radius: .02rem
                background-image: -webkit-gradient(linear,left top,right bottom,from(#ffab1e),to(#ff8c12))
                background-image: -webkit-linear-gradient(-60deg,#ffab1e 37%,#ff8c12 100%)
                background-image: -moz-linear-gradient(-60deg,#ffab1e 37%,#ff8c12 100%)
                background-image: -o-linear-gradient(-60deg,#ffab1e 37%,#ff8c12 100%)
                background-image: linear-gradient(130deg,#ffab1e 37%,#ff8c12 100%)
</style>
