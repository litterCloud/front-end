import store from 'store';
import config from '../config/config';
import interfaceConfig from '../config/interface';
import axios from './axios';
let util = {

};
//util 数据对象，用于存取数据
let data = {

};
let utilData = {
  sign:0,
  interfaceSign:0,
  ajaxCacheData:{} //接口的缓存数据
}
//fn 闭包数据存储
util.setData = function (name,obj) {
  if(name){
    data[name] = obj;
    return true;
  }
  return false;
};
//fn 闭包数据获取
util.getData = function (name) {
  return data[name];
}
//fn 闭包数据删除
util.removeData = function (name) {
  if(name){
    delete data[name];
    return true;
  }
  return false;
}
//fn  删除所有的闭包数据
util.removeAllData = function () {
  data = {};
  return true;
}
//fn 数据存储 localstorage
util.storeSet=function(param,data){
    store.set(param,data);
};
//fn 数据获取 localstorage
util.storeGet=function(param){
    return store.get(param)
};
//fn 数据删除 localstorage
util.storeRemove=function(param){
    store.remove(param)
};
//fn 数据全清 localstorage
util.storeClear=function(){
    store.clearAll();
};

//fn 获取值的具体类型
util.getType = function (obj) {
    var typeStr = Object.prototype.toString.call(obj),
        typeArr = [];
    typeStr = typeStr.substring(1, typeStr.length - 1);
    typeArr = typeStr.split(" ");
    return typeArr[1];
};

//fn 获得请求路径
util.getUrl = function (url) {
  let theUrl = "";
  if(interfaceConfig[url]){
    theUrl = config.port+interfaceConfig[url];
  }else{
    theUrl = config.port+url;
  }
  if(theUrl == theUrl.replace("?","")){
    theUrl = theUrl + "?_=" + new Date().getTime()+"-"+utilData.interfaceSign++;
  }else{
    theUrl = theUrl + "&_=" + new Date().getTime()+"-"+utilData.interfaceSign++;
  }
  return theUrl
}
util.getCid = function (string = "tydic") {
  utilData.sign++;
  return string + (new Date().getTime()+""+utilData.sign);
}
/**
 * @param  {[Function]}  延时调用函数
 * @param  {[Number]}  延迟多长时间
 * @return {[Number]}  至少多长时间触发一次
 */

util.throttle =  function(fn, delay, mustRun){
    var timer = null,
        previous = null;

    return function(){
        var now = +new Date(),
            context = this,
            args = arguments;
        if (!previous ) previous = now;
        var remaining = now - previous;
        if(mustRun && remaining >= mustRun){
            fn.apply(context, args);
            previous = now;
        }else{
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(context, args);
            }, delay);

        }
    }
}
//fn 获得地理位置
/**
 * @param {Object} 获取地理位置的参数
 * */
util.getCurrentPosition = function (obj) {

  return new Promise(function (resolve,reject) {
    if(typeof qq.maps !== 'object'){
      reject({
        msg:"腾讯地图API未正常加载",
        cnMsg:"腾讯地图API未正常加载",
        errorCode:9999
      })
      return false;
    }
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        //返回 经纬度
        var lat=position.coords.latitude;
        var lng=position.coords.longitude;
        // type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，
        qq.maps.convertor.translate(new qq.maps.LatLng(lat,lng), 1, function(res){
          //取出经纬度并且赋值
          let geocoder = new qq.maps.Geocoder({
            complete : function(results){
              resolve(results)
            },
            error:function (error) {
              reject({
                msg:"获取详细位置失败",
                cnMsg:"获取详细位置失败",
                errorCode:8888
              })
            }
          });
          geocoder.getAddress(res[0]);
        });

      },(error)=>{
        switch(error.code) {
          case error.PERMISSION_DENIED:
            error.cnMsg = "用户拒绝对获取地理位置的请求。";
            break;
          case error.POSITION_UNAVAILABLE:
            error.cnMsg = "位置信息是不可用的。";
            break;
          case error.TIMEOUT:
            error.cnMsg = "请求用户地理位置超时。";
            break;
          case error.UNKNOWN_ERROR:
            error.cnMsg = "位置错误";
            break;
        }
        error.errorCode = error.code;
        reject(error);
      });
    }else{
      reject({
        code:9999,
        msg:"用户浏览器不支持地理位置",
        cnMsg:"用户浏览器不支持地理位置"
      })
    }


  });
};
util.getIpPosition = function (obj) {
  return new Promise(function (resolve,reject) {
    if(typeof qq.maps == 'object'){
      let citylocation = new qq.maps.CityService({
        complete : function(results){
          results.lat=results.detail.latLng.lat;
          results.lng=results.detail.latLng.lng;
          resolve(results)
        },
        error:function (error) {
          reject({
            msg:"获取ip位置失败",
            cnMsg:"获取ip位置失败",
            errorCode:8888
          })
        }
      });
      citylocation.searchLocalCity();

    }else{
      reject({
        msg:"腾讯地图API未正常加载",
        cnMsg:"腾讯地图API未正常加载",
        errorCode:9999
      })
    }


  })

}
//fn 手机号格式化
/**
 * @param {string or number} 需格式化的手机号，
 * */
