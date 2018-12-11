<template>
  <div>
    <section class="header border-bottom">
      <div class="header-left" @click="backClick">
        <span class="iconfont icon-back">&#xe624;</span>
      </div>
      <nav>
        <ul>
          <li><span class="active">攻略</span></li>
          <li><span>点评</span></li>
        </ul>
      </nav>
    </section>
    <div class="strategy">
      <section class="item" v-for="item in stragegyList" :key="item.id">
        <div class="main-img-wrapper">
          <img class="main-img" :src="item.mainImg">
          <div class="img-head-icon">
            <img class="head-img" :src="item.headImg">
          </div>
          <div class="img-total-icon">
              <span class="iconfont total-icon">&#xe678;</span>
              <em class="imgs-wipe-icon-number">{{item.total}}</em>
          </div>
        </div>
        <div class="info">
          <div class="person-info">
            <span>{{item.name}}</span>
            <span class="level-scope">
              <strong class="score" :style="{width: item.score}">
                <span class="iconfont icon-score">&#xe61a;&#xe61a;&#xe61a;&#xe61a;&#xe61a;</span>
              </strong>
              <span>
                <span class="iconfont icon-score">&#xe61a;&#xe61a;&#xe61a;&#xe61a;&#xe61a;</span>
              </span>
            </span>
            <span class="time">{{item.time}}</span>
          </div>
          <div class="comment">
            <div style="height: 100px; overflow: hidden;">{{item.content}}</div>
            <div class="more-comment">
              <span class="iconfont">&#xe60b;</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Strategy',
  data () {
    return {
      stragegyList: [],
      commentList: []
    }
  },
  mounted () {
    this.getDetailDatas()
  },
  computed: {
  },
  methods: {
    getDetailDatas () {
      axios.get('/api/stragegyAndComment.json').then(this.getDetailDatasSuccess)
    },
    getDetailDatasSuccess (res) {
      const resData = res.data
      this.stragegyList = resData.stragegyList
      // this.commentList = resData.commentList
    },
    backClick () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
.header
  display: flex
  background: $colFff
  height: .86rem
  line-height: .86rem
  nav
    flex: 1
    border-radius: .04rem
    height: .68rem
    line-height: .68rem
    margin-top: .12rem
    font-size: .38rem
    margin-right: .64rem
    color: $colBcd
    li
      float: left
      width: 50%
      text-align: center
      span
        width: 50%
        display: inline-block
      .active
        border-bottom: .04rem solid $colBcd
  .header-left
    width: .64rem
    padding-left: .2rem
    .icon-back
      font-size: .32rem
      font-weight: bold
.strategy
  position: absolute
  top: 43px
  bottom: 0
  left: 0
  right: 0
  overflow: auto
  .item
    position: relative
    background-color: $colFff
    margin-bottom: .2rem
    .main-img-wrapper
      position: relative
      .main-img
        width: 100%
      .img-head-icon
        position: absolute
        left: .2rem
        bottom: -0.6rem
        background-color: #fff
        width: 1.2rem
        height: 1.2rem
        border-radius: .62rem
        padding: .04rem
        .head-img
          width: 100%
          border-radius: .6rem
      .img-total-icon
        position: absolute
        bottom: .2rem
        right: .2rem
        width: 1.2rem
        height: .4rem
        background: rgba(0,0,0,.5)
        border-radius: .2rem
        font-size: .24rem
        color: #fff
        line-height: .4rem
        text-align: center
        .total-icon
          font-size: .12rem
          margin-right: .1rem
    .more-comment
      height: .8rem
      background: $colFff
      color: $darkTextColor
      line-height: .8rem
      text-align: center
  .info
    padding: .2rem .3rem 0 .3rem
    color: #616161
    font-size: .28rem
    overflow: hidden
    .person-info
      padding-left: 1.2rem
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
      .time
        position: absolute
        right: .4rem
        color: #9e9e9e
    .comment
      margin-top: .2rem
      line-height: .4rem
</style>
