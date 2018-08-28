<template>
    <div class="get-coupon">
      <!--<div class="title">用户手机号</div>-->
      <div class="login-item" v-if="!sign">
        <x-input class="tel-input" mask="999 9999 9999" disabled   v-model="tel" :max="13"></x-input>
      </div>
      <div class="login-item" v-if="sign">
        <x-input class="tel-input" mask="999 9999 9999" disabled   v-model="tel" :max="13" ></x-input>
      </div>
      <!--<div class="show-tel" v-if="sign">{{teled}}</div>-->
      <div class="button-item">
        <x-button type="default" class="confirm-btn" @click.native="confirmBtn" v-if="!sign">立即领取</x-button>
        <x-button type="default" class="confirm-btn" @click.native="confirmBtn" v-if="sign">完成</x-button>
      </div>
      <div class="notedetails">
        <div>使用规则：</div>
         <div v-for="(item,index) in couponParameter.notedetails">
           {{index+1}}、{{item.text}}
         </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "getCoupon",

        components: {},
        data() {
            return {
              tel:"",
              errorMsg: {
                errorTel: "请输入正确的手机号！"
              },
              error: "",
            }
        },
        props: ["sign","sign1","teled","couponParameter"],
        computed: {
          userTel() {
            let vm = this;
            let tel = (vm.tel + "").replace(/ /g, "");
            if (!Number(tel)) {
              tel = false
            }
//            if (tel.length != 11) {
//              tel = false
//            }

            return tel
          }
        },
        methods: {
          confirmBtn(){
//            let vm = this;
//            if(vm.sign){
//              let href = document.referrer || "";
//              if(href){
//                location.href = href;
//              }else{
//                history.go(-1)
//              }
//              return false;
//            }
////            if (!vm.userTel) {
////              vm.error = vm.errorMsg['errorTel'];
////              return false;
////            }
//
//            vm.error = "";
////            getRedCoupon
//            vm.$axios.post(
//               vm.$util.getUrl("a"),
//               {bodyAttributeName:vm.tel}
//            ).then(function (data) {
//
//              vm.$emit("changeSign",{
//                detail:true,
//                titletext:"领取成功",
//                titleclose:" "
////                teled:vm.userTel
//              })
//
//            }).catch(function (error) {
//              console.log("领取购物卷失败")
//              let errorMsg="该号码已领取过优惠券";
//              let sign = "chongfu";
//              let confirmBtn = "立即查看"
//              switch (error.respCode+""){
//                case "102046":
//                  //此活动不允许多次处理
//                  vm.$confirm({
//                    config: {
//                      type:"horn",
//                      content:errorMsg,
//                      confirmBtn: confirmBtn,
//                      cancelBtn:false,
//                      confirmFn() {
//                        if(sign == "chongfu"){
//                          vm.$emit("changeSign",{
//                            detail:false,
//                            couponSign:true,
//                            titletext:"领取优惠卷",
//                            titleclose:"关闭",
//                            teled:vm.userTel
//                          })
//                        }
//
//                      }
//                    }
//                  });
//                  break;
//                default:
//                  vm.$emit("changeSign",{
//                    detail:false,
//                    titletext:"提示",
//                    promp:true
////                teled:vm.userTel
//                  })
//                  break;
//              }
//            });

            let vm = this;
            if(vm.sign){
              let href = document.referrer || "";
              if(href){
                location.href = href;
              }else{
                history.go(-1)
              }
              return false;
            }
            if (!vm.userTel) {
              vm.error = vm.errorMsg['errorTel'];
              return false;
            }
            vm.error = "";
            vm.$bssAxios({
              url: vm.$util.getUrl("getCoupon"),
              data: {
                bodyAttributeName: vm.couponParameter.bodyAttributeName,
                publicEntity:vm.couponParameter.publicEntity,
                acceptNo:vm.$util.getCid(vm.userTel),
                bssActCode:vm.couponParameter.bssActCode,
                  accNbr:vm.userTel,
                prodCode:vm.couponParameter.prodCode
              }
            }).then(function (data) {
              vm.$emit("changeSign",{
                detail:true,
                couponSign:true,
                teled:vm.userTel
              })
            }).catch(function (error) {
              let errorMsg="哎呀，您已经领过了，预约装宽带月费限时5折，猛戳抢购吧！";
              let sign = "chongfu";
              let confirmBtn = "立即查看"
              switch (error.respCode+""){
                case "102046":
                  //此活动不允许多次处理
                  break;
                default:
                  errorMsg = "领取失败";
                  sign = 'error';
                  confirmBtn = "确定"
                  break;
              }
              vm.$confirm({
                config: {
                  type:"horn",
                  content:errorMsg,
                  confirmBtn: confirmBtn,
                  cancelBtn:false,
                  confirmFn() {
                    if(sign == "chongfu"){
//                      vm.$emit("changeSign",{
//                        detail:false,
//                        couponSign:true,
//                        teled:vm.userTel
//                      })
                      location.href="https://j.youzan.com/v7p0GY"
                    }

                  }
                }
              });

            });


          },
          init(){
            let vm = this;
            let queryParam = vm.$util.getAllQueryString();
            let urlmsg=queryParam.token || "";
            vm.$axios.post(
              vm.$util.getUrl("getTelephone"),
              {"token":urlmsg}
            ).then(function (res) {
              console.log("成功")
              if(res.respCode!="0000"){
                vm.$emit("changeSign",{
                  detail:false,
                  titletext:"提示",
                  promp:true
//                teled:vm.userTel
                })
              }else{
                vm.tel=res.phone
              }
            }).catch(function (error) {
                console.log("错误");
              vm.$emit("changeSign",{
                detail:false,
                titletext:"提示",
                promp:true
//                teled:vm.userTel
              })
          })
        }
        },
        watch: {},
        created() {
          this.init();
        }
    }
