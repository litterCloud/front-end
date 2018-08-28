<template>
    <div>
      <span>a组件</span>
      <slot></slot>
    </div>
</template>
<script>
    export default {
        components: {},
        name:"thea",
        data() {
            return {}
        },
        props: {},
        computed: {},
        methods: {},
        watch: {},
        created() {
          console.log("a组件",this);
        }
    }

</script>
<style scoped lang="less">
</style>
