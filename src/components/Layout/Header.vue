<!--
 * @Author: yjl
 * @Date: 2023-10-16 10:30:39
 * @LastEditors: yjl
 * @LastEditTime: 2024-03-15 14:51:06
 * @Description: 描述
-->
<template>
  <Menu mode="horizontal" v-model:selectedKeys="state.current">
    <MenuItem
      v-for="router in routerPath"
      :key="router.name"
      @click="routerChange(router.path)"
      >{{ router.meta.label }}</MenuItem
    >
  </Menu>
</template>
<script lang="ts" setup>
import { Menu, MenuItem } from "ant-design-vue";
import { reactive, onMounted } from "vue";
import { routerPath } from "@/router/index";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
let state = reactive<any>({
  current: [],
});
onMounted(() => {
  // console.log(routerPath);

  state.current = [route.path == "/" ? "proxy" : route.name];
});

function routerChange(path) {
  router.push({ path: path });
}
</script>
<style scoped></style>
