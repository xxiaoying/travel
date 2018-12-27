<template>
  <div class="punch">
    <!-- 大牌驾到 -->
    <router-link
      tag="section"
      :to="item.type==='skill' ? '/skill' + item.id : '/detail/' + item.id"
      class="column"
      v-for="item in punchList"
      :class="{skill: item.type==='skill'}"
      :key="item.id">
      <div class="picture">
        <img :src="item.imgUrl">
      </div>
      <div class="info">
        <div class="title">
            {{item.title}}
        </div>
        <div class="description ellipsis3" v-if="item.type!=='skill'">
            {{item.desc}}
        </div>
        <div class="card-footer" v-if="item.type==='skill'">
            <div class="amount">
                <span class="price">¥<em>{{item.price}}</em><span>起</span></span>
                <div class="pre-price">¥100</div>
            </div>
            <div class="recommend-reason">
                <span class="ellipsis">秒杀价</span>
            </div>
        </div>
        <div class="card-footer" v-else>
            <div class="recommend-reason">
                <span class="ellipsis">{{item.reason}}</span>
            </div>
            <div class="amount">
                <span class="price">¥<em>{{item.price}}</em><span>起</span></span>
            </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
import { GET_PUNCH_LIST } from '@/util/config'
export default {
  name: 'Punch',
  data () {
    return {
      punchList: []
    }
  },
  mounted () {
    this.getPunchDatas()
    this.init()
  },
  methods: {
    init () {
      this.$emit('tabSelect', this.$route.query.index)
    },
    getPunchDatas () {
      // 实际情况会带参数获取数据
      axios.get(GET_PUNCH_LIST).then(this.getPunchDataSuccess)
    },
    getPunchDataSuccess (res) {
      const resData = res.data.data
      this.punchList = resData.punchList
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
@import '~styles/header.styl'
.punch
  padding: .2rem .2rem 0
  -webkit-column-count: 2
  -moz-column-count: 2
  column-count: 2
  -moz-column-gap: .2rem
  -webkit-column-gap: .2rem
  column-gap: .2rem
  .column
    border-radius: .1rem
    margin-bottom: .2rem
    cursor: pointer
    // $colFff
    background: $colFff
    box-shadow: 0 0 0.2rem 0.1rem #eee
    height:100%
    overflow: auto
    .picture
      // height: 0
      // padding-bottom: 89.855%
      // overflow: hidden
      img
        width: 100%
    .info
      padding: .16rem .2rem .2rem
      .title
        // font-size: .36rem
        font: 500 .36rem sans-serif
        color: #131313
        ellipsis()
      .description
        margin-top: .08rem
        // font-size: .26rem
        font: 400 .26rem sans-serif
        color: #616161
      .ellipsis3
        ellipsis2()
        -webkit-line-clamp: 3
      .card-footer
        .recommend-reason
          padding-top: .16rem
          span
            display: inline-block
            padding: 0 .1rem
            font: 400 .2rem sans-serif
            color: #6d7dff
            background-color: #f4f5ff
            border-radius: .05rem
            ellipsis2()
        .amount
          margin-top: .1rem
          .price
            font: 400 .26rem sans-serif
            color: #ff6c00
            em
              padding: 0 .03rem
              font: 500 .48rem arial
            .span
              display: inline-block
              color: #9c9c9c
  .skill
    overflow: hidden
    .card-footer
      display: flex
      .amount
        flex: 1
        .pre-price
          padding-right: .2rem
          color: #9c9c9c
          text-decoration: line-through
      .recommend-reason
        .ellipsis
          margin-top: .1rem
          color: #ff6c00  !important
          background-color: #fff6f0 !important
</style>
