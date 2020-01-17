import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const type = {
  SET_LOCATION: "SET_LOCATION",
  SET_ADDRESS: "SET_ADDRESS",
  ORDER_INFO: "ORDER_INFO",
  USER_INFO: "USER_INFO",
  REMARK_INFO: "REMARK_INFO"
};

const state = {
  location: {},
  address: "",
  orderInfo: null,
  userInfo: null,
  remarkInfo: {
    tableware: "",
    remark: ""
  }
};

const getters = {
  location: state => {
    return state.location;
  },
  address: state => {
    return state.address;
  },
  orderInfo: state => {
    return state.orderInfo;
  },
  userInfo: state => {
    return state.userInfo;
  },
  totalPrice: state => {
    let price = 0;

    if (state.orderInfo) {
      const selectFoods = state.orderInfo.selectFoods;

      selectFoods.forEach(food => {
        price += food.activity.fixed_price * food.count;
      });
      price += state.orderInfo.shopInfo.float_delivery_fee;
    }

    return price;
  },
  remarkInfo: state => {
    return state.remarkInfo;
  }
};

const mutations = {
  [type.SET_LOCATION](state, location) {
    if (location) {
      state.location = location;
    } else {
      state.location = null;
    }
  },
  [type.SET_ADDRESS](state, address) {
    if (address) {
      state.address = address;
    } else {
      state.address = "";
    }
  },
  [type.ORDER_INFO](state, orderInfo) {
    if (orderInfo) {
      state.orderInfo = orderInfo;
    } else {
      state.orderInfo = null;
    }
  },
  [type.USER_INFO](state, userInfo) {
    if (userInfo) {
      state.userInfo = userInfo;
    } else {
      state.userInfo = null;
    }
  },
  [type.REMARK_INFO](state, remarkInfo) {
    if (remarkInfo) {
      state.remarkInfo = remarkInfo;
    } else {
      state.remarkInfo = null;
    }
  }
};

const actions = {
  setLocation({ commit }, location) {
    commit(type.SET_LOCATION, location);
  },
  setAddress({ commit }, address) {
    commit(type.SET_ADDRESS, address);
  },
  setOrderInfo({ commit }, orderInfo) {
    commit(type.ORDER_INFO, orderInfo);
  },
  setUserInfo({ commit }, userInfo) {
    commit(type.USER_INFO, userInfo);
  },
  setRemarkInfo({ commit }, remarkInfo) {
    commit(type.REMARK_INFO, remarkInfo);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
