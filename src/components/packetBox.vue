<template>
  <div class="container">
    <img :src="data.promotionImageUrl" alt="" class="packet-img">
    <div>{{data.activityName}}</div>
    <div class="gray-text">{{data.activitySummery}}</div>
    <router-link :to="data.detailUrl"><div class="btn">{{data.activityGuideWords}}</div></router-link>
  </div>
</template>

<script>
  export default{
    props:{
      data:{
        type: Object
      }
    },
    data: function () {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  .container{
    width: 31%;
    height: 12rem;
    background-color: #fff;
    box-shadow: 0px 0px  1.5px 1.5px #ddd;
    padding-top: 1rem;
    font-size: 1.2rem;
  }
  .container div{
    text-align: center;
    overflow: hidden;
  }
  .packet-img{
    display: block;
    height: 3rem;
    margin: 0 auto;
    margin-bottom: .5rem;
  }
  .gray-text{
    color: #aaa;
    font-size: 1rem;
  }
  .btn{
    width: 65%;
    border: 1px solid #FC7A72;
    margin: 0 auto;
    border-radius: 1.2rem;
    margin-top: 1rem;
    color: #FC7A72;
    padding-top: .2rem;
    padding-bottom: .2rem;
    font-size: 1.1rem;
  }
  .btn:active{
    background-color: #ddd;
  }
</style>
