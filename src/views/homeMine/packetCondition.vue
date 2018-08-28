<template>
      <div class="container">
        <div class="img-box">
          <img :src="data.imgSrc" alt="">
          <span>{{data.text}}</span>
        </div>
        <div class="count-box" @click="jump">
          <span>{{data.count}}张</span>
          <img src="@/assets/home/go_gray.png" alt="">
        </div>
      </div>
</template>

<script>
  export default{
    props:{
      data:{
        type: Object
      },
      type:{}
    },
    data: function () {
      return {}
    },
    methods:{
      jump: function(){
        if(this.type == "use"){
          this.$router.push({path:"alreadyused"})
        }else if(this.type == "noUse"){
          this.$router.push({path:"noused"})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .container{
    height: 4.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666666;
    font-size: 1.4rem;
  }
  .img-box{
    display: flex;
    align-items: center;
  }
  .img-box img{
    height: 3rem;
    margin-right: .5rem;
  }
  .count-box{
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 1rem;
  }
  .count-box img{
    margin-left: .3rem;
    height: 1.5rem;
  }
  .count-box:active{
    background-color: #f9f9f9;
  }
</style>