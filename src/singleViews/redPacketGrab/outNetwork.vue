<template>
  <div class="out-network" >
    <div class="go-back" @click="goBack"></div>
    <div class="my-redpacket" @click="goMyRedpacket">
      <div class="redpacket">
        <img src="@/assets/redpacketGrab/redpacket.png" alt="我的红包" touchId="TOUCH_CODE_003">
      </div>
      我的红包
    </div>
    <div class="shop-name">
      {{storeName}}
    </div>
    <div class="rod-btn" @click="rodRedPacketFn" touchId="TOUCH_CODE_001"></div>
    <div class="rule-btn">
      <div class="rule-btn-item rule" @click="showRuleFn">活动规则</div>
      <div class="rule-btn-item share" @click="toShareFn" touchId="TOUCH_CODE_002">分享好友</div>
    </div>
    <div class="float-window" @click="goKingRecharge" touchId="TOUCH_CODE_005"></div>
    <div v-if="showRule" class="activity-rule">
      <div class="close-rule">
        <div class="close" @click="closeRuleFn"></div>
      </div>
      <div class="rule-window" >
        <div class="rule-window-title">活动规则</div>
       <div v-for="item in rechargeFootList" class="rule-window-nav">
         {{item | replaceSpace}}
       </div>
      </div>
    </div>
    <div v-if="showShare" class="activity-share">
      <div class="close-rule">
        <div class="close" @click="closeShareFn"></div>
      </div>
      <div class="share-window">
        <!--<div class="share-btn share-friends" @click="shareToFriends">
          <div>分享给微信好友</div>
        </div>
        <div class="share-btn share-friends-circle" @click="shareToFrirendsCircle">
          <div>分享到朋友圈</div>
        </div>-->
        <share></share>
      </div>
    </div>
    <div style="clear:both"></div>

  </div>
