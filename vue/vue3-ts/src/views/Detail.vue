<template>
  <div class="about">
    <h1>{{ state.pageTitle }}</h1>
    <div>
      <h4>Movie message</h4>
      <p>唯一标识: {{ state.movieMsg.id }}</p>
      <p>观影类别: {{ state.movieMsg.kind }}</p>
      <p>观影数量: {{ state.movieMsg.count }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: "Detail",
  steup() {
    const route = useRoute();
    const router = useRouter();

    const movieId = ref(route.query.id)
    const state = reactive({
      pageTitle: 'This is an detail page',
      kind: 'life',
      count: 0,
      movieMsg: {
        id: 1
      }
    })

    // computed
    const params = computed(() => ({
      kind: state.kind,
      count: state.count + 1
    }))
    
    watch(movieId, (newVal, oldVal) => {
      console.log('--watch-movieId--', newVal);
      console.log('--watch-oldVal--', oldVal)
      if (newVal !== oldVal) {
        state.movieMsg = getDetail(params)
      }
    })

    const getDetail = async (params) => {
      return {
        id: movieId,
        ...params
      }
    }
    // methods
    const onBack = () => {
      router.replace('/list/2')
    }

    return {
      state,
      onBack
    }
  }
});
</script>
