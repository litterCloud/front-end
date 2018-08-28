<template>
  <div>
    <div @click="showLogin">点击 弹出登录框</div>
    <div @click="apiShowLogin">点击 用APi弹出登录框</div>
    <login v-if="show" v-model="show"></login>
  </div>
</template>

<script>
  import login from '@/components/newLogin'
  import loginApi from '@/libs/login.js'
  export default {
    name: "newLogin",
    components: {
      login
    },
    data() {
      return {
        show:false
      }
    },
    props: {},
    computed: {},
    methods: {
      showLogin(){
        this.show = true;
      },
      apiShowLogin(){
        loginApi(function (value) {
          console.log(value);
        },function (value) {
          console.log(value);
        });
      }
    },
    watch: {},
    created() {

    }
  }
</script>

<style scoped lang="less">

</style>
