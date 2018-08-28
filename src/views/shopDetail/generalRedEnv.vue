<template>
  <div class="red-env">
    <div class="left">
      <img :src="icon" @click="link" alt="">
    </div>
    <div class="right">
      <div class="right-t" v-for="item in activities">
        <div class="icon">{{item.benefitType}}</div>
        {{item.activityName}}
      </div>
      <!--<div class="right-t">-->
        <!--<div class="icon">减</div>-->
        <!--{{a}}-->
      <!--</div>-->
      <!--<div class="right-b">-->
        <!--<div class="icon">送</div>-->
        <!--{{b}}-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props:["componentId","storeDetail"],
    data:function () {
      return {
        activities:[]
      }
    },
    methods:{
      link:function () {
        location.href = "https://test1.unicompayment.com/couponH5/beforeLogin.jsp?channel=3&ticket=" + this.$route.query.ticket;
      }
    },
    watch:{
      storeDetail:function (newValue,oldValue) {
        var self = this;
        if(self.storeDetail.activities){
          for(var i = 0;i<self.storeDetail.activities.length;i++){
            self.storeDetail.activities[i].benefitType = self.$config.benefitType[self.storeDetail.activities[i].benefitType];
          }
          self.activities =self.storeDetail.activities;
        }
      }
    },
  }
</script>

<style scoped lang="less" type="text/less">
  .red-env {
    /*height: 1.28rem;*/
    padding: 0.09rem 0.31rem;
    display: flex;
    align-items: center;
    .left {
      img {
        max-height: 1.12rem;
      }
    }
    .right {
      font-size: 0.22rem;
      .right-t,
      .right-b {
        @height:0.32rem;
        height: @height;
        line-height: @height;
        display: flex;
        align-items: center;
      }
      .icon {
        @height:0.32rem;
        width: @height;
        height: @height;
        color: #fff;
        border-radius: 0.05rem;
        font-size: 0.18rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: 0 0.19rem 0 0.17rem;
      }
      .right-t .icon {
        background-color: #3767e1;
      }
      .right-b .icon {
        background-color: #fc9106;
      }
    }
  }
</style>
