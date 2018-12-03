<template>
  <!-- 用户评论 -->
  <section class="comment">
    <h3 class="title">用户评论</h3>
    <div class="item border-top"
      v-for="(comment, index) in userCommentList"
      :key="comment.id"
      v-if="index < 2">
      <div class="level">
        <span class="level-scope">
          <!-- :style="{ width: item.score }" -->
          <strong class="score" :style="{width: comment.score}">
            <span class="iconfont icon-score">&#xe61a;&#xe61a;&#xe61a;&#xe61a;&#xe61a;</span>
          </strong>
          <span>
            <span class="iconfont icon-score">&#xe61a;&#xe61a;&#xe61a;&#xe61a;&#xe61a;</span>
          </span>
        </span>
        <span class="info">{{comment.userName}}<span class="time">{{comment.time}}</span></span>
      </div>
      <p class="content clear" style=" overflow: hidden;" :ref="comment.id">{{comment.content}}</p>
      <div class="iconfont more" v-if="comment.show" @click="moreClick(comment, $event)">&#xe60b;</div>
      <div></div>
      <!-- 图片集合 -->
      <div class="imgs" @click="picGallary(comment.imgList)">
        <div class="img-container"
          v-for="(img,index) in comment.imgList"
          v-if="index < 6"
          :key="img.id">
          <div class="img-content">
            <img :src="img.imgUrl">
          </div>
        </div>
        <div class="total" v-if="comment.imgList.length > 6">
          <span class="num">共{{comment.imgList.length}}张</span>
        </div>
      </div>
    </div>
    <div class="more-comment more-top" v-if="userCommentList.length > 2">查看全部评论<span class="iconfont">&#xe60b;</span></div>
  </section>
</template>

<script>
const LINE = 4
export default {
  name: 'Comment',
  props: {
    userCommentList: Array
  },
  data () {
    return {
      lineHeight: null
    }
  },
  watch: {
    userCommentList () {
      if (!this.userCommentList) {
        return
      }
      for (let i = 0; i < 2; i++) {
        let comment = this.userCommentList[i]
        this.$nextTick(() => {
          console.log(comment)
          let element = this.$refs[comment.id][0]
          comment.show = this.isOutLine(element)
          comment.textShow = true
          if (comment.show) {
            this.setHeight(element)
          }
          this.$forceUpdate()
        })
      }
    }
  },
  methods: {
    // 计算内容是否超出4行
    // 使用高度/行高
    isOutLine (element) {
      const styles = window.getComputedStyle(element, null)
      let lh = parseInt(styles.lineHeight)
      this.lineHeight = lh
      let h = parseInt(styles.height)
      let lc = Math.round(h / lh)
      return lc > LINE
    },
    setHeight (element) {
      element.style.height = (this.lineHeight * LINE) + 'px'
    },
    moreClick (comment, event) {
      let element = this.$refs[comment.id][0]
      if (comment.textShow) {
        event.target.innerHTML = '&#xe63a;'
        element.style.height = 'auto'
      } else {
        event.target.innerHTML = '&#xe60b;'
        this.setHeight(element)
      }
      comment.textShow = !comment.textShow
    },
    picGallary (imgs) {
      console.log(imgs)
      this.$emit('picGallary', imgs)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
.comment
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
  .item
    padding: .1rem .2rem .3rem .2rem
    .level
      padding: .26rem .2rem .1rem .2rem
      line-height: .6rem
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
      .info
        position: relative
        float: right
        top: .2rem
        line-height: .28rem
        font-size: .24rem
        .time
          margin-left: .16rem
    .content
      line-height: .42rem
      font-size: .26rem
      color: $darkTextColor
    .more
      text-align: center
      color: $darkTextColor
    .imgs
      margin: .2rem 0 .1rem 0
      position: relative
      zoom: 1
      overflow: hidden
      .img-container
        float: left
        width: 33.33%
        margin-bottom: .1rem
        .img-content
          margin: 0 .06rem
          img
            width: 100%
      .total
        position: absolute
        bottom: .4rem
        right: .04rem
        .num
          font-size: .24rem
          color: #fff
          padding: .08rem .04rem .08rem .26rem
          border-radius: .5rem 0 0 .5rem
          background: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .7))
  .more-comment
    height: .8rem
    background: $colFff
    color: $darkTextColor
    line-height: .8rem
    text-align: center
  .more-top
    border-top: .02rem dashed $borderCol
</style>
