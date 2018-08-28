<template>
    <div class="packet-box">
      <img src="@/assets/home/bg_tree1.png" alt="" class="tree1">
      <img src="@/assets/home/bg_tree2.png" alt="" class="tree2">
      <div class="packet-contet">
        <packet-box :data="item" v-for="(item,index) in system" :key="item.id"></packet-box>
      </div>
    </div>
</template>

<script>
  import packetBox from '@/components/packetBox'
  export default{
    data: function () {
      return {
        system:[

        ]
      }
    },
    props:{
      url:{
        type: String,
        default: "centerList"
      },
      componentid:{
        type: Number,
        default: 123
      }
    },
    computed:{
      city(){
        return this.$store.state.IpPosition.name
      }
    },
    watch:{
      city:{
        handler:function (val,oldVal) {
          let vm = this;
          if(val){
            vm.getList();
          }
        },
        immediate: true
      }
    },
    methods:{
      getList(){
        let vm = this;
        vm.$util.getCacheOrAjaxData(vm.url+vm.componentid,vm.$util.getUrl(vm.url),{
          "city":vm.city,
          "src":"01",
          "componentId":vm.componentid,
        }).then(function (data) {
          vm.system = vm.$util.setKey(data.rows,"id")
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    components:{
      packetBox
    }
  }
</script>

<style lang="less" scoped>
  /**********顶部红包部分的样式*************/
  .packet-box{
    position: relative;
    padding-top: 1rem;
    height: 14rem;
  }
  .packet-contet{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .tree1{
    position: absolute;
    height: 8rem;
    z-index: 9999;
    left: -0.6rem;
  }
  .tree2{
    height: 5rem;
    position: absolute;
    z-index: 99999;
    right: .8rem;
  }

</style>
