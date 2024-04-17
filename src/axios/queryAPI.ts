import axios from "axios";
let Axios = axios.create({
    baseUrl: 'http://127.0.0.1:5173/',
    timeout: 2000
})
Axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data || response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default Axios