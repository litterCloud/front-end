<template>
  <div class="shop-city">
    <nearHead></nearHead>
    <nearActivity  :componentId="$config.homeActivityComponentId"></nearActivity>
    <div class="line"></div>
    <shop-city-list :componentId="1111" ></shop-city-list>
    <home-footer selected="home"></home-footer>
  </div>
</template>
<script>
  import homeFooter from '@/components/homeFooter'
  import shopCityList from "./shopCityList"
  import nearHead from "@/views/shopCity/nearHead"
  import nearActivity from "@/views/shopCity/nearActivity"
  export default {
    components:{
      homeFooter,
      shopCityList,
      nearHead,
      nearActivity
    },
    data(){
      return {
        activityList: [],
        ticket:""
      }
    },
    methods:{

    },
    created(){
      let vm = this;
      vm.ticket = vm.$route.query.ticket || "";
    }
  }
</script>
<style lang="less" scoped>
  .line{
    width: 100%;
    height: 0.12rem;
    background-color: #f3f3f3;
  }
  .shop-city{
    padding-bottom: 1.4rem;
    width: 100%;
    overflow-x: hidden;
    height: 100vh;
    overflow-y: auto;
  }
</style>
