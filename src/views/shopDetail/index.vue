<template>
  <div class="container" :class="{'no-scroll':scrollNot}">
    <shop-info v-bind="{componentId:123,storeDetail}" @showImgFn="scollDisabled"></shop-info>
    <store-discount v-bind="{componentId:789,benefitGoods,cooperateActivities}"></store-discount>
    <!-- <home-footer selected="home"></home-footer> -->
  </div>
</template>
<script>
  import shopInfo from './shopInfo';
  import storeDiscount from './storeDiscount';
  import homeFooter from '@/components/homeFooter'
  export default {
    components:{
      shopInfo,
      storeDiscount,
      homeFooter
    },
    name: "",
    data:function () {
      return {
        storeDetail:{
          money:0
        },
        benefitGoods:[],
        cooperateActivities:[]
      }
    },
    created:function () {
      var vm = this;
      var data = {
        storeId:vm.$route.query.storeId,
        merchantId:vm.$route.query.merchantId,
        touchSpotType:vm.$config.touchSpotType,
        storeDetailComponentId:vm.$config.storeDetailComponentId,
        benefitGoodsComponentId:vm.$config.benefitGoodsComponentId,
        cooperateActivitiesComponentId:vm.$config.cooperateActivitiesComponentId
      };
      vm.$axios.post(vm.$util.getUrl("shopDetail"),data).then(function (res) {
        vm.storeDetail = res.storeDetail;
        vm.benefitGoods = res.benefitGoods;
        vm.cooperateActivities = res.cooperateActivities;
        //获取可使用余额
        return vm.$bssAxios.post(vm.$util.getUrl("shopDetailRedPack"),
                {
                  bodyAttributeName:"QRY_USER_COUPONS_VIEW_REQ",
                  "accNbr":vm.$store.state.userInfo.tel,
                  "merchantId":vm.storeDetail.merchantCode,
                  "mechanismCode":"9940",
                  "rpType":"99"
                })
      }).then(function (res) {
        // console.log(res);
        let money =  (Number(res.assAvaiFee || "") + Number(res.comAvaiFee || "")).toFixed(2)+"";
        vm.$set(vm.storeDetail,"money",money || "")


      }).catch(function (err) {
        vm.$set(vm.storeDetail,"money",0)

        console.log(err);
        /*vm.$vux.toast.show({
          "type":"text",
          "position":"middle",
          "text": err.respDesc || "请求失败",
          "is-show-mask":true
        })*/
      });
    },
    methods:{
      scollDisabled(flag){
        let vm = this;
        vm.scrollNot = flag;
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  /*@font-face {*/
    /*font-family: pictos;*/
    /*src:url('HYQiHeiX1-55W.ttf')*/
  /*}*/
  /*.container {*/
    /*font-family: pictos;*/
  /*}*/
  .gray {
    height: 0.26rem;
    background: #f3f3f3;
  }
  .container{
    padding-bottom: 1.5rem;
    position:absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    overflow-y: auto;
  }
  .no-scroll{
    overflow-y: hidden;
  }
</style>
