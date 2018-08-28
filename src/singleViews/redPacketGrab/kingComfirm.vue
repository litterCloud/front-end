<template>
    <div class="king-redpacket">
      <div class="king-item" v-for="(v,i) in list" :key="i">
        <div class="king-count">
          <div class="count-icon">￥</div>
          <div class="count">{{v.count}}</div>
        </div>
        <div class="king-desc">
          {{v.desc}}
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        components: {},
        props:{
          list:{
            type:Array,
            default:[]
          }
        },
        data() {
            return {}
        },
        created() {}
    }

</script>
<style scoped lang="less">
  .king-redpacket{
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    .king-item{
      width:2.2rem;
      height:1.39rem;
      background: url("~@/assets/redpacketGrab/kingRecharge-bg.png") no-repeat;
      background-size: 100% 100%;
      margin:0 0.04rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .king-count{
        display: flex;
        flex-flow: row;
        align-items: flex-start;
        justify-content: center;
        margin-top: 0.04rem;

        .count-icon{
          font-size: 0.33rem;
        }
        .count{
          font-size: 0.64rem;
          line-height: 0.64rem;
        }

      }
      .king-desc{
        font-size: 0.18rem;
        height: 0.4rem;
        line-height: 0.2rem;
        padding: 0 0.14rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
