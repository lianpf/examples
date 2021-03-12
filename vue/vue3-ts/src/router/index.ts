import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

// 数组泛型形式
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/list",
    name: "MovieDetail",
    component: () => import("../views/List.vue")
  },
  {
    path: "/detail/:id",
    name: "Detail",
    // 懒加载
    component: () => import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
