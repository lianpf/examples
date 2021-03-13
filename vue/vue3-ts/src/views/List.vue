<template>
  <div class="page-list">
    <h2>{{ state.title }}</h2>
    <p>state-count: {{ state.count }}</p>
    <p>computed-params-count: {{ params.count }}</p>
    <TestInject />
    <section class="page-list-content">
      <h3>Component: list-item</h3>
      <ListItem
        v-for="(item, index) in state.list"
        :key="`list-item-${index}`"
        :data="item"
      ></ListItem>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  provide,
  readonly,
  ref,
  onMounted
} from "vue";
import ListItem from "./components/ListItem.vue";
import TestInject from "./components/TestInject.vue";
interface ListByStatusData {
  page: number;
  pageSize: number;
}
interface MovieItem {
  id: string;
  name: string;
  desc: string;
}

export default defineComponent({
  name: "List",
  components: {
    ListItem,
    TestInject
  },
  setup() {
    let list: Array<MovieItem> = [];
    /**
     * @name: reactive
     * @desc: 核心流程
     * @author: lianpf
     * @date: 2021.03.06
     * */
    let state = reactive({
      title: "List Page",
      count: 0,
      total: 0,
      list,
      provideStatus: false
    });

    const params = computed(() => ({
      count: state.count + 1
    }));
    /**
     * @name: 异步请求函数 & 泛型函数
     * @desc: 核心流程
     * @author: lianpf
     * @date: 2021.03.06
     * */
    type FnType = (x: number, y: number) => Promise<Array<MovieItem>>;
    const getInitList: FnType = (page, pageSize) => {
      console.log(`--req-params-page:${page}-pageSize:${pageSize}--`);
      return new Promise((resolve, reject) => {
        try {
          let res: Array<MovieItem> = [
            {
              id: "100",
              name: "list-item-001",
              desc: "001-001-001-001"
            },
            {
              id: "200",
              name: "list-item-002",
              desc: "002-002-002-002"
            },
            {
              id: "300",
              name: "list-item-003",
              desc: "003-003-003-003"
            }
          ];
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    };
    // const tempList = () => getInitList()
    let reqParams: ListByStatusData = {
      page: 1,
      pageSize: 10
    };

    // 异步流控制函数
    const asyncFlow = async () => {
      let resData = await getInitList(reqParams.page, reqParams.pageSize);
      state.count = 2;
      state.list = resData;
      list = resData;
    };

    onMounted(async () => {
      await asyncFlow();
    });
    /**
     * @name: 依赖注入 —— 父组件通过 provide 函数向子级组件共享数据（不限层级）
     * @desc: 核心功能
     * @author: lianpf
     * @date: 2021.03.06
     * */
    const parentColor = ref("salmon");
    // provide('要共享的数据名称', 被共享的数据)
    provide("themeColor", readonly(parentColor));
    const updateThemeColor = () => {
      state.provideStatus = !state.provideStatus;
      parentColor.value = state.provideStatus ? "skyblue" : "salmon";
    };
    // 父组件 function update “注入”的值
    provide("updateThemeColor", updateThemeColor);
    provide("location", "North Pole");
    provide("geolocation", {
      longitude: 90,
      latitude: 135
    });

    return {
      state,
      params,
      list
    };
  }
});
</script>

<style lang="stylus">
.page-list-content
  margin-top: 16px;
  border: 1px dashed #000;
  padding: 12px;
</style>
