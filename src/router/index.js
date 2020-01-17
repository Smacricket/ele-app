import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "index",
    component: () => import("@/views/Index.vue"), // 按需加载路由
    children: [
      {
        path: "",
        redirect: "/home"
      },
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home.vue")
      },
      {
        path: "/me",
        name: "me",
        component: () => import("@/views/Me.vue")
      },
      {
        path: "/order",
        name: "order",
        component: () => import("@/views/Order.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/address",
    name: "address",
    component: () => import("@/views/Address.vue")
  },
  {
    path: "/city",
    name: "city",
    component: () => import("@/views/City.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search.vue")
  },
  {
    path: "/shop",
    name: "shop",
    redirect: "/goods",
    component: () => import("@/views/Shops/Shop.vue"),
    children: [
      {
        path: "/goods",
        name: "goods",
        component: () => import("@/views/Shops/Goods.vue")
      },
      {
        path: "/comments",
        name: "comments",
        component: () => import("@/views/Shops/Comments.vue")
      },
      {
        path: "/seller",
        name: "seller",
        component: () => import("@/views/Shops/Seller.vue")
      }
    ]
  },
  {
    path: "/myAddress",
    name: "myAddress",
    component: () => import("@/views/Orders/MyAddress.vue")
  },
  {
    path: "/addAddress",
    name: "addAddress",
    component: () => import("@/views/Orders/AddAddress.vue")
  },
  {
    path: "/settlement",
    name: "settlement",
    component: () => import("@/views/Orders/Settlement.vue")
  },
  {
    path: "/remark",
    name: "remark",
    component: () => import("@/views/Orders/Remark.vue")
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import("@/views/Orders/Pay.vue")
  },
  {
    path: "/orderInfo",
    name: "orderInfo",
    component: () => import("@/views/Orders/OrderInfo.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("ele_login") ? true : false;

  if (to.path === "/login") {
    next();
  } else {
    //是否在登录状态下
    isLogin ? next() : next("/login");
  }
});

export default router;
