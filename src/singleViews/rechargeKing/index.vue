<template>
  <div class="king" @click="triggerFn">
    <div class="recharge-king">
      <div class="go-back" @click="goBack"></div>
      <div class="recharge-list">
        <div v-for="(v,i) in rechargeList" :key="i" class="recharge-item">
          <div class="charge-count">
            <div class="redpacket-icon">￥</div>
            <div class="redpacket-count">{{v.count}}</div>
          </div>
          <div class="charge-desc">{{v.desc}}</div>
        </div>
      </div>
      <div class="recharge">
        <div class="recharge-choose">
          <div v-for="(v,i) in rechargeNumList" :key="i" class="num-item" :class="{'num-item-active':selectedSign == v.activityId}" @click="itemSelected(v,i)">{{v.title}}</div>
        </div>
        <div class="recharge-msg">
          <div class="login-item">
            <x-input class="tel-input"  placeholder="请输入手机号" v-model="tel" :max="11"></x-input>
          </div>
          <div class="login-item">
            <x-input :max="8" :show-clear="false" v-model="code" class="tel-input code" placeholder="请输入验证码">
              <x-button slot="right" type="primary" class="code-button" :class="{'code-disabled':codeSleep}"
                         @click.native="sendCode">
                {{btnText}}
              </x-button>
            </x-input>
          </div>
          <div class="error-notice">
            {{error || ""}}
          </div>
          <div class="button-item">
            <x-button type="default" class="confirm-btn" @click.native="toRecharge" touchId="TOUCH_CODE_001">去充值</x-button>
          </div>
        </div>
      </div>
      <div class="recharge-rule">
        <div class="css-style">
          <div class="rule-title">
            活动规则
          </div>
          <div class="rule-msg">
            <div v-for="(v,i) in ruleMsg" :key="'rule'+i">
              {{v | replaceSpace}}
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
  import {setTelAndToken} from '@/api/methods'
  import login from '@/libs/login'
  export default {
    components: {
    },
    data() {
      return {
        queryObject:{},
        ruleMsg:[],
        show: false,
        tel: "",
        code: "",
        /*errorMsg: {
          errorTel: "请输入正确的手机号！",
          errorCode: "请输入正确验证码",
          successCode: "验证码已发到你手机上了，2分钟内有效。",
          failCode: "验证码获取失败,请稍后再试。。。",
          noCode: "请先获取验证码",
          login: "充值中。。。",
          getCoding:"正在发送验证码。",
          error:"验证码或手机号错误"
        },
        error: "",
        showCountDown: false,
        countTimeDown: 60,
        loading: false,
        hasCoding: false, //是否已获取验证码
        logining: false, //是否正在登录*/
        busiCode:"B10003",
        rechargeList:[
          {
            count:120,
            desc:"首充￥50及以上送￥70"
          },
          {
            count:10,
            desc:"美宜佳定向红包"
          },
          {
            count:58,
            desc:"优惠劵礼包"
          }
        ],
        rechargeNumList:[
          {
            "id":1,
            "count":"50"
          },
          {
            "id":2,
            "count":"100"
          }
        ],
        selectedSign:"",
        codeSleepTime:60000,
        codeSleep:false,
        codeTimer:"",
        btnText:"获取验证码",
        rechargeText:"去充值",
        maxAjax:10 //请求订单状态的最大次数
      }
    },
    props: {},
    computed: {
      userTel() {
        return this.$store.state.userInfo.tel;
      }
    },
    watch: {
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
        console.log(touchId);
        let vm = this;
        console.log(vm.$store.state)
        let pageCode = 'PAGE_CODE_003';
        let path = location.href;
        let urlParam = vm.$util.getAllQueryString();
        let sendData = {
          pageCode:pageCode,//美宜佳本网抢红包,
          pageUrl:path,//页面url
          phoneNumber:vm.$store.state.userInfo.tel,//用户手机号
          sourceType:urlParam.sourceType ? urlParam.sourceType : '', //访问入口 url
          cityName:vm.$store.state.position.city||'', //用户定位获取到的地市名称
          touchCode:touchId,//页面触点的唯一标识
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
      itemSelected(itemData,itemIdex){
        this.selectedSign = itemData["activityId"];
      },
      goBack(){
        let vm = this;
        let urldata= vm.$util.getAllQueryString();
        console.log(urldata);
       // location.href=urldata.urlnav+"?UUID="+urldata.UUID;
        location.href = vm.$config.routerList.home;
      },
      toRecharge(){
        let vm = this;
        if(!vm.userTel){
          vm.$login();
          return false;
        }
        if(vm.selectedSign){
          if(vm.tel==''){
            vm.$vux.toast.show({
              text: '请输入手机号',
              type:'text',
              position:"middle"
            });
            return false
          }
          if(vm.code == ''){
            vm.$vux.toast.show({
              text: '请输入验证码',
              type:'text',
              position:"middle"
            });
          }
          else{
            vm.ajaxCode();
          }
        }
        else{
          vm.$vux.toast.show({
            text: '请选择产品类型',
            type:'text',
            position:"middle"
          });
        }
      },
      clear(){
        this.tel = "";
      },
      /*获取验证码禁用*/
      codeSleepFn:function(){
        let vm = this;
        let totalTime = vm.codeSleepTime;
        let time = 0;
        vm.codeTimer = setInterval(function(){
          time+=1000;
          let sleep = ((totalTime - time)/1000).toFixed(0) ;
          vm.btnText = sleep+"s后重新获取";
          vm.codeSleep = true;
          if(sleep <1){
            vm.btnText ="获取验证码";
            vm.codeSleep = false;
            clearInterval(vm.codeTimer);
          }
        },1000);
      },
      /*获取验证码*/
      sendCode(){
        let vm = this;
        if(!vm.userTel){
          vm.$login();
          return false;
        }
        if(!vm.codeSleep){
          if(vm.tel.length != 11){
            vm.$vux.toast.show({
              text: '请输入有效手机号',
              type:'text',
              width:"9em",
              position:"middle"
            });
            return;
          }
          /*限制按钮点击*/
          vm.codeSleepFn();
          vm.$formAxios({
            url:vm.$util.getUrl("sendCodeKing"),
            data:{
              desmobile:vm.tel
            }
          })
            .then((data)=>{

            })
            .catch(function(error){
              console.log("验证码发送失败",error);
              /*解除限制*/
              vm.contactCode();
              vm.$confirm({
                config: {
                  type:'pic',
                  icon: false,
                  title: error.respDesc || "验证码获取失败",
                  confirmBtn: false,
                  cancelBtn:false,
                  confirmFn() {
                    console.log("toKing");
                  }
                },
                render:{
                  pic:(h)=>{
                    return h('div',
                      {},
                      [
                        h("img",{
                          attrs:{
                            src:require("@/assets/icon/king.png")
                          }
                        })
                      ]
                    )
                  }
                }
              });
              vm.contactCode();
            })
        }
      },
      /*解除验证码锁定*/
      contactCode(){
        let vm = this;
        vm.btnText ="获取验证码";
        vm.codeSleep = false;
        clearInterval(vm.codeTimer);
      },
      /*校验验证码*/
      ajaxCode(){
        let vm = this;
        vm.$formAxios({
          url:vm.$util.getUrl("ajaxCodeking"),
          data:{
            deviceNumber:vm.tel,
            verityCode :vm.code,
            busiCode:vm.busiCode,
            goodsSku:vm.selectedSign,
            redirectUrl:location.href.replace(location.search,"")+`?from=recharge&id=${vm.queryObject.id || ""}&province=${vm.queryObject.province||""}`
          }
        })
          .then((data)=>{
              /*处理拼接参数*/
              let params = vm.dealParam(data);
              /*跳转页面*/
              location.href = "http://pay.gd10010.cn/compay/compay/payGateway.do"+ params;
          })
          .catch((error)=>{
            let vm = this;
            vm.$confirm({
              config: {
                icon: false,
                title: error.respDesc || "失败",
                content: "",
                confirmBtn: "确定",
                cancelBtn:false,
                confirmFn() {
                }
              }
            });
          })
      },
      /*发送产品Id*/
      ajaxProduct(){
        let vm = this;
        vm.$formAxios.post(vm.$util.getUrl("sendProduct"),
          {
            deviceNumber:vm.tel,
            goodsSku:vm.selectedSign,
            redirectUrl:location.href.replace(location.search,"")+`?from=recharge&id=${vm.queryObject.id || ""}&province=${vm.queryObject.province||""}`
          })
          .then((data)=>{

            if(data.respCode == "0000"){
              /*处理拼接参数*/
              let params = vm.dealParam(data);
              /*跳转页面*/
              location.href = "http://pay.gd10010.cn/compay/compay/payGateway.do"+ params;
            }

          })
          .catch((error)=>{
            let vm = this;
            vm.$confirm({
              config: {
                icon: false,
                title: error.respDesc || "失败",
                content: "",
                confirmBtn: "确定",
                cancelBtn:false,
                confirmFn() {
                }
              }
            });
            console.log('发送产品Id出错',error);
          })
      },
      /*校验产品Id状态*/
      ajaxProductState(num){
        let vm = this;
        let query = vm.$util.getAllQueryString();
        setTimeout(function () {
          vm.$formAxios({
            url:vm.$util.getUrl('ajaxProductState'),
            data:{
              mallOrdersId:query.mallOrdersId,
              deviceNumber:query.deviceNumber
            }
          })
            .then((data)=>{
              /*根据状态调用不同的confirm*/
              if(data.orderState ==  4){
                vm.$confirm({
                  config: {
                    icon: 'success',
                    title: "恭喜您成功参与联通电子券活动！",
                    content: "到账时间以短信通知为准！",
                    confirmBtn: "确定",
                    cancelBtn: false,
                    cancelFn(){
                      location.href = vm.$config.routerList.home;
                    },
                    confirmFn() {
                      location.href = vm.$config.routerList.home;
                    }
                  }
                });
              }
              if(data.orderState ==  3){
                vm.$confirm({
                  config: {
                    icon: 'fail',
                    title: "充值失败！",
                    confirmBtn: "确定",
                    cancelBtn:false,
                    cancelFn(){
                    },
                    confirmFn() {

                    }
                  }
                });
              }
              if(data.orderState ==  2 && num <= vm.maxAjax){

                vm.ajaxProductState(num+1);
              }
            })
            .catch((error)=>{
              if(error.respCode ==  '0001' && num <= vm.maxAjax){

                vm.ajaxProductState(num+1);

              }else{
                console.log("查询订单状态失败"+error);

              }
            })
        },1000);

      },
      dealParam(data){
        let params = "";
        params += "?data="+data.ePayInfo;
        params += "&channelId="+ data.appId;
        return params;
      }
    },
    created() {
      let vm = this;
      //vm.ruleMsg=vm.$util.storeGet("rechargeFootList");
      let query = vm.$util.getAllQueryString();
      vm.setTelAndToken();
      if(!this.$store.state.userInfo.tel){
        vm.$login();
      }
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
      vm.queryObject = query;
      vm.$axios.post(
        vm.$util.getUrl("getReCharge"),
        {
          "marketingActivityId": query.id,
          "provinceCode":query.province
        }
      ).then(function (returnData) {

        let ruleContent = JSON.parse(returnData.ruleContent);
        let rechargeList = [];
        /*vm.rechargeHeadList.activityBeginTime = ruleContent.startDate;
        vm.rechargeHeadList.activityEndTime = ruleContent.endDate;
        vm.rechargeHeadList.rechargeTitle = ruleContent.couponsName;*/
        (ruleContent.actRuleEntity || []).forEach(function (value,index) {
          rechargeList.push({
            "title": value.actRuleName,
            "type": "联通红包",
            "activityId": value.actRuleId,
            "key": index+1
          })
        });
        vm.rechargeFootList = (ruleContent.rule || "").split("\n");
        vm.rechargeNumList = rechargeList;

        vm.ruleMsg=(ruleContent.rule || "").split("\n");
        console.log(vm.ruleMsg);

      }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>
<style scoped lang="less">
  .king{
    min-height: 100vh;
    overflow: hidden;
    background-color: #6627ba;
    .recharge-king{
      min-height:13.3rem;
      background: url("~@/assets/rechargeKing/king-bg.jpg") no-repeat;
      background-size: 100% 100%;
      /*display: flex;*/
      /*align-items: center;*/
      /*justify-content: center;*/
      .go-back{
        width: 0.64rem;
        height: 0.64rem;
        background: url("~@/assets/recharge/go-back.png") no-repeat;
        background-size: 100% 100%;
        /*margin-right:0.32rem;*/
        position: absolute;
        left: 0.3rem;
        top:0.4rem;
      }
      .recharge-list{
        width:6.8rem;
        position:absolute;
        top:4.6rem;
        margin: 0 auto;
        left: 0;
        right: 0;
        /*display: flex;*/
        /*flex-flow: row;*/
        /*justify-content: space-around;*/
        .recharge-item{
          width:2.1rem;
          height:1.5rem;
          margin: 0 0.06rem;
          background: url("~@/assets/rechargeKing/packet.png") no-repeat;
          background-size: 100% 100%;
          float: left;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          -webkit-justify-content: center;
          align-items:center;
          -webkit-align-items: center;
          flex-flow: column;
          /*align-items: center;*/
          /*justify-content: center;*/
          .charge-count{
            display: flex;
            align-items: flex-start;
            justify-content: center;
            color: #FFFFFF;
            .redpacket-icon{
              font-size: 0.35rem;
              line-height: 0.35rem;
            }
            .redpacket-count{
              font-size: 0.77rem;
              line-height: 0.58rem;
            }
          }
          .charge-desc{
            display: flex;
            justify-content: center;
            align-items: center;
            height:0.5rem;
            margin-top:0.1rem;
            font-size: 0.16rem;
            text-align: center;
            color:#FFFFFF;
            padding: 0 0.16rem;
          }
        }
      }
      .recharge{
        width:6.7rem;
        height:4.88rem;
        background-color: #FFFFFF;
        border-radius: 0.16rem;
        position: absolute;
        top:6.4rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding:0.48rem 0.8rem;
        .recharge-choose{
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          .num-item{
            width:2.4rem;
            height:0.88rem;
            background-color:#e0e0e0;
            border-radius: 0.44rem;
            margin:0 0.1rem;
            color:#666666;
            font-size: 0.36rem;
            line-height: 0.88rem;
            display:flex;
            justify-content: center;
          }
          .num-item-active{
            background-color: #ec6d5d;
            color:#FFFFFF;
          }
        }
        .recharge-msg {
          margin-top:0.36rem;
          .tel-input {
            line-height: 0.72rem;
            height: 0.72rem;
            background-color: #ffffff;
            border: solid 0.01rem #b5b5b5;
            border-radius: 0.36rem;
            margin-top: 0.2rem;
            font-size: 0.28rem;
            color: #000000;
            ::-webkit-input-placeholder {
              color: #999999;
            }
            &.code {
              margin-bottom: 0;
            }
          }
          .code-button {
            height: 0.7rem;
            background-color: #ffdc34;
            font-size: 0.26rem;
            line-height: 0.64rem;
            color: #a64824;
            border-radius: 0.3rem;
            padding: 0 0.38rem;
            position: relative;
            right: -0.28rem;
            /*&.isloading {
              background-color: #dad532;
            }*/
          }
          .button-item {
            /*margin-top: 0.2rem;*/
          }
          .confirm-btn {
            height: 0.8rem;
            background: url("~@/assets/rechargeKing/recharge-btn-bg.png") no-repeat;
            background-size: 100% 100%;
            color: #fff;
            font-size: 0.32rem;
            line-height: 0.8rem;
            border-radius: 0.4rem;
          }
          .error-notice {
            font-size: 0.22rem;
            line-height: 0.6rem;
            color: #c33f3d;
            padding-left: 0.26rem;
            height: 0.6rem;
          }
          .spinner {
            color: red;
          }
        }
      }
      .recharge-rule{
        width:100%;
        position:absolute;
        top:11.5rem;
        color:#fffefe;
        background-color: #6627ba;
        display: flex;
        justify-content: center;
        .css-style{
          width:6.7rem;
          padding:0.1rem 0;
          .rule-title{
            width:100%;
            text-align: center;
            font-size: 0.36rem;
            margin-bottom:0.1rem;

          }
          .rule-msg{
            width:100%;
            font-size: 0.24rem;
          }
        }
      }
    }
  }

</style>
