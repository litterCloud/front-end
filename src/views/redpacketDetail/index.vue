<template>
    <div class="red-packet">
      <redPacketHead></redPacketHead>
      <myGift></myGift>
      <!--<red-activity :componentId="$config.redPacketActivityComponentId"></red-activity>-->
      <!--<div class="line-gray"></div>-->
      <redpacketCoupon  :componentId="124"></redpacketCoupon>
      <home-footer selected="person"></home-footer>
    </div>
</template>
<script>
  import redPacketHead from "./redPacketHead"
  import redpacketCoupon from "./redpacketCoupon"
  import redActivity from "./redActivity"
  import myGift from "./myGift"
  import homeFooter from '@/components/homeFooter'
    export default {
        components: {
          redPacketHead,
          redpacketCoupon,
          redActivity,
          homeFooter,
          myGift
        },
        data() {
            return {
            }
        },
        props: {},
        computed: {
          hasCoupon(){
            let total = Number(this.$store.state.userInfo.redPacket.total);
            return total>0
          }
        },
        methods: {
        },
        watch: {},
        created() {
        }
    }

</script>
<style scoped lang="less">
  .red-packet{
    padding-bottom:1.4rem;
    width: 100%;
    overflow-x: hidden;
    height: 100vh;
    overflow-y: auto;
    background: #F3F3F3;
  }
  .line-gray{
    width:100%;
    height:0.17rem;
    background: #F3F3F3;
  }
</style>
