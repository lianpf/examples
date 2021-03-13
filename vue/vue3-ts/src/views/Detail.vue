<template>
  <div class="page-detail">
    <div>
      <button @click="goBack">返回</button>
      &nbsp;&nbsp;
      <span>detail</span>
    </div>
    <h1>{{ state.title }}</h1>
    <div>
      <h4>Movie message</h4>
      <p>唯一标识: {{ state.movieId }}</p>
      <p>观影类别: {{ state.kind }}</p>
      <p>
        观影数量:
        <span class="views-count">{{ state.count }}</span>
      </p>
    </div>
    <div>
      <h5>操作区</h5>
      <div>
        <span>点击次数: {{ state.actionCount }}</span>
        &nbsp;&nbsp;
        <button @click="() => addViewsCount()">增加浏览量</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "Detail",
  setup() {
    const route = useRoute();
    const router = useRouter();

    /**
     * @name: computed
     * @desc: 核心流程
     * @author: lianpf
     * @date: 2021.03.06
     * */
    const movieId = computed(() => route.params.id);
    const state = reactive({
      title: "This is an detail page",
      kind: "life",
      count: 100,
      actionCount: 0,
      movieId
    });

    /**
     * @name: watch
     * @desc: 核心流程
     * @author: lianpf
     * @date: 2021.03.06
     * */
    watch(
      () => state.actionCount,
      () => {
        console.log("--watch--");
        state.count = state.count + 1;
      }
    );

    /**
     * @name: method
     * @desc: 核心流程
     * @author: lianpf
     * @date: 2021.03.06
     * */
    const addViewsCount = () => {
      state.actionCount = state.actionCount + 1;
    };

    /**
     * @name: 生命周期钩子
     * @desc: 核心流程
     * @author: lianpf
     * @date: 2021.03.06
     * */
    onMounted(() => {
      console.log("111");
    });

    /**
     * @name: router - 返回上层
     * @desc: 核心流程
     * @author: lianpf
     * @date: 2021.03.06
     * */
    const goBack = () => {
      router.replace("/list");
    };

    return {
      state,
      addViewsCount,
      goBack
    };
  }
});
</script>

<style lang="stylus">
.views-count
  color: #FF5151;
</style>
