<!--
 * @Author: yjl
 * @Date: 2023-10-16 10:30:39
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-17 16:23:34
 * @Description: 描述
-->
<template>
  <div>
    <div class="box">
      <BpmnCanvas bpmnID="test" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BpmnCanvas } from "bpmn-vue-temp";
</script>
<style scoped>
.box {
  width: 1000px;
  height: 1000px;
}
</style>
