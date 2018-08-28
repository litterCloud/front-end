import axios from 'axios';
import qs from 'qs';
import store from '@/store'

let formAxios = axios.create();
formAxios.defaults.method = 'post';
formAxios.defaults.timeout = 10000;
formAxios.defaults.transformRequest = [function (data, headers) {
  // By default, axios serializes JavaScript objects to JSON. To send data in the application/x-www-form-urlencoded format instead, you can use the following options.
   return qs.stringify(data);
}];
formAxios.defaults.validateStatus = function (status) {
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
formAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(config.showLoading){
  }
  config.headers["token"]=store.state.userInfo.token || "";
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
formAxios.interceptors.response.use(function (response) {
  if(response.config.showLoading){
  }
  if(response.data.respCode == "0000"){
    return response.data;
  }else{
    //进行提示弹框  并关掉loading层
    // response.data.respDesc && Toast(response.data.respDesc);
    switch(response.data.respCode+""){
      case "AAAA":
        // location.href=`http://m.client.10010.com/mobileService/openPlatform/openPlatLine.htm?to_url=http://redpacket.ohaotian.cn/applet-web/rest/login?service=10006&url=${btoa(location.href)}`;
        break;
    }
    return Promise.reject({
      respDesc:response.data.respDesc,
      respCode:response.data.respCode
    });
  }


}, function (error) {
  let _error = {
    respDesc:"网络异常，稍后再试",
    respCode:"error"
  }

  return Promise.reject(_error);
});
export default formAxios;
