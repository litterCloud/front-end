<template>
    <div class="coupon-detail" >

      <div class="title">优惠券信息</div>
      <div class="coupon-content" :class="{'not-get':!sign, 'geting':sign}">
        <div class="rmb">
          <div class="rmb-sign">¥</div>
          <div class="money">{{couponDetail.money}}</div>
        </div>
        <div class="mony-right">
          <div>元</div>
          <!--<div>{{sign ? '已领取' :'优惠券'}}</div>-->
        </div>
        <div class="useway" >无门槛使用</div>
      </div>

      <!--<div class="coupon-middle">-->
        <!--<div class="middle-line">-->

        <!--</div>-->
        <!--&lt;!&ndash;<div class="middle-text">&ndash;&gt;-->
          <!--&lt;!&ndash;{{couponDetail.title}}&ndash;&gt;-->

        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</div>-->
      <div class="others">
        <!--<div class="coupon-time">-->
          <!--有效期  {{couponDetail.time}}-->
        <!--</div>-->
        <!--<div class="coupon-rule">-->
          <!--{{couponDetail.rule}}-->
        <!--</div>-->
        <div class="coupon-others">
          <div>优惠券包括：</div>
          <div v-for="(item,index) in couponDetail.timedetails">
           {{index+1}}、{{item.text}}
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "coupon",
        components: {},
        data() {
            return {}
        },
        props: ["sign","couponDetail"],
        computed: {},
        methods: {},
        watch: {},
        created() {

        }
    }
</script>

<style scoped lang="less">
  .not-get{
    background: url("../../assets/coupon/coupon1.png") no-repeat;
    color: #fdf6d0;
    .coupon-content{
      color: #fff6cc;
    }
    .coupon-middle{
      .middle-line{
        background-color: #b80000;
      }
      .middle-text{
        background-color: #ff3100;
      }
      color: #b80000;
    }
  }

  .geting{
    background: url("~@/assets/coupon/couponed1.png") no-repeat;
    color: #FFFFFF;
    .coupon-content{
      color: #fff;
    }
    .coupon-middle{
      .middle-line{
        background-color: #888;
      }
      .middle-text{
        background-color: #b3b3b3;
      }
      color: #888;
    }
  }
  .coupon-detail{
    margin-top: 0.47rem;
    min-height: 6rem;
    background-size: 100%;
    padding-left: 0.42rem;
    padding-right: 0.42rem;
    .title{
      font-size: 0.3rem;
      line-height: 0.3rem;
      border-left: 0.06rem solid #ff9000;
      padding-left: 0.08rem;
      margin-bottom: 0.16rem;
      font-weight: bold;
    }

    .coupon-content{
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
       padding-top: 0.6rem;
      height: 3.4rem;
      justify-content: center;
      width: 100%;
      background-size: cover;
      .rmb{
        display: flex;
        align-items: baseline;
        .rmb-sign{
          font-size: 0.58rem;
          padding-right: 0.1rem;
          line-height: 0.6rem;
        }
        .money{
          font-size: 0.8rem;
          line-height: 1.38rem;
          padding-right: 0.1rem;
          font-weight: 500;
        }
      }
      .mony-right{
        font-size: 0.8rem;
        line-height: 0.3rem;
        padding-top: 0.5rem;
      }

    }
    .coupon-middle{
      .middle-line{
        height: 1px;
        width: 66%;
        margin: 0 auto;
        margin-top: 0.04rem;
      }
      .middle-text{
        position: absolute;
        top: 0;
        left: 50%;
        margin: 0 auto;
        transform: translate(-50%);
        padding: 0 0.2rem;
        letter-spacing: 2px;
      }
      margin-top:0.16rem;
      text-align: center;
      font-size: 0.28rem;
      height: 0.28rem;
      display: flex;
      align-items: center;
      position: relative;
    }
    .others{
      font-size: 0.24rem;
      color: #666;
      line-height: 0.48rem;
      padding-bottom: 0.48rem;
      .coupon-others{
      }
    }
  }
  .useway{
    position: absolute;
    top: 2.8rem;
  }


</style>
