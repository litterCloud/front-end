<template>
    <div class="detail">
      <div class="detail-content">
        <!--<div class="money">{{couponDetail.money}}</div>-->
        <!--<div class="money-title">元</div>-->
      </div>
      <div class="success-title">
        优惠券领取成功
      </div>

      <div class="promtifo">稍后将以短信的方式发送到您手机，请注意查收！</div>
      <div class="promtjum" @click="jumpbtn">预约装宽带月费限时5折，猛戳抢购吧！ </div>
      <div class="button-item">
        <x-button type="default" class="confirm-btn" @click.native="cancelBtn">返回</x-button>
      </div>
    </div>
</template>
<script>
    export default {
        name: "detail",
        components: {},
        data() {
            return {}
        },
        props: ["couponDetail"],
        computed: {},
        methods: {
          cancelBtn(){
            let vm = this;
            let href = document.referrer || "";

            if(href){
              vm.$emit("changeSign",{
                detail:false,
                couponSign:true,
                titletext:"领取优惠卷",
                titleclose:"关闭",
                teled:vm.userTel
              })
//              console.log("跳转")
//              location.href = href;
            }else{
              history.go(-1)
            }
          },
          jumpbtn(){
            location.href="https://j.youzan.com/v7p0GY"
          }

        },
        watch: {},
        created() {

        }
    }
</script>

<style scoped lang="less">
  .detail{
    padding: 0 0.42rem;
    .promtifo{
      color: #666;
    }
    .promtjum{
      color: #3c88ed;
      text-align: center;
      margin-top: 0.2rem;
    }
    .detail-content{
      width: 2.64rem;
      height: 2.64rem;
      background:url("~@/assets/coupon/successimg.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      margin-top: 1.26rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.5rem;
      color: #fff;
      padding-top: 0.16rem;
    }
    .money{
      font-weight: 500;
      padding-right: 0.04rem;
    }
    .success-title{
      text-align: center;
      font-size: 0.34rem;
      line-height: 0.6rem;
      color: #333;
      margin-top: 0.5rem;
      font-weight: bold;
    }
    .confirm-btn {
      margin-top: 5.1rem;
      height: 0.88rem;
      background-color: #ff9000;
      box-shadow: 0rem 0.12rem 0.22rem 0.01rem rgba(194, 116, 14, 0.2);
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
