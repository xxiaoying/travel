<template>
  <div>
    <header class="header border-bottom">
      <router-link to="/" class="header-left" tag="div">
        <span class="iconfont icon-back">&#xe624;</span>
      </router-link>
      <div class="header-input">
        <input type="text" placeholder="请输入城市或景点" value="景点门票">
        <span class="iconfont icon-search">&#xe62d;</span>
      </div>
      <router-link to="/city" tag="div" class="header-right">
        搜索
      </router-link>
    </header>
    <nav class="border-bottom filter">
      <ul class="select">
        <li class="border-right">全部分类<span class="caption iconfont">&#xe60b;</span></li>
        <li>推荐排序<span class="caption iconfont">&#xe60b;</span></li>
      </ul>
    </nav>
    <section class="scenic-spot">
      <ul>
        <li v-for="item in likeList" :key="item.id" class="item">
        <router-link :to="'/detail/' + item.id">
          <tourist-attraction :item="item" :paddingTop="0.06">
              <div class="tag-list" v-if="item.tagList">
                <span class="border" :class="tag.class" v-for="tag in item.tagList"><em>{{tag.txt}}</em></span>
              </div>
          </tourist-attraction>
        </router-link>
        <div class="ticket-item border-bottom" v-for="ticket in item.ticketList">
           <h3>{{ticket.name}}</h3>
           <span>¥<em>{{ticket.price}}</em></span>
        </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import TouristAttraction from '@/common/attraction/TouristAttraction'
export default {
  name: 'Fusion',
  components: {
    TouristAttraction
  },
  data () {
    return {
      likeList: []
    }
  },
  methods: {
    getIndexDatas () {
      axios.get('/api/fusion.json').then(this.getIndexInfoSuccess)
    },
    getIndexInfoSuccess (res) {
      const resData = res.data.data
      this.likeList = resData.likeList
    }
  },
  mounted () {
    this.getIndexDatas()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
@import '~styles/header.styl'
.header
  background: $colFff
  .header-input
    background: $colF2f
    border-radius: .3rem
    padding: 0 .6rem 0 .2rem
    position: relative
    input
      width: 100%
      line-height: .4rem
      padding: .1rem 0
      background: $colF2f
      font-size: .28rem
      text-align: center
    span
      font-size: .48rem
      position: absolute
      right: 0.1rem
      top: 0
.scenic-spot
  .ticket-item + .ticket-item
    &:before
      border-color: transparent
  .item
    padding-left: .24rem
    background: $colFff
    // margin-top: .2rem
    .tag-list
      margin-top: .18rem
      font-size: 0
      em
        font-size: .24rem
        transform: scale(.83)
        line-height: .336rem
        display: inline-block
      span
        display: inline-block
      span + span
        margin-left: .08rem
      .tag-y
        color: #ff8a00
        &:before
          border-color: #fa0
      .tag-g
        color: #00afc7
        &:before
          border-color: #a5e4ec
      .tag-g-b
        color: #00afc7
        background: #f0fbfd
        &:before
          border-color: transparent
    .ticket-item
      display: flex
      height: .96rem
      line-height: .96rem
      h3
        flex: 1
      span
        display: block
        padding: 0 .2rem
        font-size: .2rem
        color: $emColor
        em
          font-size: .32rem
  .item + .item
    margin-top: .2rem
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
