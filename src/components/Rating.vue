<template>
  <div class="Rating-gray">
    <i v-for="(item, index) in itemClasses" :key="index" :class="item" class="fa"></i>
  </div>
</template>

<script>
// 星星长度
const LENGTH = 5;
// 星星对应的class
const CLS_ON = "fa-star";
const CLS_HALF = "fa-star-half-empty";
const CLS_OFF = "fa-star-o";

export default {
  name: "Rating",
  props: {
    rating: Number
  },
  computed: {
    itemClasses() {
      // 存放星星类型
      let result = [];
      // 对分数进行处理
      let score = Math.floor(this.rating * 2) / 2;
      // 控制半星
      let hasDecimal = score % 1 !== 0;
      // 控制全星
      let integer = Math.floor(score);

      // 全星存入数组
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }

      // 半星存入数组
      if (hasDecimal) {
        result.push(CLS_HALF);
      }

      // 补全
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }

      return result;
    }
  }
};
</script>

<style scoped>
.Rating-gray {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>