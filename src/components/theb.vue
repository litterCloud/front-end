<template>
    <div>
      <span @click="clickSpan">theb组件</span>
    </div>
</template>
<script>
    export default {
        components: {},
        name:"theb",
        data() {
            return {}
        },
        props: {},
        computed: {},
        methods: {
          clickSpan(){
            this.$emit("bbbb",{"as":"asas"})
          }
        },
        watch: {},
        created() {
          console.log("b组件",this);
          this.$on("bbbb",function (event) {
            console.log("b中监听事件",event);
          })
        }
    }

</script>
<style scoped lang="less">
</style>
