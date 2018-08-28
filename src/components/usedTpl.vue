

<template>
  <div class="container">
    <div class="red-packed">
      <div class="red-packed-top">
        <div class="r-p-t-left">
          <img v-bind:src='icon'>
        </div>
        <div class="r-p-t-right">
          <div class="r-p-t-r-top">
            <div>{{name}}</div>
          </div>
          <div class="r-p-t-r-bottom">
            <div>促销装{{price}}元代金券</div>
            <div>已使用</div>
          </div>
        </div>
      </div>
      <div class="red-packed-bottom">有效期：  {{time}}</div>
    </div>
  </div>
</template>

<script>
  export default{
    props:['icon','name','price','distance','time'],
    data: function () {
      return {}
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .container {
    width: 100%;
    height: 11.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .red-packed {
      width: 94%;
      height: 10.5rem;
      background: url("../assets/home/u1276.png");
      background-size: 100% 100%;
      margin-top: 0.7rem;
      padding-top: 1rem;
      .red-packed-top {
        height: 6.8rem;
        display: flex;
        .r-p-t-left {
          width: 15%;
          height: 100%;
          display: flex;
          justify-content: center;
          img {
            width: 3.3rem;
            height: 3.3rem;
            margin-top: 0.4rem;
          }
        }
        .r-p-t-right {
          width: 85%;
          height: 5rem;
          margin-left: 2%;
          margin-right: 4%;
          @topHeight: 2.4rem;
          .r-p-t-r-top {
            width: 100%;
            height: @topHeight;
            line-height: @topHeight;
            font-size: 1.2rem;
            color: #848281;
          }
          @bottomHeight: 2.9rem;
          .r-p-t-r-bottom {
            height:@bottomHeight;
            line-height: @bottomHeight;
            font-size: 1.7rem;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color: #808080;
            div:first-child {
              height: 100%;
              width: 50%;
            }
            div:last-child {
              height: 100%;
              width: 50%;
              text-align: right;
            }
          }
        }
      }
      @height: 2.7rem;
      .red-packed-bottom {
        height: @height;
        line-height: @height;
        margin-left: 3.7%;
        font-size: 1.1rem;
        color: #857d7c;
        text-align: right;
        padding-right: 4%;
      }
    }
  }

</style>
