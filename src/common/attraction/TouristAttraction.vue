<template>
  <div class="like-item border-bottom">
    <div v-if="item.tag">
      <div class="tag-bg" :class="[item.tag]">{{formatterStatus(item)}}</div>
    </div>
    <div class="img-warpper">
      <img class="img-content" :src="item.imgUrl">
    </div>
    <div class="info">
      <h3 class="name" :style="{paddingTop: paddingTop + 'rem'}">{{item.title}}</h3>
      <div class="level">
        <span class="level-scope">
          <strong class="score" :style="{ width: item.score }">
            <span class="iconfont icon-score">&#xe61a;&#xe61a;&#xe61a;&#xe61a;&#xe61a;</span>
          </strong>
          <span>
            <span class="iconfont icon-score">&#xe61a;&#xe61a;&#xe61a;&#xe61a;&#xe61a;</span>
          </span>
        </span>
        <span class="comment">{{item.total}}条评论</span>
      </div>
      <div class="price-addr">
        <div class="ticket">
          <span class="unit">￥<em class="price">{{item.price}}</em></span>起
        </div>
        <div class="addr">{{item.addr}}</div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TouristAttraction',
  props: {
    item: Object,
    paddingTop: Number
  },
  methods: {
    formatterStatus (row) {
      if (row.tag === 'wbwui') {
        return '谁买谁用'
      } else if (row.tag === 'reserve') {
        return '可订明日'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
    .like-item
      padding: .2rem 0
      position: relative
      display: flex
      .tag-bg
        position: absolute
        top: .2rem
        left: 0
        width: 1.06rem
        line-height: .4rem
        color: $colFff
        font-size: .24rem
        padding-left: .04rem
      .wbwui
        background: url(https://img1.qunarzz.com/piao/fusion/1802/20/2ba6d10b17972e02.png)
        background-size: cover
      .reserve
        background: url(https://img1.qunarzz.com/piao/fusion/1802/52/b9080e45b69b4f02.png)
        background-size: cover
      .img-warpper
        width: 2rem
        height: 2rem
        .img-content
          width: 100%
      .info
        flex: 1
        padding: 0 .2rem
        overflow: hidden
        .name
          font-size: .32rem
          padding-top: .26rem
          color: #333 !important
        .level
          padding: .24rem 0 .22rem
          .level-scope
            position: relative
            width: 1.2rem
            height: .2rem
            display: inline-block
            margin-right: .2rem
            color: $borderCol
            .score
              color: $emColor
              position: absolute
              width: 50%
              overflow: hidden
            .icon-score
              font-size: .24rem
        .comment
        .addr
          font-size: .24rem
          color: $darkTextColor
        .price-addr
          display: flex
          line-height: .4rem
          .ticket
            font-size: .24rem
            flex: 1
            color: $darkTextColor
            .unit
              color: $emColor
            .price
              font-size: .38rem
  .feature
    margin-top: .38rem
    margin-right: .24rem
    padding: .04rem .1rem
    color: #f55
    font-size: .24rem
    line-height: .34rem
    ellipsis()
    .bg-feature
      background: #fff9f9
.filter
  background: $colFff
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
</style>
