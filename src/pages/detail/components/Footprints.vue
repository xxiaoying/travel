<template>
  <!-- 用户评论 -->
  <section class="footprints">
    <h3 class="title">看了该景点的人还看了</h3>
    <!-- <div class="item border-top"
      v-for="item in footprints"
      :key="item.id"> -->
    <ul class="like-list border-top">
      <li class="like-item border-bottom" v-for="item in footprints" :key="item.id">
        <div v-if="item.tag">
          <div class="tag-bg" :class="[item.class]">{{item.status}}</div>
        </div>
        <div class="img-warpper">
          <img class="img-content" :src="item.imgUrl">
        </div>
        <div class="info">
          <div class="name-price">
            <h3 class="name">{{item.title}}</h3>
            <div class="ticket">
              <span class="unit">￥<em class="price">{{item.price}}</em></span>起
            </div>
          </div>
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
          <div class="addr">{{item.addr}}</div>
        </div>
      </li>
    </ul>
    <!-- </div> -->
  </section>
</template>

<script>
export default {
  name: 'Footprints',
  props: {
    footprints: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
.footprints
  margin-top: .2rem
  background: $colFff
  .title
    padding: 0 .2rem
    text-indent: .2rem
    title()
    position: relative
    &:before
      content: " "
      position: absolute
      top: .33rem
      left: .2rem
      width: .06rem
      height: .25rem
      background: $colBcd
      -webkit-border-radius: .04rem
      -moz-border-radius: .04rem
      border-radius: .04rem
  .like-list
    .like-item
      padding: .2rem 0 .2rem .2rem
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
      .img-warpper
        width: 1.6rem
        height: 1.6rem
        .img-content
          width: 100%
      .info
        flex: 1
        padding: 0 .2rem
        overflow: hidden
        .name-price
          display: flex
          padding-top: .06rem
          .name
            flex: 1
            font-size: .32rem
          .ticket
            font-size: .24rem
            color: $nextIconCol
            .unit
              color: $emColor
            .price
              font-size: .36rem
        .level
          padding: .4rem 0 .22rem
          .level-scope
            position: relative
            width: 1.2rem
            height: .2rem
            display: inline-block
            margin-right: .2rem
            color: #e0e0e0
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
          color: $nextIconCol
</style>
