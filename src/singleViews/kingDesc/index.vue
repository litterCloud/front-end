<template>
  <div class="king-desc" :class="{'disable-scroll':showRule}">
    <img class="enterDivimg" @click="returnhomepage" src="@/assets/recharge/go-back.png"/>
    <div class="activity-intro">
      <div class="intro-item" v-for="(v,i) in introList" v-html>
        {{v }}
      </div>
      <div class="get-now" @click="showDetail">{{btnText}}</div>
    </div>
    <div class="float-window" @click="kingJump"></div>
    <img src="@/assets/kingDesc/kingDesc.png" alt="">
    <div v-if="showRule" class="activity-rule">
      <div class="close-rule">
        <div class="close" @click.stop="closeRuleFn"></div>
      </div>
      <div class="rule-window" >
        <div class="rule-window-title">活动规则</div>
        <div v-for="item in introExtraList" class="rule-window-nav">
          {{item | replaceSpace}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data() {
      return {
        showRule:false,
        urldata:"",
        btnText:'详细规则>>',
        introList:['活动时间：8月16日至9月16日。','活动内容：在活动期间消费者在美宜佳领取王卡激活，并在激活3天内一次性充值50元及以上，即得188元活动大礼包：含话费本金、70元赠送话费、10元美宜佳无门槛红包和58元美宜佳优惠券礼包；','到账方式：充值本金立即到账，赠送话费24h内完成赠送到账；红包24h内到账开户号码沃钱包，180天内使用有效；优惠券领取方式将以短信形式通知；'],
        introExtraList:['1、活动时间：8月16日至9月16日。','2、活动内容：在活动期间消费者在美宜佳领取王卡激活，并在激活3天内一次性充值50元及以上，即得188元活动大礼包：含话费本金、70元赠送话费、10元美宜佳无门槛红包和58元美宜佳优惠券礼包；','3、到账方式：充值本金立即到账，赠送话费24h内完成赠送到账；红包24h内到账开户号码沃钱包，180天内使用有效；优惠券领取方式将以短信形式通知；','4、充值渠道：限手机营业厅、微信、淘宝等渠道自助充值，营业前台话费收取、话费托收与积分兑换充值不参与活动；','5、活动用户：活动期间美宜佳门店新开王卡用户；','6、互斥条件：与现有维系挽留政策不互斥。活动有效期内，每个用户仅可参与一次；','7、其他说明：10元美宜佳无门槛红包：是联通赠送的美宜佳定向红包；58元美宜佳优惠券：是美宜佳给用户的优惠券，需通过美宜佳公众号领取，券的领取与核销与联通没有实质联系；','8、实名认证说明：本活动发放红包核销使用由联通沃支付公司提供技术支持，通过沃支付完成扫码支付流程完成核销。', '&nbsp;依循中国人民银行关于印发《条码支付业务规范（试行）》的通知要求，符合相关客户实名制管理规定，依法维护客户合法权益，本活动所得红包核销，需先完成用户实名认证；', '&nbsp;因非实名导致用户无法使用红包的，视同用户自动放弃红包资格;若享受红包优惠的交易发生全额退款，仅退还实际支付的金额(不包含红包金额)，已享红包优惠资格不再补偿;','9、如用户出现违规行为(如虚假交易、作弊、恶意套取现、刷信等)，活动方有权回收您已经获得的优惠金额(包括已消费金额);','10、活动最终解释权归中国联通广东省分公司所有。']
      }
    },
    props: {},
    computed: {
    },
    watch: {
    },
    methods: {
      kingJump(){
        location.href = 'rechargeKing.html?id=300002&province=51';
      },
      closeRuleFn(){
        let vm = this;
        vm.showRule = false;
      },
      showDetail(){
        let vm = this;
        vm.showRule = true;
      },
      returnhomepage(){
        let vm=this;
        console.log(vm.urldata)
        location.href=vm.urldata;
      }
    },
    created() {
      let vm=this;
      let urldata= vm.$util.getAllQueryString();
      console.log(urldata);
      vm.urldata=urldata.urlnav+"?UUID="+urldata.UUID;
    }
  }
</script>
<style scoped lang="less">
  .disable-scroll{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .king-desc{
    img{
      width:100%;
      height:100%;
    }
    .enterDivimg{
      width: 0.64rem;
      height: 0.64rem;
      position: absolute;
      left: 0.3rem;
      top: 0.4rem;
    }
    .activity-intro{
      position: absolute;
      color: #FFFFFF;
      font-size: 0.24rem;
      padding: 0.16rem 0.44rem;
      top: 6rem;
      .intro-item{
        line-height: 0.28rem;
        margin:0.12rem 0;
      }
      .get-now{
        position: absolute;
        right: 0.44rem;
        bottom: 0.2rem;
        color: #ffff00;
      }
    }
    .float-window{
      width:1.2rem;
      height:1.2rem;
      background: url("~@/assets/kingDesc/float-window.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right:0.34rem;
      top:8.93rem;
    }
    .activity-rule{
      position:absolute;
      top:0;
      right:0;
      bottom:0;
      left:0;
      background: rgba(0,0,0,0.5);
      /*display: flex;*/
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items:center;
      -webkit-align-items: center;
      flex-direction: column;
      /*align-items: center;*/
      /*justify-content: center;*/
      z-index: 950120;
      .close-rule{
        width:85%;
        text-align: right;
        margin-bottom:0.2rem;
        .close{
          display: inline-block;
          width:0.6rem;
          height:0.6rem;
          border-radius: 50%;
          border:2px solid #FFFFFF;
          /*display: flex;*/
          /*align-items: center;*/
          /*justify-content: center;*/
          position: relative;
        }
        .close:before{
          content: '';

          position: absolute;
          top:45%;
          left:4px;
          width: 0.4rem;
          height: 2px;
          background-color: #FFFFFF;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);

        }
        .close:after{
          content: '';
          position: absolute;
          top:45%;
          left:4px;
          width: 0.4rem;
          height: 2px;
          background-color: #FFFFFF;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
      }
      .rule-window{
        width:6.42rem;
        height:8.16rem;
        border-radius: 0.2rem;
        background: #ffffff;
        color:#333333;
        overflow-y: auto;
        .rule-window-nav{
          font-size: 0.2rem;
          line-height: 0.6rem;
          padding: 0 0.3rem 0 0.3rem;
        }
        .rule-window-title{
          text-align: center;
          font-size: 0.4rem;
          font-weight: 600;
          padding-bottom: 0.3rem;
          padding-top: 0.3rem;
        }
      }
    }
  }
</style>
