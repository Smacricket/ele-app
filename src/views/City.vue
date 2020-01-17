<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input v-model="city_val" type="text" placeholder="输入城市名" />
      </div>
      <button @click="$router.push({name:'address',params:{city:city}})">取消</button>
    </div>
    <div style="height: 100%" v-if="searchList.length === 0">
      <div class="location_wrap">
        <Location @click="selectCity({name: city})" :address="city" />
      </div>
      <Alphabet @selectCity="selectCity" ref="allcity" :cityInfo="cityInfo" :keys="keys" />
    </div>
    <div class="search_list" v-else>
      <ul>
        <li @click="selectCity(item)" v-for="(item, index) in searchList" :key="index">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Location from "@/components/Location";
import Alphabet from "@/components/Alphabet";

export default {
  name: "City",
  data() {
    return {
      city_val: "",
      cityInfo: null,
      keys: [],
      allCities: [],
      searchList: []
    };
  },
  computed: {
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    }
  },
  watch: {
    city_val() {
      this.searchCity();
    }
    // cityInfo(newVal) {
    //   // 实际是不需要的，为了方便哪天服务器没有或者请求不到保存一下
    //   localStorage.setItem("cityInfo", JSON.stringify(newVal));
    // }
  },
  created() {
    this.getCityInfo();
  },
  methods: {
    getCityInfo() {
      this.$axios("/api/posts/cities")
        .then(res => {
          this.cityInfo = res.data;
          this.keys = Object.keys(res.data);
          // 移除hotcities
          this.keys.pop();
          this.keys.sort();
          // 服务器有问题这里也没法滚
          this.$nextTick(() => {
            // 调用子组件的方法
            this.$refs.allcity.initScroll();
          });

          // 存储所有城市,用于搜索过滤
          this.keys.forEach(key => {
            this.cityInfo[key].forEach(city => {
              this.allCities.push(city);
            });
          });
        })
        .catch(err => {
          console.log(err);
          // 以下代码 实际开发不需要
          // debugger;
          // this.cityInfo = JSON.parse(localStorage.getItem("cityInfo")) || null;
          // this.keys = Object.keys(this.cityInfo);
          // this.keys.pop();
          // this.keys.sort();
          // this.$nextTick(() => {
          //   this.$refs.allcity.initScroll();
          // });

          // this.keys.forEach(key => {
          //   this.cityInfo[key].forEach(city => {
          //     this.allCities.push(city);
          //   });
          // });
          // 以上代码 实际开发不需要
        });
    },
    selectCity(city) {
      this.$router.push({ name: "address", params: { city: city.name } });
    },
    searchCity() {
      if (!this.city_val) {
        this.searchList = [];
      } else {
        // 根据输入框的关键字检索城市 并存入searchList
        this.searchList = this.allCities.filter(item => {
          return item.name.indexOf(this.city_val) != -1;
        });
      }
    }
  },
  components: {
    Location,
    Alphabet
  }
};
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  border: none;
  background: none;
  color: #009eef;
}

.location_wrap {
  background: #fff;
  padding: 8px 16px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
