import Mock from 'mockjs';
import util from '../libs/util'

/*Mock.mock(util.getUrl("loginlogin"), 'post', function () {
  return {
    respDesc: null,
    respCode: "0000"
  }
});
Mock.mock(util.getUrl("getuserinfo"), 'post', function () {
  return {
    respDesc: null,
    data: {
      name: "咕噜玛西亚",
      userId: "12138",
      tel: "18518172480",
      level: "",
      icon: require("@/assets/mock/miao.jpg")
    },
    respCode: "0000"
  }
});
/!*获取红包金额*!/
/!*Mock.mock(util.getUrl("getRedPacket"), 'post', function () {
  return {
    respDesc: null,
    comAvaiFee: "200",
    assAvaiFee: "100",
    respCode: "0000"
  }
});*!/
Mock.mock(util.getUrl("getRechargeActivity"), 'post', {
    respDesc: null,
    respCode: "0000",
    "rechargeList|2":[
      {
        "title|1":["充100送200","充100送50"],
        "type|1":["通用红包","指定红包"],
        "activityId|+1":1
      }
    ],
    "rechargeDesc|3":[
      {
        "title|1":["该通用红包仅适用于联通指定红包商家","一个红包可以多次使用，一次性可以使用多个红包","用户‘点击立即’领取，视为同意《用户协议》内容"]
      }
    ],
    rechargeTime:{
      activityBeginTime:"4月30日",
      activityEndTime:"5月30日",
      rechargeTitle:"美宜佳红包",
      rechargeDesc:"多充多送  联通指定商家通用"
    }
});
/!*Mock.mock(util.getUrl("sendCode"),'post',{
  respDesc: null,
  respCode: "0000",
});*!/

/!*获取首页红包活动*!/
/!*Mock.mock(util.getUrl("getActivity"), 'post', function () {
  return {
    respDesc: null,
    activityList: [
      {
        activityGuideWords: "抢红包",
        promotionImageUrl: require("@/assets/mock/activity01.png"),
        detailUrl: "1589"
      },
      {
        activityGuideWords: "充值送",
        promotionImageUrl: require("@/assets/mock/activity02.png"),
        detailUrl: "1589"
      },
      {
        activityGuideWords: "积分换礼包",
        promotionImageUrl: require("@/assets/mock/activity01.png"),
        detailUrl: false
      }
    ],
    respCode: "0000"
  }
});*!/
Mock.mock(util.getUrl("shopDetail"), 'post', function () {
  return {
    respCode: "0000",
    respDesc: null,
    "storeDetail": {
      "merchantCode": "1213",
      "storeName": "美宜佳（中山市长江路**店）",
      "busiStartTime": "7:00",
      "busiEndTime": "19:00",
      "storeLogo": require("@/assets/mock/tu_02.png"),
      "latitude": 22.528310,
      "longitude": 113.422840,
      "address": "中山市长江路联通大厦一楼",
      "contactPhone": "18511753482",
      "starLevel": 5,
      "marks": ["最受欢迎商户", "消费送红包"],
      "activities": [
        {
          "benefitType": "00",
          "activityName": "满100减5"
        },
        {
          "benefitType": "01",
          "activityName": "满100减5"
        },
        {
          "benefitType": "00",
          "activityName": "满100减5"
        },
        {
          "benefitType": "01",
          "activityName": "满100减5"
        }
      ],
      "images": [
        require('@/assets/mock/swiper01.jpg'),
        require('@/assets/mock/swiper01.jpg'),
        require('@/assets/mock/swiper01.jpg')
      ]
    },
    "benefitGoods": [
      {
        "goodsName": "银鹭八宝粥",
        "goodsDesc": "产自阿克苏的红苹果，又香又脆",
        "goodsIconUrl": "http://assets.baobeituan.com/tydic/image/teaA1.jpg",
        "originPrice": 10.00,
        "currentPrice": 9.00,
        "discount": 9
      }
    ],
    "cooperateActivities": [
      {
        "activityId": 123,
        "activityName": "消费满10元送2元",
        "activityType": "02",
        "activityGuideWords": "去办理",
        "promotionImageUrl": require("@/assets/mock/redPacked01.jpg"),
        "activitySummery": "美宜佳专属优惠",
        "detailUrl": "https://baidu.com/",
        "needLogin": false
      },
      {
        "activityId": 123,
        "activityName": "消费满10元送2元",
        "activityType": "02",
        "activityGuideWords": "去办理",
        "promotionImageUrl": require("@/assets/mock/redPacked01.jpg"),
        "activitySummery": "美宜佳专属优惠",
        "detailUrl": "https://baidu.com/",
        "needLogin": false
      },
      {
        "activityId": 123,
        "activityName": "消费满10元送2元",
        "activityType": "02",
        "activityGuideWords": "去办理",
        "promotionImageUrl": require("@/assets/mock/redPacked01.jpg"),
        "activitySummery": "美宜佳专属优惠",
        "detailUrl": "https://baidu.com/",
        "needLogin": false
      }
    ]
  }
});
/!*商店详情页-红包数据查询*!/
Mock.mock(util.getUrl("shopDetailRedPack"), 'post', function () {
  return {
    "UNI_BSS_HEAD":{
      "RESP_DESC":"成功",
      "TRANS_ID":"20180413202825175686525",
      "TIMESTAMP":"2018-04-13 20:28:25 175",
      "RESP_CODE":"00000",
      "APP_ID":"GgoKaaGpnk"
    },
    "UNI_BSS_ATTACHED":{
      "MEDIA_INFO":""
    },
    "UNI_BSS_BODY":
      {
        "QRY_USER_COUPONS_BY_COM_CODE_RSP":{
          "RESP_CODE":"000000",
          "RESP_DESC":"查询成功",
          "COM_AVAI_FEE":20,
          "ASS_AVAI_FEE":30
        }
      },
  }
});
Mock.mock(util.getUrl("getShopList"), 'post', {
  respCode: "0000",
  respDesc: null,
  'rows|5': [
    {
      'merchantMark|1': ["热销", "甩卖", '赔钱', '坑爹'],
      'merchantId|+100': 10000,
      'storeId|+11':10101,
      'storeLogo|1': [require("@/assets/mock/tu_02.png"), require("@/assets/mock/tu_03.png")],
      'storeName|1': ["生喵片（中山市长江路**店）", "武器店（中山市长江路天河区）", "游戏厅（中山市长江路地河区）"],
      'busiStartTime|1': ["9:00", "0:00"],
      'busiEndTime|1': ["23:00", "9:00"],
      'starLevel|1-5': 3,
      'distance|1': ["1.5km", "100光年", "0.1km"],
      'minutes|1': ["120年", "12年"],
      'latitude|10-26.100000-528310':22.528310,
      'longitude|10-123.100000-422840':113.422840,
      'storeMarks|1-1': ["优惠", "天知道"],
      'activities|1-6': [
        {
          activityName: "@cname()特价<span style='color:@color()'>仅1元</span>（原价800元) @ctitle(5, 6)",
          "benefitType|1": ["00", "01"]
        },

      ]
    }
  ],
  recordsTotal: 15
});
Mock.mock(util.getUrl("getFirstShopList"), 'post', {
  respCode: "0000",
  respDesc: null,
  'rows|5': [
    {
      'merchantMark|1': ["热销", "甩卖", '赔钱', '坑爹'],
      'merchantId|+100': 10000,
      'storeId|+11':10101,
      'storeLogo|1': [require("@/assets/mock/tu_02.png"), require("@/assets/mock/tu_03.png")],
      'storeName|1': ["生喵片（中山市长江路**店）", "武器店（中山市长江路天河区）", "游戏厅（中山市长江路地河区）"],
      'busiStartTime|1': ["9:00", "0:00"],
      'busiEndTime|1': ["23:00", "9:00"],
      'starLevel|1-5': 3,
      'distance|1': ["1.5km", "100光年", "0.1km"],
      'minutes|1': ["120年", "12年"],
      'latitude|10-26.100000-528310':22.528310,
      'longitude|10-123.100000-422840':113.422840,
      'storeMarks|1-1': ["优惠", "天知道"],
      'activities|1-6': [
        {
          activityName: "@cname()特价<span style='color:@color()'>仅1元</span>（原价800元) @ctitle(5, 6)",
          "benefitType|1": ["00", "01"]
        },

      ]
    }
  ],
  recordsTotal: 15
});

/!*红包详情*!/
/!*Mock.mock(util.getUrl("getUsedRedpacketDetail"), 'post', {
  "UNI_BSS_HEAD":{
  "RESP_DESC":"成功",
    "TRANS_ID":"20180413202825175686525",
    "TIMESTAMP":"2018-04-13 20:28:25 175",
    "RESP_CODE":"00000",
    "APP_ID":"GgoKaaGpnk"
},
  "UNI_BSS_ATTACHED":{
  "MEDIA_INFO":""
},
  "UNI_BSS_BODY":
  {
    "QRY_USER_COUPONS_BY_COM_CODE_RSP":{
    "RESP_CODE":"000000",
    "RP_ENTITY|5":[
    {
      "EXP_TIME|1": ["2014.02.21 23:59:59", "2015.06.21 23:59:59", "2016.06.21 23:59:59"],
      "GRANT_CONTENT": "0",
      "RP_CONTENT": "0",
      "RP_DESC|1": ["一次可使用多张相同类型红包劵，也可拆分使用，特殊商城除外","该红包仅限美宜家商户使用，可直接抵扣现金"],
      "RP_TYPE|1": ["定向券","通兑券"],
      "EFF_TIME|1": ["2011.02.21 00:00:00", "2012.06.21 00:00:00", "2013.06.21 00:00:00"],
      "RP_CODE": "201804131129438631",
      "RP_NAME": "@cparagraph(1)",
      "STATE": "1"
    }
  ],
    "RESP_DESC":"查询成功",
    "TOTAL_ITEM": 5
    }
  },

});
Mock.mock(util.getUrl("getNoUseRedpacketDetail"), 'post', {
  "UNI_BSS_HEAD":{
    "RESP_DESC":"成功",
    "TRANS_ID":"20180413202825175686525",
    "TIMESTAMP":"2018-04-13 20:28:25 175",
    "RESP_CODE":"00000",
    "APP_ID":"GgoKaaGpnk"
  },
  "UNI_BSS_ATTACHED":{
    "MEDIA_INFO":""
  },
  "UNI_BSS_BODY":
    {
      "QRY_USER_COUPONS_BY_COM_CODE_RSP":{
        "RESP_CODE":"000000",
        "RP_ENTITY|8":[
          {
            "EXP_TIME|1": ["2014.02.21 23:59:59", "2015.06.21 23:59:59", "2016.06.21 23:59:59"],
            "GRANT_CONTENT|1-100": "100",
            "RP_CONTENT|100-1000": 1000,
            "RP_DESC|1": ["一次可使用多张相同类型红包劵，也可拆分使用，特殊商城除外","该红包仅限美宜家商户使用，可直接抵扣现金"],
            "RP_TYPE|1": ["定向券","通兑券","测试券"],
            "EFF_TIME|1": ["2011.02.21 00:00:00", "2012.06.21 00:00:00", "2013.06.21 00:00:00"],
            "RP_CODE": "201804131129438631",
            "RP_NAME": "@cparagraph(1)",
            "STATE": "1"
          }
        ],
        "RESP_DESC":"查询成功",
        "TOTAL_ITEM": 8
      }
    }
});*!/
/!*红包明细红包活动*!/
/!*Mock.mock(util.getUrl("getActivityMsg"), 'post', {
  respCode: "0000",
  respDesc: null,
  activityList: [
    {
      promotionImageUrl: require("@/assets/mock/redActivity.png"),
      detailUrl: "recharge"
    }
  ]
});*!/

//充值页面
Mock.mock(util.getUrl("sendCode"), 'post', {
  respCode: "0000",
  respDesc: null
});
Mock.mock(util.getUrl("ajaxCode"), 'post', {
  respCode: "0000",
  respDesc: null
});
Mock.mock(util.getUrl("sendProduct"), 'post', {
  respCode: "0000",
  respDesc: null
});
Mock.mock(util.getUrl("ajaxProductState"), 'post', {
  orderState: "2",
  respCode:"0000",
  respDesc: null
});*/

