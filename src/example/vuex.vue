<template>
  <div>
  <thea ref="aaa">
    <theb ref="ccc" @bbbb="getb"> </theb>
  </thea>
    <span v-html="rawhtml"></span>
  </div>
</template>

<script>
  import { editData } from '@/api/methods'
  import thea from '@/components/thea'
  import theb from '@/components/theb'
  export default {
    components: {thea,theb},
    data(){
      return {
        rawhtml:"<div style='color: red' >sdsdsdsdsdsd</div>",
        dx:true
      }
    },
    computed:{
      items(){
        return this.$store.state.todos
      }
    },
    methods:{
      editData,
      getb(event){
        console.log(event);
      }
    },
    created(){
      console.log(this);
    }
  }
</script>
<style lang="less" >
  @import"../styles/common.less";
  .b{
    width: 100px;
    height: 40px;
    background-color: red;
  }

</style>