</template>
<script>
  import king from "./kingComfirm"
  import share from "./share"
  export default {
    components: {
      king,share
    },
    props:["rechargeHeadList","rechargeList","storeName","activityUrl","rechargeFootList","storeId","outurlfoot"],
    data() {
      return {
        showRule:false,
        showShare:false,
        shopName:"",
        confirmList:[
          {
            count:120,
            desc:"首充¥50及以上送¥70"
          },
          {
            count:10,
            desc:"美宜佳定向红包"
          },
          {
            count:58,
            desc:"优惠券礼包"
          }
        ]
      }
    },
    computed: {
      userTel(){
        return this.$store.state.userInfo.tel;
      }
    },
    methods: {
      goKingRecharge(){
        let vm=this;
       // console.log(vm.activityUrl+"&urlnav="+vm.outurlfoot);
        location.href =vm.activityUrl+"&urlnav="+vm.outurlfoot;

      },

      goBack(){
        let vm = this;
        location.href = vm.$config.routerList.home;
      },
      goMyRedpacket(){
        console.log("我的红包");
        location.href="app.html#/redpacketDetail";
      },
      showRuleFn(){
        let vm = this;
        vm.showRule = true;
      },
      closeRuleFn(){
        let vm = this;
        vm.showRule = false;
      },
      toShareFn(){
        let vm = this;
        if(vm.canWeixinShare){
          vm.showShare = true;
        }else{
          vm.$vux.toast.show({
            text: '当前环境不支持分享',
            type:'text',
            position:"middle"
          });
        }
      },
      closeShareFn(){
        let vm = this;
        vm.showShare = false;
      },
      rodRedPacketFn(){
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
            storeId:vm.storeId.toString(),
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
          /* vm.$rodConfirm({
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
           });*/
          let successCount = data.grantFee;
          vm.$confirm({
            config: {
              type:"redPacket",
              icon:"success",
              contentString:false,
              content: "红包啊",
              confirmBtn: "确定",
              cancelBtn:false,
              tip:'bottom',
              tipContent:"到我的红包消费",
              confirmFn() {
                console.log("确定");
                vm.$emit("ajaxTrigger",'TOUCH_CODE_006');
                let list = data.list || vm.confirmList;
                vm.$confirm({
                  config: {
                    type:"redPacket",
                    icon:"success",
                    contentString:false,
                    confirmBtn: "免费领取",
                    cancelBtn:false,
                    isWidth:true,
                    confirmFn() {
                      console.log("确定不11111");
                      vm.$emit("ajaxTrigger",'TOUCH_CODE_007');
                      location.href="kingDesc.html?urlnav="+vm.outurlfoot;
                     // location.href="kingDesc.html";
                    }
                  },
                  render:{
                    contentFn:(h)=>{
                      return h('div',
                        {},
                        [
                          h("div",
                            {
                              style:{
                                display:"flex",
                           //     display: flex;
                                display:"-webkit-flex",
                         // justify-content: "center",
                     // -webkit-justify-content: "center",
                      //align-items:center;
                      // -webkit-align-items: center;
                                flexDirection: "row",
                                justifyContent: "center",
                                marginTop: "0.4rem",
                                alignItems: "flex-end"
                              }
                            },
                            [
                              h("div",{
                                domProps:{
                                  innerHTML:"王卡首充专属188元特权"
                                },
                                style:{
                                  width:"auto",
                                  fontSize:"0.36rem",
                                  lineHeight:"0.36rem",
                                  fontWeight:"bold",
                                }
                              })
                            ]
                          ),
                          h("div",
                            {
                              style:{
                                display:"flex",
                            //    display: flex;
                                display: "-webkit-flex",
                      //align-items:center;
                      // -webkit-align-items: center;
                                flexFlow:"row",
                                justifyContent: "center",
                                margin:"0.2rem 0",
                              }
                            },
                            [
                              h(king,{
                                props:{
                                  list:list
                                },
                                style:{
                                  flexFlow:"row"
                                }
                              },[])
                            ]
                          ),
                          h('div',
                            {
                              style:{
                                color:"#f8de48",
                                fontSize:"0.24rem",
                                lineHeight: "0.3rem"
                              },
                              domProps:{
                                innerHTML:"请联系店员免费领取王卡完成领取"
                              }
                            },
                            [])
                        ]
                      )
                    }
                  }
                });
              }
            },
            render:{
              contentFn:(h)=>{
                return h('div',
                  {},
                  [
                    h("div",
                      {
                        style:{
                          display:"flex",
                         display: "-webkit-flex",
               // justify-content: center;
               // -webkit-justify-content: center;
                //align-items:center;
                // -webkit-align-items: center;
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: "1rem"
                        }
                      },
                      [
                        h("div",{
                          domProps:{
                            innerHTML:successCount
                          },
                          style:{
                            width:"auto",
                            fontSize:"1.2rem",
                            fontWeight:"bold",
                            height:"1.2rem"

                          }
                        }),
                        h("div",{
                          domProps:{
                            innerHTML:"元"
                          },
                          style:{
                            width:"auto"
                          }
                        })
                      ]
                    ),
                    h("div",
                      {},
                      [
                        h("div",{
                          domProps:{
                            innerHTML:"恭喜获得美宜佳通用电子券"
                          }
                        })
                      ]
                    )
                  ]
                )
              }
            }
          });
        }).catch(function (error) {
          let useDefault = true;
          let errorMsg="未抢中";
          let errorTitle="Sorry 很遗憾！";
          let confirmBtn = "我再逛逛";
          let confirmFnType = "1";//去往充值送页面
          vm.isRoding=false;
          console.log(error.respCode);
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
              useDefault = false;
              vm.$confirm({
                config: {
                  type:"redPacket",
//                  content:["您的领红包次数已达上线。每天最多一次，活动期间累计不超过三次"],
                  content:["今天领红包次数已达上限！"],
                  confirmBtn: "返回首页",
                  cancelBtn:false,
                  confirmFn() {
                    console.log("返回红阿伯");
                    location.href ="app.html#/"
                  }
                }
              });
              //用户参与次数已达上限
              errorMsg="亲，您参与活动的次数已达上限";
              errorTitle="";
              confirmBtn = "去消费";
              confirmFnType = 2; //"去往首页"
              break;
            case "102052":
              useDefault = false;
              vm.$confirm({
                config: {
                  type:"redPacket",
                  contentString:false,
                  confirmBtn: "返回首页",
                  cancelBtn:false,
                  confirmFn() {
                    console.log("返回红阿伯");
                    location.href = "app.html#/"
                  }
                },
                render:{
                  contentFn:(h)=>{
                    return h('div',
                      {},
                      [
                        h("div",{
                          domProps:{
                            innerHTML:"很遗憾！"
                          },
                          style:{
                            width:"auto",
                            fontSize:"0.6rem",
                            marginTop:"0.6rem"

                          }
                        }),
                        h("div",{
                          domProps:{
                            innerHTML:"红包已抢完，欢迎继续参加"
                          },
                          style:{
                            width:"auto",
                            fontSize:"0.32rem",
                            marginTop:"0.2rem"
                          }
                        }),
                      ]
                    )
                  }
                }
              });
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
          if(useDefault){
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
          }

        })
      },
    },
    watch: {},
    created() {
    }
  }

