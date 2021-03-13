<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <span>test watchEffect</span>
      &nbsp;&nbsp;
      <span>{{ state.testWatchEffectCount }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, watchEffect } from "vue";

export default defineComponent({
  name: "About",
  components: {},
  setup() {
    const state = reactive({
      msg: '欢迎来到 "关于 vue3 和TS的语法DEMO"',
      testWatchEffectCount: 0
    });
    // watchEffect —— 1.自动收集数据源作为依赖、2.只有变更后的值、3.默认会执行一次寻找依赖，然后属性改变也会执行
    const count = ref(0);
    watchEffect(() => {
      console.log("--watchEffect-value--", count.value);
      state.testWatchEffectCount = count.value;
    });
    setInterval(() => {
      count.value++;
    }, 500);

    const stop = watchEffect(() => {
      console.log("--stop-effect--");
    });
    // 清除副作用
    watchEffect(onInvalidate => {
      console.log(count.value, "0-副作用");
      const token = setTimeout(() => {
        console.log(count.value, "1-副作用");
      }, 5000);
      onInvalidate(() => {
        // count(watchEffect函数依赖项) 改变时或停止侦听时，取消之前的异步操作
        token.cancel();
      });
    });

    onUnmounted(() => {
      stop();
    });
    return {
      state
    };
  }
});
</script>
