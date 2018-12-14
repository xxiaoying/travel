<template>
  <!-- 缓存首页和城市页面 -->
  <keep-alive include="Home,City">
    <router-view/>
  </keep-alive>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
