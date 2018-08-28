<template>
<div>
  <not-used-tpl v-for="item in redPackedList" v-bind="item" :key="item.id"></not-used-tpl>

</div>
</template>
<script>
  import notUsedTpl from '@/components/notUsedTpl.vue'
    export default {
      components:{
        notUsedTpl
      },
      data: function () {
        return {
          redPackedList:[
            {
              id:"1",
              icon:require("@/assets/home/u19.png"),
              name:"百事可乐",
              price:"5",
              distance:"50m",
              time:"2018.03.16-2019.03.16"
            },
            {
              id:"2",
              icon:require("@/assets/home/u19.png"),
              name:"百事可乐",
              price:"5",
              distance:"50m",
              time:"2018.03.16-2019.03.16"
            },
            {
              id:"3",
              icon:require("@/assets/home/u19.png"),
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
