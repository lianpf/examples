<template>
  <div :style="{ background: userThemeColor }" class="page-test-inject">
    <h3>Test Module: 依赖注入（provide/reject）</h3>
    <div>
      <span>theme-color:</span>
      <span>{{ userThemeColor }}</span>
    </div>
    <div>
      <span>userLocation:</span>
      <span>{{ userLocation }}</span>
    </div>
    <div>
      <span>userGeolocation:</span>
      <span>{{ userGeolocation }}</span>
    </div>
    <button @click="updateThemeColor">toggle theme color</button>
  </div>
</template>

<script lang="ts">
import { inject, defineComponent } from "vue";

export default defineComponent({
  name: "TestInject",
  setup() {
    /**
     * @name: 依赖注入
     * @desc: 核心功能 —— 调用 inject 函数时，通过指定的数据名称，获取到父级共享的数据
     * @author: lianpf
     * @date: 2021.03.06
     *  */
    const userThemeColor = inject("themeColor");
    const updateThemeColor = inject("updateThemeColor");
    console.log("--userThemeColor--", userThemeColor);

    const userLocation = inject("location", "The Universe");
    const userGeolocation = inject("geolocation");

    return {
      userThemeColor,
      updateThemeColor,
      userLocation,
      userGeolocation
    };
  }
});
</script>

<style lang="stylus" scoped>
.page-test-inject
  padding: 12px;
  border-radius: 8px;
</style>
