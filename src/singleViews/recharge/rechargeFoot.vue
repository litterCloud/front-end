<template>
    <div class="recharge-foot">
      <div class="recharge-foot-title">
        活动规则
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
            }
        },
        props: ["rechargeFoot"],
        computed: {},
        methods: {},
        watch: {},
        created() {}
    }

</script>
<style scoped lang="less">
  .recharge-foot{
    width:100%;
    margin-top:0.78rem;
    padding:0 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .recharge-foot-title{
      width:100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .recharge-foot-title:before,.recharge-foot-title:after{
      content:"----------------------------------------------------------";
      white-space: nowrap;
      width:40%;
      display: inline-block;
      overflow: hidden;
    }
    .recharge-des-list{
      width:100%;
      padding:0.29rem 0;
      .msg-item{
        font-size: 0.25rem;
        line-height: 0.4rem;
      }
    }
  }
</style>
