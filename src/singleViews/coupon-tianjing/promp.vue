<template>
    <div class="promp">
      <div class="imgbox"><img  class="imginfo" src="../../assets/coupon/exclamationmark.png"/></div>
     <div class="promp-text">抱歉，电子券只能通过天津联通官方微信领取！</div>
      <div class="promp-tile" >
        <div class="parameterJumpTest" >长按关注后领取</div>
        <!--<a href="http://www.tjunicom.com/tjuwx/wopacket/redpacket.html">去公共号领取</a>-->
        <img class="qrcode" src="../../assets/coupon/qrcode.png"/>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    }},
  methods: {
    fun(){
      let vm=this
      let parameter=vm.$config.parameterJumpTest
        location.href=parameter
    }
  }
}</script>

<style scoped lang="less">
  .imgbox,.imginfo{
    width: 2rem;
    margin: 0 auto;
    margin-top: 1.4rem;
  }
    .promp-text{
      text-align: center;
      margin-top: 0.5rem;
    }
  .promp-tile{
    text-align: center;
    margin-top: 0.5rem;
  }
  .parameterJumpTest{
    /*color:rgb(85, 26, 139);*/
  }
  .qrcode{
    width: 5rem;
  }


</style>
