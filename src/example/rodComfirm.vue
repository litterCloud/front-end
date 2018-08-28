<template>
    <div></div>
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
          let vm = this;
          vm.$rodConfirm({
            config: {
              type:"success",
              close:false,
              title:"",
              content: "亲，您不能参加该活动哦",
              confirmBtn: "返回",
              cancelBtn:false,
              confirmFn() {
                location.href = vm.$config.routerList.home;
              }
            }
          });
        }
    }

</script>
<style scoped lang="less">
</style>
