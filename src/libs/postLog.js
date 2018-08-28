import axios from "./axios";
import util from './util'
import store from '@/store'
let postLog = (pageCode = "")=>{
  // 发送日志相关信息
    let path = location.href;
    let sendData = {
      pageCode:pageCode,//美宜佳本网抢红包,
      pageUrl:path,//页面url
      phoneNumber:store.state.userInfo.tel,//用户手机号
      sourceType: util.getData("sourceType") || "", //访问入口 url
      cityName:store.state.position.city||'', //用户定位获取到的地市名称
      touchCode:"",//页面触点的唯一标识
    }
    console.log(sendData);

    axios({
      url:util.getUrl('touchType'),
      data:sendData
    }).then(()=>{
      console.log("touch ajax success");
    }).catch(()=>{
      console.log("touch ajax fail");
    })
}
export default postLog;
