<template>
    <div class="recharge-head" :class="{'universal':rechargeHead.rechargeType==1,'orientation':rechargeHead.rechargeType==2}">
      <div class="user-tel">
        <div class="go-back" @click="goBack"></div>
        <div class="tel">手机号：{{userTel | phoneFormatEncryption}}</div>
      </div>
      <div class="recharge-msg">
        <div class="recharge-title">{{rechargeHead.rechargeTitle}}</div>
        <div class="recharge-desc">{{ rechargeHead.rechargeDesc}}</div>
      </div>
      <div class="use-time">
        活动时间：{{rechargeHead.activityBeginTime}}-{{rechargeHead.activityEndTime}}
      </div>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
            }
        },
        props: ["rechargeHead"],
        computed: {
          userTel(){
            return this.$store.state.userInfo.tel;
          }
        },
        methods: {
          goBack(){
            let vm = this;
            location.href = vm.$config.routerList.home;

          }
        },
        watch: {},
        created() {
        }
    }

</script>
<style scoped lang="less">
  .recharge-head{
    width:100%;
    height:5.33rem;
    background-color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: url("~@/assets/recharge/tongy.png") no-repeat;
    background-size: 100% 100%;
    div{
      color:#FFFFFF;
    }
    .user-tel{
      margin-top:0.2rem;
      text-align: left;
      padding-left:0.2rem;
      display: flex;
      align-items: center;
      width: 100%;
      .go-back{
        width: 0.64rem;
        height: 0.64rem;
        background: url("~@/assets/recharge/go-back.png") no-repeat;
        background-size: 100% 100%;
        margin-right:0.32rem ;
      }
    }
    .recharge-msg{
      width:5.37rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .recharge-title{
        width:65%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.32rem;
        color:#d19f50;
        letter-spacing: 0.06rem;
        margin-top:0.3rem;
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
        margin-top:1.3rem;
        width:65%;
        height:0.46rem;
        line-height: 0.46rem;
        text-align: center;
        background: #d19f50;
        border-radius: 0.23rem;
        font-size: 0.25rem;
        color:#FFFFFF;
      }
    }
    .use-time{
      text-align: center;
      /*margin-bottom: 0.56rem;*/
      margin-top:1.2rem;
    }
  }
  .universal{
    background: url("~@/assets/mock/tongy.png") no-repeat;
    background-size: 100% 100%;
  }
  .orientation{
    background: url("~@/assets/mock/meiyij.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
