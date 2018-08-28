<template>
    <div>
        <img class="successImg" src="@/assets/rodRedPacket-kingcard/success.png">
      <div class="submitSuccess">{{submitSuccess}}</div>
      <div class="submitSuccessNote">{{submitSuccessNote}}</div>
      <div class="btnsubmit" @click="btnsubmit(sign)">确认</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
          submitSuccess:"提交成功！",
          submitSuccessNote:"您提交的信息已审核通过！ 活动期所有赏金红包均会发放 至店员号码的红包账户"
        }
    },
  props: ["sign"],
  methods:{
    btnsubmit(){
      console.log("提交成功")
      let vm=this;
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
