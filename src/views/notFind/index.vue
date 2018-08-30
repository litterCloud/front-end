<template>
    <div class="not-find">
      <img src="../../assets/icon/404.png">
      <div class="sorry">sorry</div>
      <div>页面报错啦！</div>
      <div>你访问的页面已经离开地球</div>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {},
        computed: {},
        methods: {},
        watch: {},
        created() {

        }
    }

</script>
<style scoped lang="less">
  .not-find{
    text-align: center;
    margin-top:17%;
    img {
      height: 2.3rem;
    }
    div{
      padding-top: 0.15rem;
      font-size: 0.24rem;
    }
    .sorry {
      padding-top: 0.14rem;
      padding-bottom: 0.14rem;
      font-size: 0.48rem;
    }
  }
</style>
