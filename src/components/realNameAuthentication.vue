<template>
    <div class="modal" v-if="show">
      <div class="gray"></div>
      <div class="box">
        <img class="closeBtn" @click="closeFn" src="@/assets/nameAuthentication/closeBtn.png"/>
        <div class="center-box3">
          <img  class="logoPeople" src="@/assets/nameAuthentication/realNameAuthentication.png"/>
          <p class="ceterTitle">【实名认证】</p>
          <p class="ceterNav">您的红包支付由联通沃支付提供技术支持！</p>
          <p class="ceterNav1">  为保障您的合法权益，根据中国人民银行《条码支付业务规范（试行）》要求，请登记实名信息。</p>
          <div class="button" @click="toOtherPage">确定</div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
          msg: 'hello vue',
          show:true
        }
    },
  components: {

  },
  methods:{
    toOtherPage(){
        let vm =this;
        if(vm.$util.getData("userFrom") == 1){
          //手厅进入
          location.href = "http://m.client.10010.com/mobileService/openPlatform/openPlatLine.htm?to_url=https://redpacket.ohaotian.cn/paytest/PayServlet"
        }else{
          //非手厅进入
          location.href = "https://cellphonefront.unicompayment.com:55363/couponH5/beforeLogin.jsp?channel=LTDZ225&modelId=001";

        }
    },
    closeFn(){
     let vm=this;
     vm.show=false;
      vm.$emit("hasLoginchange", false);
    }
  }
}</script>
<style scoped lang="less">
  .modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .gray{
    width: 100%;
    height: 100%;
    opacity: .6;
    background-color: #4c4c4c;
  }
.box{
  width: 6.11rem;
  padding-bottom: 0.2rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 0.2rem;
}
.logoPeople{
  width: 2.26rem;
  height: 2.06rem;
}
  .center-box3{
    text-align: center;
    margin-top: 0.5rem;
  }
  .ceterTitle{
    font-weight: bold;
    padding: 0.3rem 0 0.3rem 0;
    font-size: 0.32rem;
  }
  .ceterNav{
    font-size: 0.24rem;
    width: 94%;
    margin: 0 auto;
  }
  .ceterNav1{
    font-size:0.24rem ;
    text-align: left;
    padding-bottom: 0.4rem;
    width: 5.35rem;
    margin: 0 auto;
  }
  .button{
    border:0.03rem solid #eb5145;
    color: #eb5145;
    width: 3.24rem;
    height: 0.68rem;
    margin: 0 auto;
    border-radius: 4rem;
    line-height: 0.68rem;
  }
  .closeBtn{
    width: 0.68rem;
    height: 0.68rem;
    position: absolute;
    top: -1rem;
    right: 0rem;
  }
</style>
