import axios from 'axios';
import qs from 'qs';
import store from '@/store'
import login from '@/libs/login'
axios.defaults.method = 'post';
axios.defaults.timeout = 10000;
 axios.defaults.transformRequest = [function (data, headers) {
  // By default, axios serializes JavaScript objects to JSON. To send data in the application/x-www-form-urlencoded format instead, you can use the following options.
  //  return qs.stringify(data);
   return JSON.stringify(data)
 }];
axios.defaults.validateStatus = function (status) {
  //去除loading框
  switch (status + "") {
    case '404':
      console.log("接口404");
      break;
    case '500':
      console.log("接口500");
      break;
    case '401':
      console.log("接口401");
      break;
    default:
      break;
  }
  return status >= 200 && status < 300; // default
};
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(config.showLoading){
  }
  config.headers["Content-Type"]='application/json; charset=utf-8';
  config.headers["token"]=store.state.userInfo.token || "";
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  if(response.config.showLoading){
  }
  if(response.data.respCode == "0000"){
    return response.data;
  }else{
    console.log("11111")
    //进行提示弹框  并关掉loading层
    switch(response.data.respCode+""){
      case "AAAA":
        login();
        break;
    }
    return Promise.reject({
      respDesc:response.data.respDesc,
      respCode:response.data.respCode
    });
  }


}, function (error) {

  return Promise.reject(error);
});
export default axios;
