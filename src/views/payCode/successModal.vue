<template>
  <div class="modal-box">
    <div class="modal-background"></div>
    <div class="modal-content">
      <img src="../../assets/icon/pay_tick.png" alt="" class="tick-icon">
      <div>消费成功!</div>
      <div class="money-box">核销金额：<span class="red-text">{{money}}</span>元</div>
      <div class="time-box">{{seconds}}秒后跳转到首页</div>
      <div class="btn" @click="jump">确定</div>
    </div>
  </div>
</template>

<script>
  export default{
    props:["money"],
    data: function () {
      return {
        seconds: 9,
        timer:""
      }
    },
    watch:{
      money: function(){
        var vm = this;
        if(vm.money){
          vm.countdown();
        }
      }
    },
    methods:{
      //倒计时
      countdown: function(){
        var vm = this;
        vm.timer = setInterval(function(){
          vm.seconds--;
          if(vm.seconds == 0){
            vm.jump();
          }
        },1000)
      },
      //跳转页面
      jump: function(){
        var vm = this;
        clearInterval(vm.timer);
        vm.$router.push("/");
      }
    }
  }
</script>

<style lang="less" scoped>
  .modal-box{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9999;
  }
  .modal-background{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
  }
  .modal-content{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 5rem;
    height: 5rem;
    margin-left: -2.5rem;
    margin-top: -2.5rem;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
  }
  .tick-icon{
    width: 1.3rem;
    display: block;
    margin: .4rem auto .2rem auto;
  }
  .money-box{
    margin-top: .2rem;
    font-size: .3rem;
  }
  .red-text{
    color: #DB4356;
  }
  .time-box{
    margin-top: .2rem;
  }
  .btn{
    margin: 0 auto;
    margin-top: .2rem;
    width: 2rem;
    height: .7rem;
    line-height: .7rem;
    background-color: #DB4356;
    border-radius: 5px;
    color: #fff;
    font-size: 0.35rem;
  }
</style>