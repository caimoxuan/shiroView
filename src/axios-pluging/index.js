import axios from "axios"
import qs from "qs"
import { Message } from "element-ui"
import router from "../router"


//初始化axios
const Axios = axios.create({
  baseURL: 'http://localhost:8082',
  timeout: 10000,
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

//传参序列化(添加拦截器) perHandler
Axios.interceptors.request.use(
  config => {
    if(config.method === "post" || config.method === "get" || config.method === "delete"){
      config.data = qs.stringify(config.data);
    }
    // token Auth
    if(localStorage.token){
      config.headers.Authorization = localStorage.token;
    }
    return config;
  },
  error => {
    Message({
      //elm 弹窗消息组建
      showClose: true,
      message: error,
      type: "error.data.error.message"
    });
    return Promise.reject(error.data.error.message);
  }
);

Axios.interceptors.response.use(
  res => {
    if(res.status != 200){
      console.log(res);
      Message({
        showClose: true,
        message: error,
        type: res.data.error.message.message?res.data.message.message : res.data.message
      });
      return Promise.reject(res.data.message);
    }
    return res;
  },
  error => {
    //用户信息的判断
    /*
    if(!window.localStorage.getItem("userinfo")){
      router.push({
        path: "/login"
      });
    }else{
      let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
      let lifeTime = userinfo.authFailTime;
      let timeNow = new Date().getTime();
      if(timeNow > lifeTime){
        Message({
          showClose: true,
          message: "登陆超时，请重新登陆",
          type : "error"
        });
        router.push({
          path: "/login"
        });
      }else{
        let errorInfo = error.data.message ? error.data.message : error.data;
        return Promise.reject(errorInfo);
      }
    }
    */
    if(error.response) {
      console.log(error.response.status);
      switch(error.response.status){
        case 401: //后台保证登陆失效 或未认证状态下返回401
          Message({
            showClose: true,
            message: "登陆失效，请重新登陆",
            type : "error"
          });
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          });
      }
    }
  }
);

//将axios-Pluging 导出 方便use
export default{
  install: function(Vue, option){
    Object.defineProperty(Vue.prototype, "$http", {value: Axios});
  }
}



