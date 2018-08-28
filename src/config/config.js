let isTest = location.hostname == "redpacket.ohaotian.cn" || location.hostname == "localhost";
let config = {
  tencentMapKey: "M6GBZ-2GDKJ-XTXFB-K5R4O-EM2MK-RFBHP", //腾讯地图key秘钥
  // port:"https://wolive.gd10010.cn/", //接口域名 生产环境
  // port:"https://redpacket.ohaotian.cn/", //接口域名 测试环境
  port:isTest ? "https://redpacket.ohaotian.cn/" : "/", //接口域名 测试环境
  parameterJumpTest:isTest ? "http://www.tjunicom.com/tjuwxtest/wopacket/redpacket.html":"http://www.tjunicom.com/tjuwx/wopacket/redpacket.html",   //天津 生产环境
  bssAxios:{
    "UNI_BSS_HEAD" : {
      "APP_ID":"GgoKaaGpnk",
      "TRANS_ID":isTest ? "20180413202825175686525":"20180512004436336853609" ,
      "TIMESTAMP": isTest ? "2018-04-13 20:28:25 175" :"2018-05-12 00:44:36 336" ,
      "TOKEN":isTest ? "cadb3fa2fc5f01ec57945a503b86fabe":"3aa8abed163a1b5a7b97b0577392d3ba"

    },
    "UNI_BSS_ATTACHED" : {
      "MEDIA_INFO" : ""
    },
    "UNI_BSS_BODY" : {

    }
  },  //红包接口 bssAxios的配置项

  //页面路由表(链接)
  routerList:{
    home:"app.html", //首页
    recharge:"recharge.html", //充值送
    rodRedPacket:"rodRedPacket.html" //抢红包
  },

  benefitType:{
    "00":{
     title:"减",
     color:"#3767e1"
    },
    "01":{
      title:"送",
      color:"#fc9106"
    },
    "02":{
      title:"特",
      color:"linear-gradient(-90deg,#FF9845,#FF371E)"
    },
    "03":{
      title:"满",
      color:"#fc05bb"
    }
  },
  benefitGoodsComponentId:8888,
  cooperateActivitiesComponentId:7777,
  storeDetailComponentId:6666,
  touchSpotType:"01", //触点类型
  homeActivityComponentId:5555,// 首页活动位
  redPacketActivityComponentId:9999 ,//红包列表广告位

  weiXinShare:{
    appId:"wx62ca5f6832015a80"
  }
};

export default config;
