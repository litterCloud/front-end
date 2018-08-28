<template>
  <div class="my-gift">
    <div class="my-gift-window">
      <div class="gift">
        <div class="gift-icon"></div>
        <div class="gift-text">我的礼品卡</div>
      </div>
      <div class="go-gift" @click="goGift">
        <div class="go-gift-text">
          查看
        </div>
        <div class="go-gift-icon"></div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name:"myGift",
        components: {},
        data() {
            return {}
        },
        props: {},
        computed: {},
        methods: {
          goGift(){
            // location.href="ceshi.html"
            console.log("去收礼品啦")
          }
        },
        watch: {},
        created() {

        }
    }

</script>
<style scoped lang="less">
  .my-gift{
    width:100%;
    display: flex;
    justify-content: center;
    padding-top:0.2rem;
    background-color: white;
    .my-gift-window{
      width:7.02rem;
      height:0.88rem;
      background: url("~@/assets/redpacketDetail/gift.png") no-repeat;
      background-size: 100% 100%;
      color:#BBA756;
      font-size: 0.28rem;
      display: flex;
      justify-content: space-between;
      padding:0.24rem 0.32rem 0.24rem 0.36rem;
      .gift{
        display: flex;
        .gift-icon{
          width:0.4rem;
          height:0.38rem;
          background: url("~@/assets/redpacketDetail/gift-icon.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 0.16rem;
        }
      }
      .go-gift{
        display: flex;
        align-items: center;
        .go-gift-icon{
          margin-left:0.12rem;
          width:0.14rem;
          height:0.24rem;
          background: url("~@/assets/redpacketDetail/gift-go.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