</script>
<style scoped lang="less" type="text/less">
  .out-network{
    min-height:13.3rem;
    background: url("~@/assets/redpacketGrab/out-bg.jpg") no-repeat;
    background-size: 100% 100%;
    //display: -webkit-flex;
   // -webkit-justify-content: center;
    //-webkit-align-items: center;
    //display: flex;
  //  display: -webkit-flex;
  //  justify-content: center;
    //-webkit-justify-content: center;
   // align-items:center;
   // -webkit-align-items: center;
    background-color: #FE6253;
    .rule-window-title{
      text-align: center;
      font-size: 0.4rem;
      font-weight: 600;
      padding-bottom: 0.3rem;
      padding-top: 0.3rem;
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
    .rule-window-nav{
      font-size: 0.2rem;
      line-height: 0.6rem;
      padding: 0 0.3rem 0 0.3rem;
    }
    .my-redpacket{
      width: 1.98rem;
      height: 0.64rem;
      background-color: #d33b21;
      position: absolute;
      right: 0;
      top:0.4rem;
      border-radius: 0.32rem 0 0 0.32rem;
      /*display: flex;*/
      /*align-items: center;*/
      display: flex;
      display: -webkit-flex;
      justify-content: space-around;
      -webkit-justify-content: space-around;
      align-items:center;
      -webkit-align-items: center;
     // justify-content: space-around;
      font-size: 0.28rem;
      line-height: 0.64rem;
      .redpacket{
        display: inline-block;
        width:0.5rem;
        height:0.5rem;
        background-color: #FFFFFF;
        border-radius: 50%;
        padding:0.08rem 0.1rem;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .shop-name{
      position:absolute;
      top:7.31rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 2.6rem;
      text-align: center;
      font-size: 0.28rem;
    }
    .rod-btn{
      position: absolute;
      top: 8.3rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 2.9rem;
      height: 2.9rem;
      background: url('~@/assets/rodRedPacket/btn_rodRedPacket.png') no-repeat;
      background-size: 100% 100%;
    }
    .rule-btn{
      width:100%;
    //  display: flex;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      //align-items:center;
     // -webkit-align-items: center;
      flex-flow: row;
      align-content: space-around;
      position: absolute;
      top: 11.47rem;
      //justify-content: center;
      .rule-btn-item{
        width: 2.54rem;
        height: 0.76rem;
        border-radius: 0.38rem;
        text-align: center;
        line-height: 0.76rem;
        font-size: 0.28rem;
      }
      .rule{
        background: url("~@/assets/redpacketGrab/rule.png");
        margin-right:0.12rem;
        background-size: 100% 100%;

      }
      .share{
        background: url("~@/assets/redpacketGrab/share.png");
        margin-left:0.12rem;
        background-size: 100% 100%;
      }
    }
    .foot{
      width:100%;
      height:0.88rem;
      line-height:0.88rem;
      /*position:absolute;*/
      /*bottom: 0;*/
      position: absolute;
      top: 12.50rem;
      color: #ec6d5d;
      background: #FFFFFF;
      text-align: center;
    }
    .float-window{
      width:1.2rem;
      height:1.2rem;
      background: url("~@/assets/redpacketGrab/float-window.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right:0.24rem;
      top:9.93rem;
    }
    .activity-rule{
      position:absolute;
      top:0;
      right:0;
      bottom:0;
      left:0;
      background: rgba(0,0,0,0.5);
      /*display: flex;*/
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items:center;
      -webkit-align-items: center;
      flex-direction: column;
      /*align-items: center;*/
      /*justify-content: center;*/
      z-index: 950120;
      .close-rule{
        width:85%;
        text-align: right;
        margin-bottom:0.2rem;
        .close{
          display: inline-block;
          width:0.6rem;
          height:0.6rem;
          border-radius: 50%;
          border:2px solid #FFFFFF;
          /*display: flex;*/
          /*align-items: center;*/
          /*justify-content: center;*/
          position: relative;
        }
        .close:before{
          content: '';

          position: absolute;
          top:45%;
          left:4px;
          width: 0.4rem;
          height: 2px;
          background-color: #FFFFFF;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);

        }
        .close:after{
          content: '';
          position: absolute;
          top:45%;
          left:4px;
          width: 0.4rem;
          height: 2px;
          background-color: #FFFFFF;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
      }
      .rule-window{
        width:6.42rem;
        height:8.16rem;
        border-radius: 0.2rem;
        background: #ffffff;
        color:#333333;
        overflow-y: auto;
      }
    }
    .activity-share{
      position:absolute;
      top:0;
      right:0;
      bottom:0;
      left:0;
      background: rgba(0,0,0,0.5);
      /*display: flex;*/
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items:center;
      -webkit-align-items: center;
      flex-direction: column;
      /*align-items: center;*/
      /*justify-content: center;*/
      z-index: 950120;
      .close-rule{
        width:85%;
        text-align: right;
        margin-bottom:0.2rem;
        .close{
          display: inline-block;
          width:0.6rem;
          height:0.6rem;
          border-radius: 50%;
          border:2px solid #FFFFFF;
          /*display: flex;*/
          /*align-items: center;*/
          /*justify-content: center;*/
          position: relative;
        }
        .close:before{
          content: '';

          position: absolute;
          top:45%;
          left:4px;
          width: 0.4rem;
          height: 2px;
          background-color: #FFFFFF;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);

        }
        .close:after{
          content: '';
          position: absolute;
          top:45%;
          left:4px;
          width: 0.4rem;
          height: 2px;
          background-color: #FFFFFF;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
      }
      .share-window{
        width:6rem;
        height:3.4rem;
        border-radius: 0.2rem;
        background: #ffffff;
        color:#333333;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items:center;
        -webkit-align-items: center;

        flex-flow: column;
        /*justify-content: center;*/
        /*align-items: center;*/
      }
    }
  }
</style>
