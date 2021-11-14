import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

// import axios from "axios";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/symbol/:symbol",
    component: () => import("../views/Symbol.vue"),
  },
  {
    path: "/logs",
    component: () => import("../views/Log.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.user.type !== "Admin") {
        next({ name: "Home" });
        const notAuth = {
          type: 2,
          date: new Date(),
          message: "Unauthorized access to the log page",
        };
        console.log(notAuth);
        // axios.post(
        //   "https://reengen-f993d-default-rtdb.europe-west1.firebasedatabase.app/logs.json",
        //   notAuth
        // );
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const routerHistory = {
    from: from.fullPath,
    to: to.fullPath,
    date: new Date(),
    type: 1,
  };
  console.log(routerHistory);
  // axios.post(
  //   "https://reengen-f993d-default-rtdb.europe-west1.firebasedatabase.app/logs.json",
  //   routerHistory
  // );
  next();
});
export default router;