util.phoneFormat = function (phoneNum){
  if(!phoneNum || phoneNum.length ==0){
    return ""
  }
  var phoneNew = "";
  let phone = phoneNum+"";
  let symbol = " ";
  phone = phone.trim();
  phoneNew = phone.slice(0,3)+symbol+ phone.slice(3,7)+symbol +phone.slice(7,11);
  return phoneNew;
};
/**
 * @param {string or number} 需加密的手机号，
 * @param {string} 加密符号
 * */
util.phoneEncryption = function (phoneNum,replaceSymbol="*"){
  if(!phoneNum || phoneNum.length ==0){
    return ""
  }
  var phoneNew = "";
  let phone = phoneNum+"";
  let replace = replaceSymbol.repeat(4);
  phoneNew = phone.slice(0,3)+ phone.slice(3,7).replace(/^[0-9]{4}$/,replace)+phone.slice(7,11);
  return phoneNew;
};
/**
 * @param {string or number} 需加密并格式化的手机号，
 * @param {string} 加密符号
 * */
util.phoneFormatEncryption = function (phoneNum,replaceSymbol="*"){
  if(!phoneNum || phoneNum.length ==0){
    return ""
  }
  var phoneNew = "";
  let phone = phoneNum+"";
  let symbol = " ";
  let replace = replaceSymbol.repeat(4);
  phoneNew = phone.slice(0,3)+symbol+ phone.slice(3,7).replace(/^[0-9]{4}$/,replace)+symbol +phone.slice(7,11);
  return phoneNew;
};
/**
 * @param {string or number} 替换空格，
 * */
util.replaceSpace = function (str){
  if(!str || str.length ==0){
    return ""
  }
  var strNew = "";
  strNew = str.replace('&nbsp;','　　');
  return strNew;
};
//fn 获得util缓存的数据，若无缓存数据，则根据给定的路径获取ajax数据  返回promise 建议用于获得可复用的请求后数据不怎么变动的数据块
/**
 * @param {string} util缓存的数据名称，
 * @param {string} 缓存不存在时，请求的url名
 * @param {object} 请求参数
 * @param {boolean} 是否强制请求后台数据并将数据写入缓存
 * */
util.getCacheOrAjaxData = function (cacheName,url,params,flag) {

  return new Promise(function (resolve,reject) {
    if(utilData["ajaxCacheData"][cacheName] && (!flag)){
      resolve(utilData["ajaxCacheData"][cacheName])
    }else{
      axios.post(url,params || {}).then(function (returnData) {
        if(flag){
          utilData["ajaxCacheData"][cacheName] = returnData;
        }else{
          if(!utilData["ajaxCacheData"][cacheName]){
            utilData["ajaxCacheData"][cacheName] = returnData;
          }
        }
        resolve(utilData["ajaxCacheData"][cacheName]);
      }).catch(function (error) {
        reject(error)
      })
    }
  })
};
//fn 为数组中的对象设置key值
/**
 * @param {Array} 需要添加key值的数组，
 * @param {string} 添加的key值名称，默认为indexId
 * */
util.setKey = function (arr, sign = "indexId") {
  if (util.getType(arr) == "Array") {
    arr.forEach(function (value) {
      if (typeof value == "object") {
        value[sign] = util.getCid();
      }
    })
  }
  return arr;
};
//fn 字符串替换
util.replaceStr = function (str="",type,replaceStr,replaceWithStr) {
  str = str || "";
  str = str.replace(/</g,"&").replace(/>/g,"&");
  switch (type){
    //根据传入的值直接替换
    case 1:
      return str.replace(new RegExp(replaceStr,'g'),replaceWithStr);
    //给某一段文字添加颜色
    case 2:
      let newStr = str;
      newStr = str.replace(/[/][#][a-fA-F0-9]{6}/g,"</span>").replace(/([#][a-fA-F0-9]{6})/g,"<span style='color: " + '$1' + "'>");
      return newStr;
    default:
      return str;
  }
};
//fn 获得url后面的参数
util.getAllQueryString = function () {
  if (!location.search) {
    return {};
  }
  var searchStr = location.search.substring(1),
    search = searchStr.split("&"),
    param = {};
  search.forEach(function (value) {
    var Arr = value.split("=");
    param[Arr[0]] = Arr[1];
  });
  return param;
};
//fn 数据适配方法
/**
 * @param {object || Array} 需要适配的对象or数组，
 * @param {Array} 需要替换的属性名
 * @param {Array} 替换后的属性名
 * */
util.dataAdapter = function (data,arr1,arr2) {
  var dll = {};
  arr1.forEach(function (value,index) {
    dll[value] = arr2[index];
  })

  let str = JSON.stringify(data).replace(/("\w*":)/g, word => {
    return word.replace(/(\w*)/g,words =>{
      if(dll[words]){
        return dll[words];
      }else{
        return words
      }
    })
  });

  return JSON.parse(str);
};
//日期格式化
Date.prototype.FormatDate = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
export default util;
