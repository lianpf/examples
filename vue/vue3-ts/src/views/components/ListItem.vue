<template>
  <div class="list-item">
    <div>
      <span>content:</span>
      <span>{{ data.id }}</span>
    </div>
    <div>
      <span>name: {{ data.name }}</span>
      &nbsp;&nbsp;
      <span>desc: {{ data.desc }}</span>
      &nbsp;&nbsp;
      <button @click="() => goDetail(data.id)">详情1</button>
      &nbsp;&nbsp;
      <RouterLink class="user" :to="`/detail/${data.id}`">
        <i class="iconfont icon-user" /> 详情2
      </RouterLink>
    </div>
    <!-- <button @click="updateThemeColor">change color</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "ListItem",
  props: {
    data: Object
  },
  setup(props: any) {
    const router = useRouter();
    const goDetail = (id: number) => {
      router.push(`/detail/${id}`);
    };

    return {
      ...props,
      goDetail
    };
  }
});
</script>

<style lang="stylus">
.list-item
  border: 1px dashed #DCDFE6;
  padding: 4px 8px;
  margin: 0 0 8px;
</style>
