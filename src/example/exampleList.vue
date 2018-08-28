<template>
<div>
  <div class="title">自定义组件示例</div>
  <ul class="example-list">
  <router-link v-for="item in exampleRoutes" :to="{name:item.name}" :key="item.name" tag="li">
    {{item.name}}
  </router-link>
  </ul>
</div>
</template>
<script>

    export default {
      created:function () {
        let vm = this;
        let routerOptions = this.$router.options.routes || [];
        vm.exampleRoutes = routerOptions;

      },
      data(){
        return {
          exampleRoutes:[]
        }
      }
    }

</script>
<style scoped lang="less">
  .example-list{
    li{
      background-color: aqua;
      cursor: pointer;
      text-align: center;
      margin: 2px;
      line-height: 0.6rem;
      display: block;
      height: 0.6rem;
      font-size: 0.18rem;
    }
  }

  .title{
    text-align: center;
    font-size: 0.20rem;
    line-height: 0.4rem;
    background-color: #f31212;
    color: #fff;
  }
</style>
