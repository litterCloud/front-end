<template>
    <div class="near-head">
      <div class="position-row" @click="goToCityList">
        <div class="position-icon"></div>
        <div class="position-address">{{positionAddress}}</div>
        <div class="position-arrowd"></div>
      </div>
      <div class="login-row">
        <div v-if="!loginState" class="no-login">
          <button class="to-login" @click="toLogin">登录</button>
        </div>
        <div v-if="loginState" class="has-login">
          <div class="user-tel">
            <div class="tel-icon"></div>
            <div class="tel">{{phoneNum | phoneFormatEncryption}}</div>
          </div>
          <div class="redpacket-total">
            <div class="redpacket-desc">红包总金额(元)</div>
            <div class="redpacket-count">
              <span>{{String(radpackTotal).split('.')[0]}}<span class="small-num" v-if="radpackTotal.toString().indexOf('.') != -1">.{{String(radpackTotal).split('.')[1]}}</span></span>
            </div>
          </div>
          <div class="redpack-detail" @click="toRedPacket" touchId="TOUCH_CODE_001" pageCode="PAGE_CODE_004">
            <span>红包明细</span>
            <div class="red-arrow"></div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {getReadPacketMoney} from '@/api/methods'
  export default {
        components: {},
        name:"nearHead",
        data() {
            return {

            }
        },
        props: ["componentId"],
        computed: {
          loginState(){
            return this.$store.state.userInfo.tel ? true : false;
          },
          radpackTotal(){
            return this.$store.state.userInfo.redPacket.total;
          },
          phoneNum(){
            return this.$store.state.userInfo.tel;
          },
          positionAddress(){
            return this.$store.state.handleAddress.address || this.$store.state.handleAddress.city || this.$store.state.position.address ||  this.$store.state.IpPosition.name || "没定位成功哟~";
          }
        },
        methods: {
          getReadPacketMoney,
          toRedPacket(){
            this.$router.push("redpacketDetail");
          },
          toLogin(){
            this.$login();
          },
          goToCityList(){
            this.$router.push("cityList");
          }
        },
        watch: {
          phoneNum: {
            handler: function (newVal, oldVal) {
              let vm = this;
              if (newVal) {
                vm.getReadPacketMoney(newVal);
              }
            },
            immediate: true
          }
        },
        created() {

        }
    }

</script>
<style scoped lang="less">
  .near-head{
    // position: fixed;
    z-index: 88;
    top: 0;
    left: 0;
    width:100%;
    background: #F3F3F3;
    display: flex;
    flex-direction: column;
    align-items: center;
    .position-row{
      width:100%;
      display: flex;
      align-items: center;
      padding:0.12rem 0.24rem 0.16rem 0.24rem;
      .position-icon{
        height:0.32rem;
        width:0.24rem;
        background: url("~@/assets/home/position-icon.png") no-repeat;
        background-size: 100% 100%;
      }
      .position-address{
        padding-left:0.08rem;
        font-size: 0.24rem;
        color:#999999;
      }
      .position-arrowd{
        margin-left:0.12rem;
        width:0.14rem;
        height:0.24rem;
        background: url("~@/assets/home/icon-right.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .login-row{
      display: flex;
      align-items: center;
      justify-content: center;
      width:7.02rem;
      height:2.54rem;
      background:url("~@/assets/home/head-bg.png") no-repeat;
      background-size: 100% 100%;
      .no-login{
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .to-login{
          width:1.78rem;
          height:0.6rem;
          border-radius: 0.3rem;
          border:1px solid #FFFFFF;
          font-size: 0.28rem;
          line-height: 0.6rem;
          background: transparent;
          color:#FFFFFF;
        }
      }
      .has-login{
        width:100%;
        height:100%;
        padding:0.32rem 0 0 0.32rem;
        font-size: 0.24rem;
        color:#FFFFFF;
        position: relative;
        .user-tel{
          height:0.48rem;
          display: flex;
          .tel-icon{
            width:0.48rem;
            background: url("~@/assets/home/tel-icon.png") no-repeat;
            background-size: 100% 100%;
          }
          .tel{
            margin-left:0.12rem;
            padding:0.12rem 0;
          }
        }
        .redpacket-total{
          margin-top: 0.28rem;
          .redpacket-count{
            font-size: 0.8rem;
            .small-num{
              font-size: 0.4rem;
            }
          }
        }
        .redpack-detail{
          position:absolute;
          right:0;
          top:50%;
          display: flex;
          align-items: center;
          width:1.56rem;
          padding:0.15rem 0;
          padding-left:0.24rem;
          background: rgba(0,0,0,0.2);
          border-radius: 1rem 0 0 1rem;
          .red-arrow{
            margin:0 0.1rem;
            width:0.14rem;
            height:0.22rem;
            background:url("~@/assets/home/red-arrow.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }


  }

</style>
