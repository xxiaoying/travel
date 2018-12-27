<template>
  <div class="container" @click="handleSwiperClick">
    <div class="wrapper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in gallaryImgs" :key="index">
          <img class="swiper-img" :src="item">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallary',
  props: {
    gallaryImgs: Array
  },
  data () {
    return {
      swiperOption: {
        // 修改swiper自己或子元素时，自动初始化swiper
        observer: true,
        // 修改swiper的父元素时，自动初始化swiper
        observeParents: true,
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
      }
    }
  },
  methods: {
    handleSwiperClick () {
      this.$emit('changSwiper')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container >>> .swiper-container
    overflow: inherit
  .container
    position: fixed
    z-index: 10
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #000
    display: flex
    justify-content: center
    flex-direction: column
    color: #fff
    // .wrapper
    //   height: 0
    //   width: 100%
    //   padding-bottom: 100%
    .swiper-img
      width: 100%
    .swiper-pagination
      color: #fff
      bottom: -1rem
</style>
