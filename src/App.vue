<!--
 * @Author: yjl
 * @Date: 2023-04-06 13:15:58
 * @LastEditors: yjl
 * @Descriptionless
-->
<script setup>
// import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Layout/Header.vue";
import { regionData, codeToText } from "element-china-area-data";
console.log(regionData);
console.log(codeToText["11"]);
</script>

<template>
  <div class="page">
    <Header class="header" />
    <div class="center">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="less">
.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 50px;
    flex-shrink: 0;
  }
  .center {
    flex-grow: 1;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>
