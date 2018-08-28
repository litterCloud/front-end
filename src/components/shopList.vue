<template>
  <div class="shop-list">
      <div class="shop-item" v-for="i in shopList">
        <div class="shop-image">
            <div>
              <img :src="i.shopImg" alt="">
              <div class="shop-distance">
                <span>{{i.shopDiscount}}</span>
              </div>
            </div>
        </div>
        <div class="shop-base">
          <div class="shop">
            <div class="shop-msg">
              <div class="shop-name">{{i.shopName}}</div>
              <div class="shop-bus">
                <div class="bus-time">{{i.shopWorkTime}}</div>
                <div class="walk-time">{{i.walkNeedsTime}}</div>
              </div>
            </div>
            <div class="receive-discount">
              <button @click="toReceiveDiscount(i.linkTo)" >领取红包</button>
            </div>
          </div>
          <div class="shop-discount">
              {{i.discount}}
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name:"shopList",
    props:["shopList"],
    data(){
      return {}
    },
    methods:{
      toReceiveDiscount:function(link){
        this.$router.push(link);
      }
    }
  }
</script>
<style lang="less">
  .shop-item{
    width:97%;
    height:9.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin:1%;
    background: #ffffff;
    border-radius: 0.5rem;
    .shop-image{
      width:9rem;
      height:100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      color:#666666;
      font-size: 1rem;
      text-align: center;
      img{
        display: block;
        width:4.9rem;
        height:4.95rem;
      }
      .shop-distance{
        padding-top:1rem;
      }
      .shop-distance:before{
        content:"";
        width:1.1rem;
        height:1.1rem;
        display: inline-block;
        background: url("../assets/home/icon_location.png");
        background-size: 100% 100%;
      }

    }
    .shop-base{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-left: 0.3em;
      width:100%;
      .shop{
        display: flex;
        justify-content: space-between;
        border-bottom:1px dashed #E4E4E4;
        margin-right:0.5rem;
        padding-bottom:0.7rem;
        .shop-msg{
          width:100%;
          display: flex;
          flex-direction: column;
          .shop-name{
            color:#333333;
            font-weight: bold;
            line-height: 2em;
            font-size: 1.2rem;
          }
          .shop-bus{
            color: #999999;
            font-size: 1rem;
            display: flex;
            justify-content: flex-start;
            .bus-time:before{
              content:"";
              width:1.1rem;
              height:1.1rem;
              display: inline-block;
              background: url("../assets/home/bus_time.png");
              background-size: 100% 100%;
            }
            .walk-time:before{
              content:"";
              width:1.1rem;
              height:1.1rem;
              display: inline-block;
              background: url("../assets/home/walk_time.png");
              background-size: 100% 100%;
            }
            .walk-time{
              margin-left:1rem;
            }
          }
        }
        .receive-discount{
          button{
            width:7.7rem;
            height:2.6rem;
            line-height: 2.6rem;
            background: #FC6359;
            border:0;
            border-radius: 0.5rem;
            color:#ffffff;
            font-size:1.1rem;
          }
          button:focus{
            outline:0;
          }
        }
      }
      .shop-discount{
        height:3rem;
        line-height: 3rem;
        font-size: 1.1rem;
        color:#999999;
      }
      .shop-discount:before{
        content:"减";
        width:1.2rem;
        height:1.25rem;
        line-height: 1.25rem;
        color: #ffffff;
        text-align: center;
        display: inline-block;
        background: #FC6359;
        background-size: 100% 100%;
      }
    }
  }

</style>
