<template>
  <div class="background">
    <div class="telphone">
      <span class="telphont-text">手机号：</span>
      <span class="telphoe-num">{{showTelphone}}</span>
    </div>
    <div class="code-container">
      <p class="state">仅用于支付时向收银员展示，请勿泄露以防诈骗</p>
      <canvas id="code-picture"></canvas>
      <h2 class="pay-code">{{payCode}}</h2>
    </div>
    <success-modal v-show="showModal" :money="money"></success-modal>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  import successModal from './successModal.vue'
  export default{
    components:{
      successModal
    },
    data: function () {
      return {
        //用户手机号
        telphone: "",
        //卷码
        payCode: "",
        //流水码
        randomCode: "",
        //轮询定时器
        timer: "",
        //销券金额
        money: "",
        //是否显示成功模态框
        showModal: false
      }
    },
    created: function(){
      var vm = this;
      //获取参数中的手机号和卷码
      if(!(vm.$route.query.telphone && vm.$route.query.rpCode)){
        vm.$router.push("/");
        return false;
      }
      vm.telphone = vm.$route.query.telphone;
      vm.payCode =  vm.$route.query.rpCode;
      vm.randomCode = vm.createRandom();
    },
    mounted: function(){
      //根据卷码，手机号，流水号生成二维码
      var vm = this;
      var canvas=document.getElementById('code-picture');
      var code = vm.telphone+","+vm.payCode+","+vm.randomCode;
      QRCode.toCanvas(canvas, code, function(error) {
        if(error){
          console.log(error)
        } else{
        }
      });
      //发起轮询，查看是否核销
      vm.query();
    },
    computed:{
      //用于展示的手机号，隐藏中间四位
      showTelphone: function(){
        var vm = this;
        if(vm.telphone){
          var telArr = vm.telphone.split("");
          telArr.splice(3,4,"****");
          var tel = telArr.join("");
          return tel;
        }
      }
    },
    methods:{
      //生成随机流水号
      createRandom: function(){
        var vm = this;
        var code = "GD"+new Date().getTime();
        for(var i=0;i<4;i++){
          var str = parseInt(Math.random()*10);
          code += str;
        }
        return code;
      },
      //发起轮询，查看核销状态
      query:function(){
        var vm = this;
        vm.timer = setInterval(function(){
          //轮询后台，查询是否销券
          vm.$bssAxios({
            url: vm.$util.getUrl("getUseResult"),
            data: {
              //api名称
              bodyAttributeName: "QRY_COUPONS_USE_RESULT_REQ",
          /*    //组织机构号
              mechanismCode: "9930",*/
              //用户手机号
              accNbr: vm.telphone,
              //销券流水号
              wrioffSn: vm.randomCode
            }
          }).then(function(resData){
            if(resData.wrioffStatus ==1){
              clearInterval(vm.timer);
              vm.money = resData.wrioffFee;
              vm.showModal = true
            }
          }).catch(function(error){
            if(error.data.respCode != "102002"){
              vm.$vux.toast.text('查询失败');
            }
          })
        },1000)
      }
    },
    destroyed:function () {
      var vm = this;
      clearInterval(vm.timer);
    }
  }
</script>

<style lang="less" scoped>
  .background{
    padding-top: 1.3rem;
    width: 100%;
    min-height: 100vh;
    background-color: #DB4457;
  }
  .telphone{
    width: 90%;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0.3rem;
  }
  .telphont-text{
    font-size: 0.32rem;
    font-weight: bold;
  }
  .telphoe-num{
    font-size: 0.32rem;
    font-weight: bold;
    color: #DB4356;
  }
  .code-container{
    width: 90%;
    background-color: #fff;
    margin: 0.6rem auto 0 auto;
    padding-top: 0.2rem;
    padding-bottom: 0.4rem;
    border: 5px solid #C22B3E;
    text-align: center;
  }
  .state{
    font-size: 0.24rem;
    color: #DD5364;
    font-weight: bold;
  }
  #code-picture{
    width: 4.5rem !important;
    height: 4rem !important;
    margin: 0.4rem auto 0 auto;
  }
  .pay-code{
    margin-top: 0.15rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
