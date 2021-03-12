<template>
  <div>
    <HeaderNav />
    <div class="layout-content">
      <RouterView />
    </div>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav";

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
    top: $headerHeight;
    bottom: 0;
    width: 100%;
    > div
      height: 100%;
</style>
