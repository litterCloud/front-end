<template>
  <div class="recharge" @click="triggerFn">
    <recharge-head :rechargeHead="rechargeHeadList"></recharge-head>
    <recharge-list :rechargeList="rechargeList"></recharge-list>
    <recharge-foot :rechargeFoot="rechargeFootList"></recharge-foot>
  </div>
</template>
<script>
  import rechargeHead from "./rechargeHead"
  import rechargeFoot from "./rechargeFoot"
  import rechargeList from "./rechargeList"
  import {setTelAndToken} from '@/api/methods'
  export default {
    components: {
      rechargeHead,
      rechargeFoot,
      rechargeList
    },
    data() {
      return {
        rechargeHeadList: {
          activityBeginTime: "",
          activityEndTime: "",
          rechargeTitle: "",
          rechargeDesc: "多充多送  联通指定商家通用",
          rechargeType: false
        },
        rechargeFootList: [


        ],
        rechargeList: [

        ],
        cityCode:[],
        activityWhiteListFileId:""

      }
    },
    props: {},
    computed: {
      userTel() {
        return this.$store.state.userInfo.tel;
      }
    },
    watch:{
      cityCode:{
        handler:function(newVal, oldVal){
          let vm = this;
          vm.queryPowerOfCity();
          if(vm.activityWhiteListFileId !='' ){
            vm.constructor
          }
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
        if(query.id){
          vm.$util.storeSet("marketingActivityId",query.id)
        }else{
          query.id = vm.$util.storeGet("marketingActivityId") || ""
        }
        let pageCode = 'PAGE_CODE_008';
        let path = location.href;
        let urlParam = vm.$util.getAllQueryString();
        let sendData = {
          pageCode:pageCode,//美宜佳本网抢红包,
          pageUrl:path,//页面url
          phoneNumber:vm.$store.state.userInfo.tel,//用户手机号
          sourceType:urlParam.sourceType ? urlParam.sourceType : '', //访问入口 url
          cityName:vm.$store.state.position.city||'', //用户定位获取到的地市名称，
          touchCode:touchId,//页面触点的唯一标识，
          spare:query.id || ""
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
          if(vm.activityWhiteListFileId !='' ){
            vm.activityWhiteListFileIdFn();
          }
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
      activityWhiteListFileIdFn:function(){
        let vm = this;
        vm.$axios.post(
          vm.$util.getUrl("regUserActivity"),
          {
            "phoneNumber":vm.$store.state.userInfo.tel,
            "activityWhiteListFileId":vm.activityWhiteListFileId
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
    },
    created() {
      let vm = this;
      let query = vm.$util.getAllQueryString();
      vm.setTelAndToken();
      if(!this.$store.state.userInfo.tel){
        vm.$login();
      }
      vm.ajaxTrigger("");
      if(query.id){
        vm.$util.storeSet("marketingActivityId",query.id)
      }else{
        query.id = vm.$util.storeGet("marketingActivityId") || ""
      }
      if(query.province){
        vm.$util.storeSet("rechargeProvinceCode",query.id)
      }else{
        query.province = vm.$util.storeGet("rechargeProvinceCode") || ""
      }
      vm.$axios.post(
        vm.$util.getUrl("getReCharge"),
        {
          "marketingActivityId": query.id,
          "provinceCode":query.province
        }
      ).then(function (returnData) {

        let ruleContent = JSON.parse(returnData.ruleContent);
        let rechargeList = [];
        vm.rechargeHeadList.activityBeginTime = ruleContent.startDate;
        vm.rechargeHeadList.activityEndTime = ruleContent.endDate;
        vm.rechargeHeadList.rechargeTitle = ruleContent.couponsName;
        /*校验手机号地市*/
        (ruleContent.cityCode && ruleContent.cityCode.length > 0) && (vm.cityCode = ruleContent.cityCode);
        /*校验*/
        (ruleContent.activityWhiteListFileId && ruleContent.activityWhiteListFileId.length > 0) && (vm.activityWhiteListFileId = ruleContent.activityWhiteListFileId);

        (ruleContent.actRuleEntity || []).forEach(function (value,index) {
          rechargeList.push({
            "title": value.actRuleName,
            "type": "联通红包",
            "activityId": value.actRuleId,
            "key": index+1
          })
        });
        vm.rechargeFootList = (ruleContent.rule || "").split("\n");
        vm.rechargeList = rechargeList;

      }).catch(function (error) {
        console.log(error);
      })
    }
  }

</script>
<style scoped lang="less">
  .recharge{
    background: #FEF5E4;
    min-height: 100vh;
  }
</style>