</script>

<style scoped lang="less">
  .get-coupon{
    padding-left: 0.42rem;
    padding-right: 0.42rem;

    .title{
      font-size: 0.3rem;
      line-height: 0.3rem;
      border-left: 0.06rem solid #ff9000;
      padding-left: 0.08rem;
      font-weight: bold;

    }
    .notedetails{
      font-size: 0.24rem;
      color: #666;
      margin-top: 0.3rem;
      line-height: 0.48rem;
         }
    .tel-input1 {
      margin-top: 0.3rem;
      line-height: 0.7rem;
      height: 0.7rem;
      background-color: transparent;
      border-radius: 0.4rem;
      font-size: 0.3rem;
      color: #333;
      ::-webkit-input-placeholder {
        color: #999;
      }
    }
    .tel-input{
      line-height: 0.7rem;
      height: 0.7rem;
      background-color: #eaeaea;
      border-radius: 0.4rem;
      font-size: 0.3rem;
      color: #333;
      ::-webkit-input-placeholder {
        color: #999;
      }
      &.code {
        padding-right: 0.1rem;
        margin-bottom: 0rem;
      }
    }
    .show-tel{
      margin-top: 0.3rem;
      line-height: 0.7rem;
      height: 0.7rem;
      font-size: 0.3rem;
      color: #333;
      padding-left: 0.46rem;
    }
    .error-notice {
      font-size: 0.22rem;
      line-height: 0.6rem;
      color: #ff2626;
      padding-left: 0.26rem;
      height: 0.6rem;
    }
    .confirm-btn {
      height: 0.88rem;
      background-color: #ff9000;
      box-shadow: 0rem 0.12rem 0.22rem 0.01rem rgba(194, 116, 14, 0.2);
      margin-top: 0.5rem;
      color: #fff;
      font-size: 0.42rem;
      line-height: 0.88rem;
      border-radius: 0.44rem;
      &:active {
        color: #fff;
        background-color: #f27506;

      }

    }
  }

</style>
