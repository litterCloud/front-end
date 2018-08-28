<template>
  <div>
    <group>
      <x-switch title="sdsadsa" v-model="show1" ></x-switch>
    </group>
    <actionsheet v-model="show1"></actionsheet>
  </div>
</template>

<script>
  import { Actionsheet,Group,XSwitch,TransferDom,Toast } from 'vux'
  export default{
    data: function () {
      return {
        show1: false
      }
    },
    components:{
      Actionsheet,
      Group,
      XSwitch,
      TransferDom,
      Toast
    }
  }
</script>

<style lang="less" scoped>

</style>