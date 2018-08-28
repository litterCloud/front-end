<template>
  <div>
  <div class="enterDiv">
    <img class="enterDivimg" @click="returnhomepage" src="@/assets/recharge/go-back.png"/>
  </div>

  <div class="centerDiv">

    <register v-if="showDataway" @changeSign="changeSign" :sign="returnDate1"></register>
    <registerSuccess v-if="showSuccess" @changeSign="changeSign" :sign="returnDate1" ></registerSuccess>
    <registerFail v-if="showFail" @changeSign="changeSign" :sign="returnDate1"></registerFail>
    </div>
  </div>
</template>
<script>

  import register from "./register";
  import config from '@/config/config.js';
  import registerSuccess from './registerSuccess.vue';
  import registerFail from './registerFail.vue';
  export default {
    components: {
      register,
      registerSuccess,
      registerFail
    },
    data() {
      return {
        showDataway:true,
        showSuccess:false,
        showFail:false,

        returnpage:"",
        returnDate1:{
          storeId:"",
          provinceCode:"",
          qrcodeUrl:"",
          uuId:""
        },


      }
    },
    methods:{
      returnhomepage(){
        location.href="app.html"
      },
      changeSign(sign){
        console.log("改变")
        console.log(sign);
        let vm = this;
        vm.showDataway = sign.showDataway;
        vm.showSuccess=sign.showSuccess;
        vm.showFail=sign.showFail;
        vm.returnDate1.storeId=sign.storeId;
        vm.returnDate1.provinceCode=sign.provinceCode;
        vm.returnDate1.qrcodeUrl=sign.qrcodeUrl,
        vm.returnDate1.uuId=sign.uuId
      },
    }
  }
</script>
<style scoped lang="less">
    .enterDiv{
      background: url("~@/assets/rodRedPacket-kingcard/backgroundImg.png") ;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 100%;
      min-height:13.34rem;
      max-height: 24.36rem;
      position: fixed;
    }
    .enterDivimg{
      width: 0.64rem;
      height: 0.64rem;
      position: absolute;
      left: 0.3rem;
      top: 0.4rem;
    }
    .centerDiv{
      min-height: 8rem;
      background-color: #ffffff;
      position: absolute;
      top: 4.61rem;
      width: 6.71rem;
      left: 0.42rem;
      border-radius: 0.2rem;
      text-align: center;
      padding-bottom: 0.2rem;
    }
</style>
