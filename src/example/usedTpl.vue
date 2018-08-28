<template>
<div>
  <used-tpl v-for="item in redPackedList" v-bind="item" :key="item.id"></used-tpl>

</div>
</template>
<script>
  import usedTpl from '@/components/usedTpl.vue'

    export default {
      components:{
        usedTpl
      },
      data(){
        return {
          redPackedList:[
            {
              icon:require("@/assets/home/u884.png"),
              name:"百事可乐",
              price:"5",
              distance:"50m",
              time:"2018.03.16-2019.03.16"
            },
            {
              icon:require("@/assets/home/u884.png"),
              name:"百事可乐",
              price:"5",
              distance:"50m",
              time:"2018.03.16-2019.03.16"
            },
            {
              icon:require("@/assets/home/u884.png"),
              name:"百事可乐",
              price:"5",
              distance:"50m",
              time:"2018.03.16-2019.03.16"
            }
          ]
        }

      }
    }

</script>
<style scoped lang="less">
</style>
