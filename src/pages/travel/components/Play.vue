<template>
  <div class="play">
    <!-- 大牌驾到 -->
    你心中的南京
  </div>
</template>

<script>
import axios from 'axios'
import { GET_PLAY_LIST } from '@/util/config'

export default {
  name: 'Play',
  data () {
    return {
      punchList: []
    }
  },
  mounted () {
    this.getPlayDatas()
    this.init()
  },
  methods: {
    init () {
      this.$emit('tabSelect', this.$route.query.index)
    },
    getPlayDatas () {
      // 实际情况会带参数获取数据
      axios.get(GET_PLAY_LIST + this.$route.params.type).then(this.getPunchDataSuccess)
    },
    getPlayDataSuccess (res) {
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

</style>
