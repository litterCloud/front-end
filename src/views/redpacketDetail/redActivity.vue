<template>
    <div class="redpacket-activity" @click="limitGo">
      <img :src="redActivityPath" alt="">
    </div>
</template>
<script>
  import {filterActivityUrl} from '@/api/methods.js'
    export default {
        name:"redctivity",
        components: {},
        data() {
            return {
              redActivityLink:"",
              redActivityPath:""
            }
        },
        props: ["componentId"],
        computed: {
          queryActivity(){
            let vm = this;
            return {
              city:vm.$store.state.handleAddress.city || this.$store.state.position.city || vm.$store.state.IpPosition.name,
              touchSpotType:vm.$config.touchSpotType,
              componentId:vm.componentId
            }
          },
          userPosition(){
            let vm = this;
            return vm.$store.state.handleAddress.city || this.$store.state.position.city || vm.$store.state.IpPosition.name;
          }
        },
        methods: {
          filterActivityUrl,
          limitGo(){
            let vm = this;
            if(vm.redActivityLink){
              location.href = vm.filterActivityUrl(vm.redActivityLink);

            }else{
              console.log("无路径跳转")
            }

          },
          loadActivity(){
            let vm = this;
            vm.$util.getCacheOrAjaxData(vm.queryActivity.city+vm.queryActivity.componentId,vm.$util.getUrl("getActivity"),vm.queryActivity)
            .then(function(returnData){
              var data = returnData["activityList"][0];
              vm.redActivityPath = data["promotionImageUrl"];
              vm.redActivityLink = data["detailUrl"];
            })
              .catch(function(returnData){
              console.log("活动图片获取失败");
            })
          }
        },
        watch: {
          userPosition:{
            handler(val,oldVal){
              let vm = this;
              if(val){
                vm.loadActivity();
              }
            },
            immediate:true,
            deep:true
          }
        },
        created() {

        }
    }

</script>
<style scoped lang="less">
  .redpacket-activity{
    padding:0.17rem 0.19rem 0.19rem 0.21rem;
    height:1.87rem;
    img{
      width:100%;
      height:100%;
    }
  }
</style>
