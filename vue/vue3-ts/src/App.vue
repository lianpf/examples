<template>
  <div>
    <HeaderNav />
    <div class="layout-content">
      <RouterView />
    </div>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";

export default {
  name: "App",
  components: {
    HeaderNav
  }
};
</script>

<style lang="stylus">
#app
  height: 100vh;
  .layout-content
    position: absolute;
    padding: 0 24px 0 24px;
    top: 60px;
    width: 100%;
    > div
      height: 100%;
      margin-bottom: 8px;
    button
      background: #409EFF;
      margin: 8px 0 4px;
      padding: 4px 8px;
      line-height: 1.5;
      border: none;
      outline: none;
      border-radius: 5px;
      color: #fff;
</style>
