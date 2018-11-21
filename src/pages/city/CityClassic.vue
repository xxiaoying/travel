<template>
  <div>
    <header class="header">
      <router-link to="/">
        <div class="header-left">
          <span class="iconfont icon-back">&#xe624;</span>
        </div>
      </router-link>
        城市选择
    </header>
    <!-- 搜索 -->
    <section>
      <div class="search">
        <input v-model="letter" class="search-text" type="" name="" placeholder="输入城市名或拼音">
      </div>
      <!-- 搜索弹出信息 -->
      <div class="search-content" ref="searchContent" v-show="letter">
        <ul>
          <li class="item border-bottom"
            v-for="item in filterCities"
            :key="item.id"
            @click="switchCity(item.name)">{{item.name}}</li>
          <li class="item border-bottom" v-show="hasNoData">没有搜索到城市</li>
        </ul>
      </div>
    </section>
    <!-- 城市列表 -->
    <div class="list" ref="wrapper">
      <div>
        <div class="title">当前城市</div>
        <div class="button-list">
          <div class="wrapper">
            <!-- {{this.$store.state.currentCity}} -->
            <div class="button">南京</div>
          </div>
        </div>
        <div class="title">热门城市</div>
        <div class="button-list">
          <div class="wrapper" v-for="city in hotCities" :key="city.id" @click="switchCity(city.name)">
            <div class="button">{{city.name}}</div>
          </div>
        </div>
        <!-- 字母分类城市 -->
        <div>
          <div  v-for="(item, key) of allCities" :key="key" :ref="key">
            <div class="title">{{key}}</div>
            <div class="city border-bottom" v-for="city in item" :key="city.id" @click="switchCity(city.name)">{{city.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <section class="aplhabets">
      <div class="aplhabet"
        v-for="item of letters"
        :key="item"
        :ref="item"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @click="changeLetter(item)">
        {{item}}
      </div>
    </section>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  name: 'CityClassic',
  data () {
    return {
      allCities: {},
      hotCities: [],
      letter: null, // 绑定城市搜索框
      filterCities: [], // 搜索城市的结果
      letterIndex: null, // 城市字母搜索索引
      timer: null,
      touchStatus: false,
      startY: 0
    }
  },
  // 页面数据被更新并加载完成时执行的生命周期钩子
  updated () {
    // startY 值是固定的，所以提出来，如果在handleTouchMove方法中则每次都获取，对性能有影响
    this.startY = this.$refs['A'][1].offsetTop
    this.scroll = new BScroll(this.$refs.wrapper)
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.searchContent)
    this.getCitiesData()
  },
  methods: {
    // 切换城市
    switchCity (city) {
      // this.$store.commit('changCurrent', city)
      // this.$router.push('/')
    },
    getCitiesData () {
      axios.get('/api/city.json').then(this.getCitiesSuccess)
    },
    getCitiesSuccess (res) {
      const data = res.data.data
      this.allCities = data.cities
      this.hotCities = data.hotCities
    },
    // 点击城市索引
    changeLetter (letterIndex) {
      this.letterIndex = letterIndex
    },
    // 为什么要用touchStart 主要是区分是否是点击事件还是滑动，是用标识位判断
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      // 鼠标移动会导致方法执行次数变多
      // 使用setTimeout做函数节流，减少函数执行次数
      if (!this.touchStatus) {
        return
      }

      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        let touchClientY = e.touches[0].clientY
        let index = Math.floor((touchClientY - 79 - this.startY) / 22)
        if (index >= 0 && index < this.letters.length) {
          let letterIndex = this.letters[index]
          let letterEle = this.$refs[letterIndex][0]
          this.scroll.scrollToElement(letterEle)
        }
      }, 16)
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  },
  computed: {
    // 提取出所有城市
    cities () {
      let cities = []
      for (let i in this.allCities) {
        for (let value of this.allCities[i]) {
          cities.push(value)
        }
      }
      return cities
    },
    hasNoData () {
      return !this.filterCities.length
    },
    // 提取城市字母列表
    letters () {
      let letters = []
      for (let letter in this.allCities) {
        letters.push(letter)
      }
      return letters
    }
  },
  watch: {
    // 搜索
    letter () {
      if (!this.letter) {
        this.filterCities = []
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        let cities = []
        for (let item of this.cities) {
          if (item.spell.indexOf(this.letter) > -1 || item.name.indexOf(this.letter) > -1) {
            cities.push(item)
          }
        }
        this.filterCities = cities
      }, 100)
    },
    // 监听右侧的城市索引
    letterIndex () {
      if (this.letterIndex) {
        const letterEle = this.$refs[this.letterIndex][0]
        this.scroll.scrollToElement(letterEle)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
@import '~styles/mixins.styl'
.header
  height: .86rem
  line-height: .86rem
  color: #fff
  background: $bgHeaderColor
  text-align: center
  font-size: .32rem
  .header-left
    width: .64rem
    padding-left: .2rem
    position: absolute
    text-align: left
    top: 0
    .icon-back
      font-size: .32rem
      font-weight: bold
      color: #fff
.search
  height: .72rem
  line-height: .72rem
  background: $bgHeaderColor
  text-align: center
  padding: 0 .1rem .1rem .1rem
  box-sizing: border-box
  .search-text
    background: #fff
    border-radius: .1rem
    width: 100%
    height: .62rem
    vertical-align: top
    padding-left: .1rem
    box-sizing: border-box
.search-content
  position: absolute
  overflow: hidden
  top: 1.58rem
  bottom: 0
  left: 0
  right: 0
  background: #f5f5f5
  z-index:1
  .item
    padding: .2rem
    background: #fff
.list
  position: absolute
  right: 0
  top: 1.58rem
  bottom: 0
  left: 0
  overflow: hidden;
  .title
    background: $titleBgColor
    height: 0.6rem
    line-height: 0.6rem
    text-indent: 0.2rem
  .button-list
    overflow: hidden
    padding: .1rem .6rem .1rem .1rem
    .wrapper
      float: left
      width: 33.3%
      .button
        border: .02rem solid #dcdcdc
        border-radius: .05rem
        padding: .1rem 0
        margin: .1rem
        text-align: center
  .city
    padding: .2rem
.aplhabets
  position: absolute
  right: 0
  top: 1.58rem
  bottom: 0
  text-align: center
  padding: 0 .2rem
  display: flex
  flex-direction: column
  justify-content: center
  .aplhabet
    padding: .08rem 0
    color: $bgHeaderColor
</style>
