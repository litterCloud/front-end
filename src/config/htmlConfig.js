/**
 *  配置文件  用于在生成html时 自动插入页面内容的配置 即 htmlWebpackPlugin的配置
 *  wing
 *
 * */
let obj = {
  "defaultConfig":{
    title:"你购物，沃买单" //默认的title名称
  },
  "example":{
    title:"组件示例页面"  //example 组件示例页面
  },
  "app":{
    title:"你购物，沃买单" // app的title名称
  },
  "recharge":{
    title:"你购物，沃买单"// 充值送的title名称
  },
  "rodRedPacket":{
    title:"你购物，沃买单"//抢红包的title名称
  },
  "coupon-tianjing":{
    title:"领取优惠券"//天津活动页的title名称
  }

};

module.exports = obj
