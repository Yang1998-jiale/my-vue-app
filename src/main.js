/*
 * @Author: yjl
 * @Date: 2023-04-06 13:15:58
 * @LastEditors: yjl
 * @Description: 描述
 */
import { createApp } from "vue";
import "./style.css";
import "./assets/style/app.less";
import App from "./App.vue";
import "./mock/person";
import axios from "axios";
// import yjlTest from "npm-test-yjl";
import "bpmn-vue-temp/lib/style.css";
import "ant-design-vue/dist/antd.css";
import bpmnVueTemp from "bpmn-vue-temp";
import { router, superApp } from "./router";
let app = createApp(App);
superApp(app);
app.mount("#app");
app.use(bpmnVueTemp)
app.config.globalProperties.$axios = axios;
