<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'FadeAnimation'
}
</script>

<style lang="stylus" scoped>
  .fade-enter-active
  .fade-leave-active
    transition: opacity .5s
  .fade-enter
  .fade-leave-to
    opacity: 0
</style>
