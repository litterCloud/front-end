<template>
  <div class="recharge" @click="triggerFn">
    <rod-red-packet-head :rechargeList="rechargeList" :rechargeFoot="rechargeFootList" :rechargeHeadList="rechargeHeadList" @ajaxTrigger="ajaxTrigger"></rod-red-packet-head>
  </div>
</template>
<script>
  import rodRedPacketHead from "./rodRedPacketHead"
  import rodRedPacketFoot from "./rodRedPacketFoot"
  import rodRedPacketList from "./rodRedPacketList"
  import {setTelAndToken} from '@/api/methods'
  export default {
    components: {
      rodRedPacketHead,
      rodRedPacketFoot,
      rodRedPacketList
    },
    data() {
      return {
        rechargeHeadList: {
          activityBeginTime: "",
          activityEndTime: "",
          rechargeTitle: "",
          rechargeDesc: "金额随机 指定商家通用",
          rechargeType: false
        },
        rechargeFootList: [],
        rechargeList: {
          actCode: "",
          actType:"",
          radPacketApi: {
            cityCode: ''
          }
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
      cityCode:{
        handler:function(newVal, oldVal){
          let vm = this;
          vm.queryPowerOfCity();
        }
      }
    },
    methods: {
      setTelAndToken,
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
        let query = vm.$util.getAllQueryString();
        let pageCode = 'PAGE_CODE_007';
        let path = location.href;
        let urlParam = vm.$util.getAllQueryString();
        let sendData = {
          pageCode:pageCode,//美宜佳本网抢红包,
          pageUrl:path,//页面url
          phoneNumber:vm.$store.state.userInfo.tel,//用户手机号
          sourceType:urlParam.sourceType ? urlParam.sourceType : '', //访问入口 url
          cityName:vm.$store.state.position.city||'', //用户定位获取到的地市名称
          touchCode:touchId,//页面触点的唯一标识,
          spare:query.id
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
      request:function () {
        let vm = this;
        let query = vm.$util.getAllQueryString();
        vm.$axios.post(
          vm.$util.getUrl("getReCharge"),
          {
            "marketingActivityId": query.id,
            "provinceCode":query.province
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
          vm.rechargeFootList = (ruleContent.rule || "").split("\n");
          let codeContent = ruleContent.ruleContent || {};

          vm.rechargeList.actCode = codeContent.outActCode+"";
          vm.rechargeList.actType = Number(codeContent.fType)+3+"";
          vm.rechargeList.radPacketApi.cityCode = returnData.cityCode
          
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
      }
    },
    created() {
      let vm = this;
      let query = vm.$util.getAllQueryString();
      vm.setTelAndToken();
      if(!this.$store.state.userInfo.tel){
        vm.$login();
        return false
      }
      vm.ajaxTrigger("");
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
      vm.request();
    }
  }
</script>
<style scoped lang="less">
  .recharge{
    min-height: 100vh;
    overflow-x: hidden;
    background-color: #fc3f3e;
    color: #fff;
  }
</style>
