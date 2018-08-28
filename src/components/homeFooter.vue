<template>
  <div class="home-foot">
    <div class="foot-bar">
      <div class="nav-item" :class="{'is-selected': selected=='home'}" @click="toPage('/')">
          <div class="navIcon">
            <img v-if="selected=='home'" src="@/assets/icon/home-active.png" alt="">
            <img v-else="" src="@/assets/icon/home-gray.png" alt="">
          </div>
          <div class="nav-title">
            首页
          </div>
      </div>
      <div class="nav-item" @click="toOtherPage" touchId="TOUCH_CODE_008">
        <div class="pay-title"></div>
      </div>
      <div class="nav-item"  :class="{'is-selected': selected=='person'}" @click="toPage('redpacketDetail')" touchId="TOUCH_CODE_009" pageCode="PAGE_CODE_004">
          <div class="navIcon">
            <img v-if="selected=='person'" src="@/assets/icon/person-active.png" alt="">
            <img v-else="" src="@/assets/icon/person-gray.png" alt="">
          </div>
          <div class="nav-title">
            我的
          </div>
      </div>

    </div>
    <!-- <realNameAuthentication v-if="Authentication"  @hasLoginchange="hasLoginchange"></realNameAuthentication> -->
  </div>
</template>
<script>
  // import realNameAuthentication from '@/components/realNameAuthentication'
  export default {
    props: {
      selected:{  //含有两个值  home shop person
        type: String,
        required: true,
      }
    },
    components:{
      // realNameAuthentication
    },
    data(){
      return {
        // Authentication:false,
      }
    },
    computed:{
    },
    methods:{
      // hasLoginchange(data){
      //   let vm=this;
      //   vm.Authentication=data;
      // },
      toPage(link){
        this.$router.push(link);
      },
      toOtherPage(){
        let vm=this;
        // vm.Authentication=true;

//        let vm =this;
//        if(vm.$util.getData("userFrom") == 1){
//          //手厅进入
//          location.href = "http://m.client.10010.com/mobileService/openPlatform/openPlatLine.htm?to_url=https://redpacket.ohaotian.cn/paytest/PayServlet"
//
//        }else{
//          //非手厅进入
//          location.href = "https://cellphonefront.unicompayment.com:55363/couponH5/beforeLogin.jsp?channel=LTDZ225&modelId=001";
//
//        }
      }
    },
    created(){

    }
  }

</script>
<style scoped lang="less">
  .home-foot{
    display: flex;
    justify-content: space-between;
    position: fixed;
    z-index: 99;
    bottom: 0;
    width:100%;
    background-color: transparent;
    .foot-bar{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      background: url("~@/assets/icon/foot-bg.png") no-repeat;
      background-size: 100% 100%;
      width:100%;
      height:1.56rem;
      .nav-item{
        width:50%;
        height:100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color:#040404;
        .navIcon{
          width:0.44rem;
          height:0.44rem;
          margin-top:0.6rem;
          img{
            width:100%;
            height:100%;
          }
        }
        .nav-title{
          font-size: 0.18rem;
        }
        .pay-title{
          height:1.2rem;
          width:1.2rem;
          background: url("~@/assets/icon/foot-to-pay.png") no-repeat;
          background-size: 100% 100%;
          justify-content: center;
          align-items: center;
          display: flex;
          position: relative;
          z-index: 2;
          margin:0.12rem;
          margin-left:0.14rem;
        }
      }
      .is-selected{
        color:#e66e58;
      }
    }

  }
  .footerspan{
    color: #666;
  }
  .footerspan.active{
    color: #FF5547;
  }
</style>
