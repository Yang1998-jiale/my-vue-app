<!--
 * @Author: yjl
 * @Date: 2024-03-15 14:41:04
 * @LastEditors: yjl
 * @LastEditTime: 2024-03-19 16:10:31
 * @Description: 描述
-->
<template>
  <div>{{ state.message }}</div>
  <InputNumber v-model:value="num.a" />
  <Button
    @click="
      debounce(function () {
        console.log('点击了');
      }, 1000)()
    "
    >点击一下</Button
  >
</template>
<script lang="ts" setup>
import { reactive, onMounted, computed } from "vue";
import { InputNumber, Button } from "ant-design-vue";
import {
  myRef,
  myReactive,
  myEffect,
  myComputed,
} from "../utils/reactive/index";
let state = reactive<any>({
  message: "proxy.vue",
});
let a = myRef({ b: 11 });
console.log(a.value);

onMounted(() => {});

let obj: any = {
  _uid: 0,
};

let sum = 0;
let num = myReactive({
  a: 10,
  b: 20,
});

myEffect(() => {
  sum = num.a + num.b;
  console.log(sum, "sum");
});
num.a = 100;
num.b = -10;
a.value.b = 100;
myEffect(() => {
  console.log(a.value, "我是ref");
});

let sumComputed = myComputed(() => {
  return num.a + num.b;
});
let sumComputed2 = computed(() => {
  return num.a + num.b;
});
console.log(sumComputed2);

myEffect(() => {
  console.log(sumComputed.value, "我是Computed");
});

num.a = 90;
num.b = 90;
num.a = 90;
setTimeout(() => {
  num.b = 190;
}, 2000);

function fun(n: number): Boolean {
  console.log(1024 & (1024 - 1));

  return 16 > 0 && (16 & (16 - 1)) === 0;
}
console.log(fun(16));

function getMaxLength(nums: any[]) {
  //存储target的长度
  let len = nums.length;
  // 如果长度小于2直接返回没必要走了
  if (len < 2) {
    return len;
  }
  //拿到targe的第一个元素作为max的初始值
  let max = [nums[0]];
  for (let i = 0; i < nums.length; i++) {
    // 如果当前元素大于max的最后一个元素，直接push
    if (nums[i] > max[max.length - 1]) {
      max.push(nums[i]);
    } else {
      //反之,使用二分查找
      let left = 0; //开头下标
      let right = max.length - 1; //结束下标
      while (left < right) {
        let mid = (left + right) >> 1; //中位数
        //如果中间值小于当前值，说明当前值应该在mid的右边
        if (max[mid] < nums[i]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      max[left] = nums[i];
    }
  }
  return max;
}
console.log(getMaxLength([5, 8, 1, 22, 11, 66, 8, 33, 111]));

/**
 *  diff算法的流程
 *  1.生成虚拟dom后,根据虚拟dom的patchFlag来确定要进行diff的内容
 *  2.根据shapeFlag来判断是组件还是元素
 *  3.判断是组件还是元素后,根据组件的类型来判断是diff组件还是diff元素
 *  4.进行diff算法前使用贪心+二分算法找出最长递增子序列
 *  5.进行diff算法
 */

function debounce(fun, delay) {
  let timeID: any = null;
  return function (...arg) {
    if (timeID) clearTimeout(timeID);
    timeID = setTimeout(() => {
      fun.apply(this, arg);
      timeID = null;
    }, delay);
  };
}
</script>
<style scoped lang="less"></style>
