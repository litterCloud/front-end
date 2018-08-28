<template>
  <div class="entry">
    <div class="entry-img">
      <img src="@/assets/rodRedPacket/entry.png">
    </div>
    <div class="entry-text">
      <img src="@/assets/rodRedPacket/text.png">
    </div>
    <div class="entry-btn">
      <div class="btn" @click.stop="goBack">返回</div>
    </div>
  </div>
</template>
<script>
  import config from '@/config/config.js'
  export default {
    components: {

    },
    data() {
      return {

      }
    },
    props: {},
    computed: {

    },
    methods: {
      goBack(){
        let vm = this;
        location.href = config.routerList.home;

      }

    },
    created() {

    }
  }
</script>
<style scoped lang="less">
  .entry{
    background-color: #fff;
  }
  .entry-img{
    width: 4.8rem;
    height: 4.9rem;
    margin: 0 auto;
    margin-top: 2rem;
    img{

      width: 100%;
      height: 100%;
    }
  }
  .entry-text{
    width: 2.82rem;
    height: 1.06rem;
    margin: 0 auto;
    margin-top: 0.5rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .entry-btn{
    margin-top: 0.26rem;
    .btn{
      background: url("~@/assets/rodRedPacket/entry-btn.png") no-repeat;
      background-size: 100% 100%;
      width: 3.4rem;
      height: 0.8rem;
      text-align: center;
      margin: 0 auto;
      font-size: 0.32rem;
      color: #fff;
      line-height: 0.8rem;

    }
  }


</style>
