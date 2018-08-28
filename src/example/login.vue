<template>
  <div class="dialog">
    <Button @click="clickLogin">点击登录</Button>
    <login :login.sync="login"></login>
  </div>
</template>
<script>
  import login from "@/components/login"
  export default {
    data(){
      return {
        login:{
          show:true,
          title:"登录/注册",
          requestPath:"register",
          codePath:"code",
          totalSleep:16000,

        }
      }
    },
    methods:{
      clickLogin:function(){
        this.login.show = true;
      }
    },
    components:{
      login
    }
  }
</script>
<style></style>
