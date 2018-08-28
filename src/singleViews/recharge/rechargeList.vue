<template>
    <div class="recharge-list">
      <div class="recharge">
        <div v-for="(item,index) in rechargeList" class="rechrge-item" :class="{'recharge-sel':selectedSign == item.activityId}" @click="itemSelected(item,index)">
          <div class="recharge-msg">
            <span v-html="$util.replaceStr(item.title || '',2)"></span>
          </div>
          <div class="recharge-type">
            {{item.type}}
          </div>
        </div>
        <div v-if="rechargeList.length>2 && rechargeList.length % 2 ==1" class="no-rechrge-item"></div>
      </div>
      <div class="recharge-code">
        <div class="user-tel" >
          <input type="number" placeholder="请输入手机号" v-model="userPhone">
          <div class="clear-tel" @click="clear"></div>
        </div>
        <div class="user-code" v-if="userPhone != userTel">
          <div class="input-code">
            <input type="text" placeholder="请输入验证码" v-model="userCode">
          </div>
          <div class="send-code" @click="sendCode" :class="{'code-disabled':codeSleep}">
            {{btnText}}
          </div>
        </div>
      </div>
      <div class="to-recharge" :class="{'recharge-state':selectedSign}" @click="toRecharge" touchId="TOUCH_CODE_001">
        {{rechargeText}}&nbsp;&gt;
      </div>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
          let vm = this;
            return {
              selectedSign:false,
              userPhone:vm.$store.state.userInfo.tel,
              userCode:"",
              codeSleepTime:30000,
              codeSleep:false,
              codeTimer:"",
              btnText:"获取验证码",
              rechargeText:"去充值",
              maxAjax:10 //请求订单状态的最大次数
            }
        },
        props: ["rechargeList"],
        computed: {
          userTel(){
            return this.$store.state.userInfo.tel;
          },
          productId(){
            let query = this.$util.getAllQueryString();
            return query.productId;
          }
        },
        methods: {
          itemSelected(itemData,itemIdex){
            this.selectedSign = itemData["activityId"];
          },
          toRecharge(){
            let vm = this;
            if(!vm.userTel){
              vm.$login();
              return false;
            }
            if(vm.selectedSign){
              /*如果有验证码-校验验证码，成功之后发送产品ID*/
              if(vm.userPhone != vm.userTel){
                if(vm.userCode == ''){
                  vm.$vux.toast.show({
                    text: '请输入验证码',
                    type:'text',
                    position:"middle"
                  });
                }else{
                  vm.ajaxCode();
                }
              }else{
                vm.ajaxProduct();
              }
            }else{
              vm.$vux.toast.show({
                text: '请选择产品类型',
                type:'text',
                position:"middle"
              });
            }

          },
          clear(){
            this.userPhone = "";
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
              if(vm.userPhone.length != 11){
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
                url:vm.$util.getUrl("sendCode"),
                data:{
                  deviceNumber:vm.userPhone
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
              url:vm.$util.getUrl("ajaxCode"),
              data:{
                deviceNumber:vm.userPhone,
                smsCode :vm.userCode
              }
            })
              .then((data)=>{
                vm.ajaxProduct();
              })
              .catch((error)=>{
                console.log("验证码校验失败",error);
                vm.$vux.toast.show({
                  text: '验证码校验失败',
                  type:'warn',
                  position:"middle"
                })
              })
          },
          /*发送产品Id*/
          ajaxProduct(){
            let vm = this;
            vm.$formAxios.post(vm.$util.getUrl("sendProduct"),
              {
                deviceNumber:vm.userPhone,
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
        watch: {
        },
        created() {
          let query = this.$util.getAllQueryString();
          let vm = this;
          vm.queryObject = query;
          if(query.from){
            if(query.mallOrdersId && query.deviceNumber){
              this.ajaxProductState(1);
            }else{
              console.log("返回数据不全");
            }
          }
        }
    }

</script>
<style scoped lang="less">
  .recharge-list{
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .recharge{
      width:100%;
      flex-wrap: wrap;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .no-rechrge-item{
        margin-top: 0.2rem;
        width:2.5rem;
        height:1.8rem;
      };
      .rechrge-item{
        margin-top: 0.2rem;
        width:2.8rem;
        height:1.8rem;
        background: url("~@/assets/recharge/recharge.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        .recharge-msg{
          margin-top:0.35rem;
          font-size: 0.35rem;
          font-weight: bold;
          .msg-color{
            color:#ee4921;
          }
        }
        .recharge-type{
          margin-bottom:0.08rem;
          color:#9e1a16;
          letter-spacing: 0.06rem;
          font-size: 0.32rem;
        }
      }
      .recharge-sel{
        background: url("~@/assets/recharge/recharge-active.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .recharge-code{
      width:100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 0.4rem;
      .user-tel{
        width:80%;
        height:0.6rem;
        border-radius: 0.3rem;
        background: #FFFFFF;
        padding-right:0.3rem;
        padding-left:0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input{
          border:0;
          height:100%;
          width:80%;
        }
        input:focus{
          outline: 0;
        }
        .clear-tel{
          display: inline-block;
          width:0.35rem;
          height:0.35rem;
          background: #CDCDCD;
          border-radius: 50%;
          position: relative;
        }
        .clear-tel:before{
          content: '';
          position: absolute;
          top:45%;
          left:3px;
          width: 0.25rem;
          height: 2px;
          background-color: #FFFFFF;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        .clear-tel:after{
          content: '';
          position: absolute;
          top:45%;
          left:3px;
          width: 0.25rem;
          height: 2px;
          background-color: #FFFFFF;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
      }
      .user-code{
        width:80%;
        height:0.6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top:0.25rem;
        .input-code{
          width:60%;
          background: #FFFFFF;
          height:100%;
          padding-right:0.3rem;
          padding-left:0.5rem;
          border-radius: 0.3rem;
          input{
            display: flex;
            border:0;
            height:100%;
            width:100%;
          }
          input:focus{
            outline: 0;
          }
        }
        .send-code{
          display: flex;
          align-items: center;
          justify-content: center;
          width:50%;
          margin-left:0.3rem;
          height:100%;
          border-radius: 0.3rem;
          background: #C33F3D;
          font-size: 0.3rem;
          color:#FFFFFF;
          text-align: center;
        }
        .code-disabled{
          background: #aaa9a9;
        }
      }
    }
    .to-recharge{
      width:90%;
      margin-top:0.6rem;
      height:0.88rem;
      background: #aaa9a9;
      font-size: 0.35rem;
      color:#FFFFFF;
      text-align: center;
      line-height: 0.88rem;
      border-radius: 0.44rem;
    }
    .recharge-state{
      background: #c33f3d;
    }
  }
</style>
