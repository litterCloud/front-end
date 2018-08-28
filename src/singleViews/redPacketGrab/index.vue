<template>
  <div class="recharge" @click="triggerFn" :class="{'isNetwork':inNetWork}"  >
    <in-network   v-if="inNetWork ==true" :rechargeFootList="rechargeFootList" :rechargeHeadList="rechargeHeadList" :rechargeList="rechargeList" :canWeixinShare="canWeixinShare" :storeName="storeName" :storeId="storeId" @ajaxTrigger="ajaxTrigger"></in-network>
    <out-network  v-else-if="inNetWork ==false " :rechargeHeadList="rechargeHeadList"  :rechargeFootList="rechargeFootList"  :rechargeList="rechargeList" :canWeixinShare="canWeixinShare" :storeName="storeName" :storeId="storeId" :activityUrl="activityUrl" :outurlfoot="outurlfoot" @ajaxTrigger="ajaxTrigger"></out-network>
    <div class="foot" v-if="inNetWork ==false " @click="jumpkingDesc" touchId="TOUCH_CODE_004">
      申请王卡获取更多优惠
    </div>
  </div>
</template>
<script>
  import inNetwork from "./inNetwork"
  import outNetwork from "./outNetwork"
  import {setTelAndToken} from '@/api/methods'
  export default {
    components: {
      inNetwork,outNetwork
    },
    data() {
      return {
        foreignActivityId:"",
        outurlfoot:"",
        storeName:"",
        activityId:"",
        provinceCode:"",
        activityUrl:"",
        storeId:"",
        canWeixinShare:false,
        share:{
          shareUrl:"",
          shareAppId:"",
        },
        inNetWork:true,
        rechargeHeadList: {
          activityBeginTime: "",
          activityEndTime: ""
          /*rechargeTitle: "",
          rechargeDesc: "金额随机 指定商家通用",
          rechargeType: false*/
        },
        rechargeFootList: [],
        rechargeList: {
          actCode: "",
          actType:""
        },
        cityCode:[]
      }
    },
    props: {},
    computed: {
      userTel() {
        return this.$store.state.userInfo.tel;
      }
    },
    watch: {
      activityId:{
        handler:function(newVal, oldVal){
          let vm = this;
          if(vm.inNetWork){
            vm.request(newVal);
          }

        }
      },
      foreignActivityId:{
        handler:function(newVal, oldVal){
          let vm = this;
          if(!vm.inNetWork){
            vm.request(newVal);
          }
        }
      },
      cityCode:{
        handler:function(newVal, oldVal){
          let vm = this;
          vm.queryPowerOfCity();
        }
      },
      userTel:{
        handler:function(newVal, oldVal){
          console.log("handler"+newVal+":"+oldVal);
          let vm = this;
          vm.isInNetWork();
        }
      }
    },
    methods: {
      triggerFn(data){
        let vm = this;
        let triggerDom = data.path;
        for(let i =0;i<triggerDom.length;i++){
          let $trigger = triggerDom[i];
          if($trigger.attributes){
            let touchId = $trigger.attributes['touchId'];
            if(touchId){
              console.log(touchId.value);
              vm.ajaxTrigger(touchId.value)
            }
          }
        }
      },
      ajaxTrigger(touchId){
        let vm = this;
        let pageCode = vm.inNetWork ? 'PAGE_CODE_001' : 'PAGE_CODE_002';
        let path = location.href;
        let urlParam = vm.$util.getAllQueryString();
        let sendData = {
          pageCode:pageCode,//美宜佳本网抢红包,
          pageUrl:path,//页面url
          phoneNumber:vm.$store.state.userInfo.tel,//用户手机号
          sourceType:urlParam.sourceType ? urlParam.sourceType : '', //访问入口 url
          cityName:vm.$store.state.position.city||'', //用户定位获取到的地市名称
          touchCode:touchId,//页面触点的唯一标识,
          spare:vm.inNetWork ? vm.activityId : vm.foreignActivityId
        }
        vm.$axios({
          url:vm.$util.getUrl('touchType'),
          data:sendData
        }).then(()=>{
          console.log("touch ajax success");
        }).catch(()=>{
          console.log("touch ajax fail");
        })
      },
      setTelAndToken,
      request:function (res) {
        let vm = this;
        let query = vm.$util.getAllQueryString();
       // console.log("query:"+query)
        vm.$axios.post(
          vm.$util.getUrl("getReCharge"),
          {
            "marketingActivityId": res,
            "provinceCode":vm.provinceCode
          }
        ).then(function (returnData) {
          let ruleContent = JSON.parse(returnData.ruleContent);
          //头部信息
          vm.rechargeHeadList.activityBeginTime = ruleContent.startDate;
          vm.rechargeHeadList.activityEndTime = ruleContent.endDate;
          vm.rechargeHeadList.rechargeTitle = ruleContent.couponsName;
          /*校验手机号地市*/
          (ruleContent.cityCode && ruleContent.cityCode.length > 0) && (vm.cityCode = ruleContent.cityCode);
          //尾部活动规则
          console.log("尾部活动规则")
          vm.rechargeFootList = (ruleContent.rule || "").split("\n");
          vm.$util.storeSet("rechargeFootList", vm.rechargeFootList);
          let codeContent = ruleContent.ruleContent || {};

          vm.rechargeList.actCode = codeContent.outActCode+"";
          vm.rechargeList.actType = Number(codeContent.fType)+3+"";
        }).catch(function (error) {
          console.log(error);
          if(typeof error.respCode == 'string'){
            vm.$vux.toast.text(error.respDesc);
          }else{
            vm.$vux.toast.text("服务器出小差啦，请稍后重试！");
          }
        })
      },
      queryPowerOfCity:function(){
        let vm = this;
        vm.$axios.post(
          vm.$util.getUrl("regUser"),
          {
            "desmobile":vm.$store.state.userInfo.tel,
            "city":vm.cityCode
          }
        ).then(function (returnData) {
          console.log("校验成功");
        }).catch(function (error) {
          if(typeof error.respCode == 'string'){
            console.log("校验失败",error);
            vm.$rodConfirm({
              config: {
                type:"fail",
                close:false,
                title:"",
                content: "亲，您不能参加该活动哦",
                confirmBtn: "返回",
                cancelBtn:false,
                confirmFn() {
                  location.href = vm.$config.routerList.home;
                }
              }
            });
          }else{
            console.log("服务器出错");
            vm.$vux.toast.text("服务器出小差啦，请稍后重试！");
          }
        })
      },
      /*判断是否微信可发起分享*/
      isWeixin:function(){
        let vm = this;
        let ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        //ua="micromessenger";
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          vm.weixinShare();
        }else{
          vm.canWeixinShare = false;
          return false;
        }
      },
      isInNetWork:function(){
        let vm = this;
        let params = {
          desmobile:vm.userTel
        };
        vm.$util.getCacheOrAjaxData(vm.userTel+"isInNetWork",vm.$util.getUrl("isInNetWork"),params)
          .then((data)=>{
              vm.inNetWork = true;
              console.log("内网");
            //vm.request(vm.activityId);
            vm.ajaxTrigger("");
            vm.getActivityId();
          })
          .catch((error)=>{
            if(error.respCode =="0001"){
              vm.inNetWork = false;
              //vm.request(vm.foreignActivityId);
              debugger;
              vm.ajaxTrigger("");
              vm.getActivityId();
              console.log("外网");
            }else{
               console.log('本网异网判断失败');
            }

          })
      },
      /*发起微信分享*/
      weixinShare(){
        let vm = this;
//        vm.$axios({
//          url:vm.$util.getUrl("weixinSDK"),
//          data:{
//            appId:vm.$config.weiXinShare.appId,
//            url:location.href
//          }
//        })
//          .then((data)=>{
//            let config = {
//              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//              appId: vm.$config.weiXinShare.appId, // 必填，公众号的唯一标识
//              timestamp: data.timestamp, // 必填，生成签名的时间戳
//              nonceStr: data.nonceStr, // 必填，生成签名的随机串
//              signature: data.signature,// 必填，签名
//              jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
//            }
//            vm.$wechat.config(config);
//            vm.$wechat.ready(()=>{
//              vm.canWeixinShare = true;
//              console.log("微信sdk调用成功");
//            })
//            vm.$wechat.error(()=>{
//              vm.canWeixinShare = false;
//              console.log("微信sdk调用失败");
//            })
//
//          })
//          .catch((error)=>{
//            vm.canWeixinShare = false;
//            console.log("微信发起分享失败");
//          })
      },
      jumpkingDesc(){
        let vm=this;
        location.href="kingDesc.html?urlnav="+vm.outurlfoot;
        //   location.href =vm.outurlfoot;
      },
      getActivityId(){
        let vm = this;
        let urldata= vm.$util.getAllQueryString();
        let urldata1=location.href;
        urldata1=urldata1.substring(0, urldata1.indexOf('?'));
        urldata1=urldata1+"?UUID="+urldata.UUID;
        vm.$axios.post(
          vm.$util.getUrl("Jumpmode"),
          {
            "qrcodeUrl":urldata1,
            "provinceCode":51
          }
        )
          .then(function (res) {
            if(res.activityId!=null&&res.foreignActivityId!=null){
              vm.storeName=res.storeName;
              vm.provinceCode=res.provinceCode;
              vm.storeId=res.storeId;
              vm.activityUrl=res.activityUrl;
              if(vm.inNetWork){
                vm.activityId=res.activityId;
              }else{
                vm.foreignActivityId=res.foreignActivityId;
              }
              // vm.request();
            }else{
              var store1="";
              // if(res.storeId!=""&&res.storeId!=null){
              //   store1="&storeId="+res.storeId;
              // }
              location.href ="rodRedPacket-kingcard.html?provinceCode=51&qrcodeUrl="+location.href.substring(0, urldata1.indexOf('?'))+store1+"&UUID="+urldata.UUID;
            }
//
          })
          .catch(function (error) {
            location.href="app.html";
          })
      }
    },
    created() {
      let vm=this;
      let urldata= vm.$util.getAllQueryString();
      let urldata1=location.href;

      urldata1=urldata1.substring(0, urldata1.indexOf('?'));
      vm.outurlfoot=urldata1+"&UUID="+urldata.UUID;
      urldata1=urldata1+"?UUID="+urldata.UUID;
      console.log("可以了呀")
      let query = vm.$util.getAllQueryString();
      vm.setTelAndToken();
      if(query.id){
        vm.$util.storeSet("rodActivityId",query.id)
      }else{
        query.id = vm.$util.storeGet("rodActivityId") || ""
      }
      if(query.province){
        vm.$util.storeSet("rodProvinceCode",query.id)
      }else{
        query.province = vm.$util.storeGet("rodProvinceCode") || ""
      }
      if(!this.$store.state.userInfo.tel){
        vm.$login();
        return false
      }else{
        console.log("判断是否发登陆调用信息")
        console.log("activityId:"+this.activityId)
        // vm.isInNetWork();

        vm.isWeixin();
      }
    }
  }
</script>
<style scoped lang="less">
  .recharge{
    min-height:100vh;
    background-color: #FE6253;
    overflow-x: hidden;
    color: #fff;
  }
  .isNetwork{
    background-color: #FE403F;
  }
  .foot{
    width:100%;
    height:0.88rem;
    line-height:0.88rem;
    /*position:absolute;*/
    /*bottom: 0;*/
    /*position: absolute;*/
    /*top: 12.50rem;*/
    color: #ec6d5d;
    background: #FFFFFF;
    text-align: center;
  }
</style>
