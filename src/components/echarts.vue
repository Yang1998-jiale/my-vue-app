<template>
  <div>
    <div id="echarts"></div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
let state = reactive<any>({
  myEcharts: null,
});
onMounted(() => {
  initEcharts("echarts");
});
function initEcharts(id: string) {
  let dom: any = document.getElementById(id);
  state.myEcharts = echarts.init(dom);
  let options = {};
  state.myEcharts.setOption(options);
}
</script>
<style scoped>
#echarts {
  width: 300px;
  height: 300px;
}
</style>
