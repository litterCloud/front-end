<template>
  <div>
  <div class="coupon">
    <coupon v-if="(!detail)&&(!promp)" :coupon-detail="couponDetail" :sign="couponSign" ></coupon>
    <get-coupon v-if="!detail&&(!promp)" :sign="couponSign" @changeSign="changeSign" :teled="teled" :coupon-detail="couponDetail" :couponParameter="couponParameter"></get-coupon>
    <detail v-if="detail&&(!promp)" :coupon-detail="couponDetail" @changeSign="changeSign" ></detail>
    <promp v-if="promp" @changeSign="changeSign"></promp>
  </div>
  </div>
</template>
<script>

  import coupon from './coupon';
  import getCoupon from './getCoupon';
  import detail from './detail';
  import promp from './promp'
  export default {
    components: {
      coupon,
      getCoupon,
      promp,
      detail
    },
    data() {
      return {
        couponDetail:{
          money:"20",  //优惠券金额
          time:"2018.05.01-2018.05.31",  //优惠券有效期
          timedetails:[{text:"10元券 有效期2018.06.18-2018.06.18"},{text:"5元券 有效期2018.06.18-2018.06.19"},{text:"5元券 有效期2018.06.18-2018.06.20"}],
          title:"立即领取优惠券",  // 金额下方的文字
          rule:"每个用户仅限领取一次", //优惠券规则一
          titletext:"领取优惠卷",
          titleclose:"关闭",
          desc:[
            "使用范围",
            "1. 仅限天津联通用户",
            "2. 仅限制定商品可用"
          ]
        },
        teled:"",
        couponSign:false, // false 未领取的优惠券页面 true 已领取的优惠券页面
        couponSign1:false,
        detail:false ,//是否展示详情页
        promp:false,
        //测试环境
//        couponParameter:{
//          notedetails:[{text:"仅限已关注天津联通官方微信的粉丝参加，优惠券会自动发送到天津联通官方微信绑定的手机号码中。"},{text:"优惠券在有效期内可在天津联通智慧生活体验馆使用。"}],
//          bodyAttributeName: "SUB_RED_PACKET_ACTIVITY_REQ",
//          publicEntity:{
//            mechanismCode:"9900",
//            jobNumber:"lP7L899",
//            channelCode:"CBDF4",
//            requestTime:new Date().FormatDate("YYYYMMddhhmmss")+"222",
//            cityNo:"510",
//            provinceNo:"51",
//            areaNo:"5102"
//          },
//          bssActCode:"90371234",
//          prodCode:"*"
//        }
        //生产环境
        couponParameter:{
          notedetails:[{text:"仅限已关注天津联通官方微信的粉丝参加，优惠券会自动发送到天津联通官方微信绑定的手机号码中。"},{text:"优惠券在有效期内可在天津联通智慧生活体验馆使用，地址：南开区南马路1151号。"}],
          bodyAttributeName: "SUB_RED_PACKET_ACTIVITY_REQ",
          publicEntity:{
            mechanismCode:"1305",
            jobNumber:"TJ",
            channelCode:"13-0130",
            requestTime:new Date().FormatDate("YYYYMMddhhmmss")+"222",
            cityNo:"130",
            provinceNo:"13",
            areaNo:"5102"
          },
          bssActCode:"13TJ180620",
          prodCode:"*"
        }
      }
    },
    props: {},
    computed: {

    },
    methods: {
      changeSign(sign){
        let vm = this;
        vm.detail = sign.detail;
        vm.couponSign = sign.couponSign;
        vm.teled = sign.teled;
        vm.promp=sign.promp
        vm.couponSign1=sign.couponSign1;
        vm.couponDetail.titletext=sign.titletext;
        vm.couponDetail.titleclose=sign.titleclose
        vm.couponDetail.desc=["使用范围",
          "1. 仅限天津联通用户"]
      },
      returnpage(){
        let vm=this;
        console.log(this.couponDetail.titletext)
        if(this.couponDetail.titletext=="领取优惠卷"){

        }else if(this.couponDetail.titletext=="领取成功"){
           vm.detail=false;
           vm.couponSign=true;
           vm.couponDetail.titletext="领取优惠卷";
           vm.couponDetail.titleclose="关闭";
        }else if(this.couponDetail.titletext=="提示"){
          vm.promp=false;
          vm.couponDetail.titletext="领取优惠卷";
          vm.couponDetail.titleclose="关闭";
        }
      },
      closepage(){
        let vm = this;
          let href = document.referrer || "";
          if(href){
            location.href = href;
          }else{
            history.go(-1)
          }
              }
    },
    created() {

    }
  }

</script>
<style scoped lang="less">
  .coupon{
  }
  .title-head{
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
  .returnpage,.title-text,.close-btn{
    display: inline-block;
  }
  .close-btn{
    float: right;
  }
  .title-text{
    margin-left: 2.6rem;
  }
</style>
