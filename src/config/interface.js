export default {
  //公共接口
  "getRedPacket":"api/redPacket/redPacketCenter/qryUserCouponsView/v1",//获得红包信息
  "sendPosition":"h/rest/refreshUserInfo",//发送定位信息接口
  "getActivity":"h/rest/invoke?service=20027",//获取红包活动,
  "touchType":"h/rest/invoke?service=40007",//发送触点数据

  //红包充值页面
  "sendCode":"lyhzqWeb/rest/invoke?service=20007",//发送验证码
  "ajaxCode":"lyhzqWeb/rest/invoke?service=20006",//校验验证码
  "sendProduct":"lyhzqWeb/rest/invoke?service=20002",//发送产品
  "ajaxProductState":"lyhzqWeb/rest/invoke?service=20004",/*获取产品订单状态*/

  //首页接口
  "getShopList":"h/rest/invoke?service=20028", //获取首页的门店列表
  "getFirstShopList":"h/rest/invoke?service=20029", //获取首页的门店列表

  //详情页接口
  "shopDetail":"h/rest/invoke?service=10001",//商品详情页
  "shopDetailRedPack":"api/redPacket/redPacketCenter/qryUserCouponsView/v1",

  //红包明细接口
  "getUsedRedpacketDetail":"api/redPacket/redPacketCenter/qryUserCouponsByComCode/v1",//加载红包明细已使用红包劵
  "getNoUseRedpacketDetail":"api/redPacket/redPacketCenter/qryUserCouponsByComCode/v1",//加载红包明细未使用红包劵
  "getUseResult":"api/redPacket/redPacketCenter/qryCouponsUseResult/v1", //电子券核心结果查询

  //充值送页面接口
  "getReCharge":"h/rest/invoke?service=20010",
  //校验手机号和地市接口
  "regUser":"h/rest/invoke?service=40002",
  //校验手机号成功后 校验activityWhiteListFileId
  "regUserActivity":"h/rest/invoke?service=40008",
  //登录接口
  "getCode":"h/rest/invoke?service=40004", //获得验证码
  "getThreeGateCode":"h/rest/invoke?service=40004", //三网号码获得验证码
  "login":"h/rest/login?service=10008",//登录
  //抢红包接口
  "rodRedPacket":"api/redPacket/redPacketCenter/marketCouponsOrder/v1",
  //优惠券接口
  "getCoupon":"api/redPacket/redPacketCenter/subRedPacketActivity/v1",
  "getTelephone":"h/rest/invoke?service=20043",//获取天津h5接口
  "getRedCoupon":"api/redPacket/redPacketCenter/subRedPacketActivity/v1",
  "getKing":"h/rest/invoke?service=20024",
  "getKingsubmit":"h/rest/invoke?service=20025",
  "getKingstoreId":"h/rest/invoke?service=40005",
  // "getRedCoupon":"api/redPacket/redPacketCenter/subRedPacketActivity/v1",
  //美宜佳店铺(内网or外网)
  "isInNetWork":"h/rest/invoke?service=40003",//判断本网异网
  "sendCodeKing":"lyhzqWeb/rest/invoke?service=20008",//发送验证码
  "ajaxCodeking":"lyhzqWeb/rest/invoke?service=20002",//校验验证码
  "weixinSDK":"applet-web/rest/invoke?service=20001",//微信分享
  "Jumpmode":"h/rest/invoke?service=40006"
}
