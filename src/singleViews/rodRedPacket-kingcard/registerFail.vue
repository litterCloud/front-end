<template>
    <div>
        <img class="successImg" src="@/assets/rodRedPacket-kingcard/fail.png">
      <div class="submitSuccess">{{submitSuccess}}</div>
      <div class="submitSuccessNote">{{submitSuccessNote}}</div>
      <div class="btnsubmit" @click="btnsubmit">确认</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
          submitSuccess:"提交失败！",
          submitSuccessNote:"您输入的指导员信息与门店信息不符，请确认信息无误后提交！"
        }
    },
  props: ["sign"],
  methods:{
    btnsubmit(){
      let vm=this;
      console.log("失败按钮")
      console.log(vm.sign);

      vm.$emit("changeSign",{
        showDataway:true,
        showSuccess:false,
        showFail:false,
        storeId:vm.sign.storeId,
        provinceCode:vm.sign.provinceCode,
        qrcodeUrl:vm.sign.qrcodeUrl,
        uuId:vm.sign.uuId
      })
      console.log(vm.sign);
      let urldata=location.href;
      urldata=urldata.substring(0, urldata.indexOf('?'));
      location.href=urldata+"?provinceCode="+vm.sign.provinceCode+"&qrcodeUrl="+vm.sign.qrcodeUrl+'&UUID='+vm.sign.uuId;
    }
  }

}
</script>
<style scoped lang="less" type="text/less">
.successImg{
  width: 1.58rem;
  height: 1.58rem;
  margin: 0 auto;
  margin-top: 1.78rem;
}
.submitSuccess{
  font-size: 0.36rem;
  font-weight: 600;
  margin-top: 0.24rem;
}
  .submitSuccessNote{
    width: 3.64rem;
    margin: 0 auto;
    color: #666666;
    margin-top: 0.24rem;
  }
.btnsubmit{
  width: 6.07rem;
  height: 0.8rem;
  background: url("~@/assets/rodRedPacket-kingcard/btnsubmit.png") ;
  background-size: 100% 100%;
  margin: 0 auto;
  text-align: center;
  color: #df5645;
  line-height: 0.8rem;
  font-size: 0.32rem;
  font-weight: 600;
  margin-top: 0.18rem;
}

</style>
