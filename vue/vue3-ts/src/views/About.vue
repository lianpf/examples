<template>
  <div class="about">
    <h1>This is an about page</h1>
    <hello-world :msg="state.msg"></hello-world>
  </div>
</template>

<script>
import { reactive, defineComponent} from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  name: "About",
  components: {
    HelloWorld
  },
  step() {
    const state = reactive({
      msg: '欢迎来到 "关于 vue3 和TS的语法DEMO"'
    });

    return {
      state
    }
  }
});
</script>
