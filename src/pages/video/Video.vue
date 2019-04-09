<template>
  <div class="container">
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
export default {
  name: 'Video',
  data () {
    return {
      player: null,
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          // {
          //   src: 'https://media.html5media.info/video.mp4',
          //   type: 'video/mp4'
          // }
        ],
        poster: 'https://wcenter.aitectcare.com/healthcloud/file/frame/20190403/test.mp4?num=10&w=100&h=100'
      }
    }
  },
  mounted () {
    this.videoOptions.sources = [{
      src: 'https://media.html5media.info/video.mp4',
      type: 'video/mp4'
    }]
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions, function onPlayerReady () {
      console.log('onPlayerReady', this)
    })
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container >>> .vjs_video_3-dimensions
    width: 100%
    position: absolute
    bottom: 0
    top: 0
    height: 100%
  .container >>> .vjs-big-play-button
    line-height: 2em
    height: 2em
    width: 2em
    border-radius: 50%
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
  /* 隐藏全屏控制和音量控制  */
  .container >>> .vjs-volume-panel
  .container >>> .vjs-fullscreen-control
    display: none
</style>
