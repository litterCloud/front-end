<template>
    <div class="shop-header">
      <x-header :left-options="{showBack: true,backText:'',preventGoBack:true}" :title="header.title" @on-click-back="returnFn">
        <div slot="right" class="header-right">
          <div class="star-collection" @click="collectionFn">
            <x-icon v-if="showDefault" type="ios-star-outline" size="20"></x-icon>
            <x-icon v-if="!showDefault" type="ios-star" size="20"></x-icon>
          </div>
          <div class="send-share" @click="shareFn">分享</div>
        </div>
      </x-header>
    </div>
</template>
<script>
    export default {
        name:"shopHeader",
        components: {},
        data() {
            return {
              showDefault:true
            }
        },
        props: ["header"],
        computed: {},
        methods: {
          returnFn(){
            console.log("returnLink");
            this.$router.push(this.header.returnLink);
          },
          shareFn(){
            console.log("shareLink");
            // this.$router.push(this.header.shareLink);
          },
          collectionFn(){
            console.log("collectionLink");
            this.showDefault = !this.showDefault;
            // this.$router.push(this.header.collectionLink);
          }
        }
    }

</script>
<style scoped lang="less" type="text/less">
  .vux-x-icon {
    fill: #ff6525;
  }
  .shop-header{
    width:100%;
    .vux-header{
      background: #FFFFFF;
      /deep/.vux-header-left{
        a{
          color: #333333;
        }
      }
      /deep/.vux-header-title{
        color: #333333;
      }
    }
    .header-right{
      display: flex;
      .star-collection{
        margin-right:0.5rem;
      }
    }
  }
</style>
