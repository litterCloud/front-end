<template>
  <div class="recharge-head" >
    <div class="go-back" @click="goBack"></div>
    <div class="tel">{{userTel | phoneFormatEncryption}}</div>
    <div class="date">{{ rechargeHeadList.activityBeginTime }} - {{ rechargeHeadList.activityEndTime }}</div>
    <div class="rod-btn" @click="rodRedPacket" touchId="TOUCH_CODE_001"></div>
    <div class="rule-title">
      <div class="line"></div>
      <div class="rule-nav">活动规则</div>
      <div class="line"></div>
    </div>
    <div class="recharge-des-list">
      <div class="msg-item" v-for="(item,index) in rechargeFoot" :key="index">
        {{item}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        isRoding:false,
        activityDate:"6月22日-7月22日"
      }
    },
    props: ["rechargeList","rechargeFoot","rechargeHeadList"],
    computed: {
      userTel(){
        return this.$store.state.userInfo.tel;
      }
    },
    methods: {
      goBack(){
        let vm = this;
        location.href = vm.$config.routerList.home;

      },
      rodRedPacket(){
        let vm=this;
        if(!vm.userTel){
          vm.$login();
          return false;
        }
        if(vm.isRoding){
          return false;
        }
        vm.isRoding=true;
        let data = {
            bodyAttributeName:"MARKET_COUPONS_ORDER_REQ",
            acceptNo:vm.$util.getCid(vm.userTel),
            actCode:vm.rechargeList.actCode,
            actType:vm.rechargeList.actType,
            accNbr:vm.userTel,
            //抢红包页面的publicEntity
            publicEntity:{
              mechanismCode:"9940",
              jobNumber:"007",
              channelCode:"CBDF4",
              requestTime:new Date().FormatDate("YYYYMMddhhmmss")+"222",
              cityNo: vm.rechargeList.radPacketApi.cityCode,
              provinceNo:"51",
              areaNo:"5102"
              },
            }
        console.log(data)
        vm.$bssAxios({
          url:vm.$util.getUrl("rodRedPacket"),
          data: data
        }).then(function (data) {
          vm.isRoding=false;
          vm.$rodConfirm({
            config: {
              type:"success",
              title: data.grantFee || "",
              content: "无门槛通用券",
              confirmBtn: "去消费，GO！",
              cancelBtn:false,
              confirmFn() {
                location.href = "app.html#/redpacketDetail";
                // if(vm.$util.getData("userFrom") == 1){
                //   //手厅进入
                //   location.href = "http://m.client.10010.com/mobileService/openPlatform/openPlatLine.htm?to_url=https://redpacket.ohaotian.cn/paytest/PayServlet"
                //
                // }else{
                //   //非手厅进入
                //   location.href = "https://cellphonefront.unicompayment.com:55363/couponH5/beforeLogin.jsp?channel=LTDZ225&modelId=001";
                //
                // }
              },
              cancelFn(){
                // location.href=vm.$config.routerList.home;
              }

            }
          });
        }).catch(function (error) {
          let errorMsg="未抢中";
          let errorTitle="Sorry 很遗憾！";
          let confirmBtn = "我再逛逛";
          let confirmFnType = "1";//去往充值送页面
          vm.isRoding=false;
          switch (error.respCode+""){
            case "102046":
              //此活动不允许多次处理
              errorMsg=error.respDesc || "活动不允许多次处理";
              errorTitle="";
              break;
            case "102023":
              //红包中心不存在此活动/活动已过期，不能办理
              errorMsg=error.respDesc || "此活动/活动已过期，不能办理";
              errorTitle="";
              break;
            case "102048":
              //不符合满减规则
              errorMsg=error.respDesc || "不符合满减规则";
              errorTitle="";
              break;
            case "102049":
              //抢红包活动不存在，请检查活动
              errorMsg=error.respDesc || "抢红包活动不存在，请检查活动";
              errorTitle="";
              break;
            case "102050":
              //抢红包活动暂未开始，请稍后
              errorTitle="亲，活动暂未开始";
              errorMsg = "活动暂未开始哦";
              break;
            case "102051":
              //用户参与次数已达上限
              errorMsg="亲，您参与活动的次数已达上限";
              errorTitle="";
              confirmBtn = "去消费";
              confirmFnType = 2; //"去往首页"
              break;
            case "102052":
              //红包已派发完
              errorMsg = "红包已抢完，欢迎下次再来";
              confirmBtn = "回首页";
              break;
            case "RSP_CODE_FAILUR":
              errorMsg = error.respDesc || "服务器开小差了，请稍后重试！";
              errorTitle="";
              break;
            default:
              break;
          }
          vm.$rodConfirm({
            config: {
              type:"fail",
              title:errorTitle,
              content: errorMsg,
              confirmBtn: confirmBtn,
              cancelBtn:false,
              confirmFn() {
                switch (confirmFnType+""){
                  case "1":
                    //去往充值送页面
                    location.href=vm.$config.routerList.home;
                    break;
                  case "2":
                    //去付款
                    location.href = "app.html#/redpacketDetail";
                    // if(vm.$util.getData("userFrom") == 1){
                    //   //手厅进入
                    //   location.href = "http://m.client.10010.com/mobileService/openPlatform/openPlatLine.htm?to_url=https://redpacket.ohaotian.cn/paytest/PayServlet"
                    //
                    // }else{
                    //   //非手厅进入
                    //   location.href = "https://cellphonefront.unicompayment.com:55363/couponH5/beforeLogin.jsp?channel=LTDZ225&modelId=001";
                    //
                    // }
                    break;
                }
              }
            }
          });
        })
      }

    },
    watch: {},
    created() {}
  }

