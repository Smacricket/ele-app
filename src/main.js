import Vue from "vue";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// import qs from "qs";

import { Indicator } from "mint-ui";

Vue.config.productionTip = false;

// axios.defaults.baseURL = "http://114.116.245.197:5000/";
axios.defaults.timeout = 10000;
Vue.prototype.$axios = axios;

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 后端允许跨域，前端请求时显示跨域问题解决
    // if (config.method == "post") {
    //   config.data = qs.stringify(config.data);
    // }

    // 加载动画
    Indicator.open();
    // console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    Indicator.close();
    // console.log(response);
    return response;
  },
  error => {
    Indicator.close();
    return Promise.reject(error);
  }
);

Vue.use(MintUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
