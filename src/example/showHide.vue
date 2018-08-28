<template>
    <div>
      <show-hide :defaultNum="2" v-model="isShow" @active="activeFn">
        <div slot="item" class="activity-item" v-for="j in activity">
          <div class="activity-type" :style="{backgroundColor:j.typeColor}">{{j.type}}</div>
          <div class="activity-title" v-html="j.title"></div>
        </div>
、      </show-hide>
      <div class="line" @click="clickFn"></div>
      <show-hide :defaultNum="1"  @active="activeFn">
        <div slot="item" class="activity-item" v-for="j in activity">
          <div class="activity-type" :style="{backgroundColor:j.typeColor}">{{j.type}}</div>
          <div class="activity-title" v-html="j.title"></div>
        </div>
        <span slot="total">蠢喵</span>
      </show-hide>
    </div>
</template>
<script>
    import ShowHide from "@/components/showHide.vue";
    export default {
        components: {ShowHide},
        data() {
            return {
              activity:[
                {title:"生喵片特价<span style='color: red'>仅1元</span>（原价800元）",type:"减",typeColor:"red"},
                {title:"充值<span style='color: blue'>20元</span>送<span style='color: green'>生喵片</span>红包",type:"送",typeColor:"green"},
                {title:"生喵片特价<span style='color: red'>仅1元</span>（原价800元）",type:"减",typeColor:"red"},
                {title:"充值<span style='color: blue'>20元</span>送<span style='color: green'>生喵片</span>红包",type:"送",typeColor:"green"}

              ],
              isShow:false
            }
        },
        props: {},
        computed: {},
        methods: {
          activeFn(active){
            console.log("active事件","是否是展开的",active);
          },
          clickFn(){
            this.activity = [
              {title:"xxx特价<span style='color: red'>仅1元</span>（原价800元）",type:"减",typeColor:"red"}

            ]
          }
        },
        watch: {
          isShow(val){
            console.log("v-model属性","是否是展开的",val);
          }
        },
        created() {

        }
    }

</script>
<style scoped lang="less">
  .activity-item{
    display: flex;
    padding-top: 0.1rem;
    .activity-type{
      width: 0.24rem;
      font-size: 0.18rem;
      line-height: 0.24rem;
      background-color: #3767e1;
      border-radius: 2px;
      color: #fff;
      text-align: center;
    }
    .activity-title{
      font-size: 0.2rem;
      line-height: 0.24rem;
      padding-left: 0.2rem;
      color: #454545;
    }

  }
  .line{
    background-color: red;
    height: 0.5rem;
  }
</style>