</script>
<style scoped lang="less" type="text/less">
  .rule-title{
    font-size: 0.35rem;
    margin-top: 10.6rem;
    padding-left: 0.66rem;
    padding-right: 0.66rem;
    width: 100%;
    letter-spacing: 2px;
    margin-bottom: 0.36rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }
  .rule-title .line {
    border-bottom: 1px solid #fff;
    flex: 1;
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
  }
  .rule-title .rule-nav {
    padding: 0 0.2rem;
    text-align: center;
  }
  .recharge-des-list{
    font-size: 0.24rem;
    line-height: 0.32rem;
    padding-left: 0.66rem;
    padding-right: 0.66rem;
    width: 100%;
  }
  .recharge-head{
    width:100%;
    position: relative;
    height:13.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: url("~@/assets/rodRedPacket/background-redpacket.png") no-repeat;
    background-size: 100% 100%;
    .rod-btn{
      position: absolute;
      top: 7.32rem;
      left: 50%;
      transform: translateX(-50%);
      width: 2.9rem;
      height: 2.9rem;
      background: url('~@/assets/rodRedPacket/btn_rodRedPacket.png') no-repeat;
      background-size: 100% 100%;
    }
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
    .tel{
      width: 2.32rem;
      height: 0.64rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 5.91rem;
      right: 0.24rem;
      font-size: 0.3rem;
    }
    .date {
      width: 4.72rem;
      height: 0.58rem;
      position: absolute;
      top: 3.31rem;
      left: 1.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.3rem;
    }
    .recharge-msg{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding-left: 0.4rem;
      .recharge-title{
        width:65%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.32rem;
        color:#d19f50;
        letter-spacing: 0.06rem;
        margin-top:0.8rem;
        padding:0 0.1rem;
        flex-shrink: 0;
      }
      .recharge-title:before,.recharge-title:after{
        font-size: 0.12rem;
        width:15%;
        overflow: hidden;
        content: "";
        height:1px;
        border: 1px dotted #d19f50;
        display: inline-block;
        margin:0 0.04rem;
      }
      .recharge-desc{
        margin-top:1.6rem;
        width:65%;
        height:0.46rem;
        line-height: 0.46rem;
        text-align: center;
        background: #d19f50;
        border-radius: 0.23rem;
        font-size: 0.25rem;
      }
    }
    .use-time{
      text-align: center;
      /*margin-bottom: 0.56rem;*/
      margin-top:1.4rem;
      font-size: 0.28rem;
    }
  }
</style>