//充值页面
Mock.mock(util.getUrl("sendCode"), 'post', {
  respCode: "0000",
  respDesc: null
});
Mock.mock(util.getUrl("ajaxCode"), 'post', {
  respCode: "0000",
  respDesc: null
});
Mock.mock(util.getUrl("sendProduct"), 'post', {
  respCode: "0000",
  respDesc: null
});
Mock.mock(util.getUrl("isInNetWork"), 'post', {
  respCode: "0001",
  respDesc: null,
  code: 2
});
Mock.mock(util.getUrl("getRodRedPacket"), 'post', {
  respCode: "0000",
  respDesc: null,
  code: 6,
  confirmList:[
    {
      count:8,
      desc:"无门槛红包券"
    },
    {
      count:60,
      desc:"美宜佳优惠券"
    }
  ]
});
Mock.mock(util.getUrl("getReCharge"), 'post', {
"respCode":"0000","respDesc":"操作成功","marketingActivityId":200048,"merchantId":null,"merchantTitle":null,"storeTitle":null,"storeId":null,"activityName":"包包","activityType":"03","activityTypeTitle":"抢红包活动","promotionImageUrl":null,"promotionImageRealUrl":null,"activitySummery":"","activityGuideWords":"抢","detailUrl":"https://redpacket.ohaotian.cn/zhaokun/activityArea/html/rodRedPacket.html?id=200048&province=51","isValid":"1","crtTime":"2018-07-10 19:40:42","redpacketType":null,"redpacketTypeTitle":null,"activityTypes":null,"redpacketTypes":null,"activityCategory":null,"provinceCode":"51","cityCode":null,"actCode":"201807101843591773","actName":"0710抢红包活动3","actType":"3","actTypes":null,"couponsType":null,"staffNo":"","contactName":"","contactValue":"","operator":"","appTemplateId":null,"ruleContent":"{\"activityName\":\"包包\",\"couponsName\":\"包包\",\"startDate\":\"7月11日\",\"endDate\":\"7月13日\",\"rule\":\"sgg\",\"activitySummery\":\"\",\"merchantsId\":\"\",\"storeId\":\"\",\"activityGuideWords\":\"\",\"ruleContent\":{\"fType\":\"1\",\"feeNum\":[{\"fee\":\"0.5\",\"fNumDay\":\"5\"},{\"fee\":\"0.1\",\"fNumDay\":\"1\"}],\"joinNumDay\":\"\",\"grabTime\":[{\"beginTime\":\"11\",\"endTime\":\"17\"}],\"joinNum\":\"2\",\"outActCode\":\"201807101843591773\",\"effTime\":\"20180711\",\"expTime\":\"20180713\"}}","startDate":"2018-07-11","endDate":"2018-07-13","actTypeStr":"3","status":"00","statusStr":null,"checkStatus":"","checkStatusStr":null,"checkStaffNo":null,"checkRemark":null,"checkTime":null,"operTime":"2018-07-10 19:40:43","operStaffNo":null,"activityTypeStr":null,"checkList":[],"cityListStr":"","merchantListStr":"","storeListStr":"","cityCodeSet":[],"merchantIdSet":[],"storeIdSet":[],"putawayRecordId":null,"position":null,"positionStr":null,"marketingActivityPositionId":null,"marketingActivityPositionIdStoreDetail":null,"publishPosition":null,"statusStoreDetail":null,"statusStoreDetailStr":null,"checkStatusStoreDetail":null,"checkStatusStoreDetailStr":null,"checkListStoreDetail":[{"checkRecordId":200054,"instanceType":"01","instanceId":100006,"checkStaffNo":"gdtest","checkTime":"2018-07-12 18:52:29","checkStatus":"通过","checkRemark":""}],"cityListStoreDetailStr":"广州市","merchantListStoreDetailStr":"淘C店","storeListStoreDetailStr":"淘","cityCodeSetStoreDetail":["510"],"merchantIdSetStoreDetail":[20],"storeIdSetStoreDetail":[2000115755]
});
Mock.mock(util.getUrl("rodRedPacket"), 'post', {
"UNI_BSS_HEAD":{"RESP_DESC":"成功","TRANS_ID":"20180413202825175686525","TIMESTAMP":"2018-04-13 20:28:25 175","RESP_CODE":"00000","APP_ID":"GgoKaaGpnk"},"UNI_BSS_ATTACHED":{"MEDIA_INFO":""},"UNI_BSS_BODY":{"QRY_USER_COUPONS_VIEW_RSP":{
  "RESP_CODE":"000000","RESP_DESC":"抢红包活动暂未开始，请稍后","GRANT_FEE":"900"
}}
});


export default Mock
