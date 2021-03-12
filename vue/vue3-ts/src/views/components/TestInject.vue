<template>
  <div>
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
    <button @click="updateThemeColor">change color</button>
  </div>
</template>

<script lang="ts">
import { inject, defineComponent } from "vue";

export default defineComponent({
  name: "TestInject",
  setup() {
    // 调用 inject 函数时，通过指定的数据名称，获取到父级共享的数据
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
