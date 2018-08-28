<template>
    <div class="recharge-list">
      <div class="rodredpacket" @click.stop="rodRedPacket">

      </div>
      <div class="loadSuccessPage"></div>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
          let vm = this;
            return {
              isRoding:false
            }
        },
        props: ["rechargeList"],
        computed: {
          userTel(){
            return this.$store.state.userInfo.tel;
          }
        },
        methods: {
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
            vm.$bssAxios({
              url:vm.$util.getUrl("rodRedPacket"),
              data:{
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
                  cityNo:"510",
                  provinceNo:"51",
                  areaNo:"5102"
                },
              }
            }).then(function (data) {
              vm.isRoding=false;
              vm.$confirm({
                config: {
                  icon:'redPacket',
                  title:  (data.grantFee || "")+"元",
                  content: "无门槛通用券",
                  confirmBtn: "去消费，GO！",
                  cancelBtn:false,
                  confirmFn() {
                    location.href=vm.$config.routerList.home;
                  },
                  cancelFn(){
                    // location.href=vm.$config.routerList.home;
                  }

                }
              });
            }).catch(function (error) {
              let errorMsg="未抢中";
              let errorTitle="Sorry 很遗憾！";
              let icon = "fail";
              let confirmBtn = "我再逛逛";
              let confirmFnType = "1" //去往充值送页面
              vm.isRoding=false;
              switch (error.respCode+""){
                case "102046":
                  //此活动不允许多次处理
                  break;
                case "102023":
                  //红包中心不存在此活动/活动已过期，不能办理
                  break;
                case "102048":
                  //不符合满减规则
                  break;
                case "102049":
                  //抢红包活动不存在，请检查活动
                  break;
                case "102050":
                  //抢红包活动暂未开始，请稍后
                  errorTitle="亲，活动暂未开始";
                  errorMsg = "活动暂未开始哦";
                  icon = false;
                  break;
                case "102051":
                  //用户参与次数已达上限
                  errorTitle="您今天参与次数已达上限";
                  errorMsg="请下次再来";
                  confirmBtn = "去消费"
                  icon = false;
                  confirmFnType = 2 //"去往首页"
                  break;
                case "102052":
                  //红包已派发完
                  errorMsg = "红包已抢完，欢迎继续参加";
                  confirmBtn = "回首页"
                  break;
                default:
                  break;
              }
              vm.$confirm({
                config: {
                  icon: icon,
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
                        //去往首页
                        location.href=vm.$config.routerList.home;
                        break;
                    }

                  }
                }
              });
            })
          }
        },
        watch: {
        },
        created() {

        }
    }

</script>
<style scoped lang="less">
  .recharge-list{
    .rodredpacket{
      background: url("~@/assets/rodRedPacket/rodRedPacket.png") no-repeat;
      width: 3.25rem;
      height: 3.25rem;
      background-size: 100% 100%;
      margin: 0.4rem auto;
    }
    .loadSuccessPage{
      display: none;
      width: 0;
      height: 0;
      background: url("~@/assets/icon/rodSuccess.png") no-repeat;
    }
  }
</style>
