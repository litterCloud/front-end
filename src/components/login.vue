<template>
  <div class="login">
    <x-dialog v-model="login.show" class="login-dialog">
      <div class="login-window">
        <div class="login-title">
          {{login.title || titleDefault}}
          <span class="login-close" @click="closeLogin"></span>
        </div>
        <div class="login-msg">
          <div v-for="v in initData" class="login-item" :key="v.id">
            <x-input :title="v.label" :type="v.type" v-model="sendItem[v.id+'']" :placeholder="v.placeholder" label-width="5.5rem"  :show-clear="v.showClear"></x-input>
            <div class="reg-fail" v-if="reg[v.id+'']">
              <span>
                {{v.reg}}
              </span>
            </div>
            <div v-if="v.id == 'code'"  class="code-enter" @click="getCode">
              {{sleep+codeTip}}
            </div>
          </div>
        </div>
      </div>
      <Button class="login-btn" @click="requestFn">{{buttonText}}</Button>
    </x-dialog>
  </div>
</template>
<script>
  import { XDialog,FormPreview } from 'vux'
  export default {
    props:["login"],
    name:"login",
    data(){
      return {
        requestDefaultPath:"login",
        codeDefaultPath:"code",
        userInfoDefaultPath:"uesrinfo",
        redpacketDefaultPath:"redpacket",
        titleDefault:"登录/注册",
        codeTip:"获取验证码",
        codeSleep:false,
        sleep:"",
        buttonText:"注册/登录",
        initData:[
          {
            label:"手机号",
            id:"phone",
            type:"number",
            placeholder:"请输入手机号",
            showClear:false,
            reg:"*请输入有效手机号"

          },
          {
            label:"验证码",
            id:"code",
            type:"text",
            placeholder:"请输入验证码",
            showClear:false,
            reg:"*请输入有效验证码"
          }
        ],
        sendItem:{
          phone:"",
          code:""
        },
        reg:{
          phone:false,
          code:false
        },
        codeUsed:false,
        regItem:{
          phone:false,
          code:false
        }
      }
    },
    watch:{
      sendItem:{
        handler:function(val,oldVal){
          var vm = this;
           if(val.phone){
             var reg=/^[0-9]{11}$/;
             if(!reg.test(val.phone)){
               vm.reg.phone=true;
               vm.regItem.phone = false;
             }else{
               vm.reg.phone=false;
               vm.regItem.phone = true;
             }
           }
           if(val.code){
             if(val.code!=""){
               vm.reg.code=false;
               vm.regItem.code = true;
             }else{
               vm.reg.code=true;
               vm.regItem.code = false;
             }
           }

        },
        deep:true
      }
    },
    computed:{
      shopLogin(){
        return this.login.show;
      }
    },
    methods:{
      /*关闭登录框*/
      closeLogin:function(){
        this.login.show = false;
      },
      /*登录or注册*/
      requestFn:function(){
        var vm = this;
        if(vm.regItem.phone && vm.regItem.code){
          vm.reg.phone = false;
          vm.reg.code = false;
          vm.$axios({
            url:vm.$util.getUrl(vm.login.requestPath || vm.requestDefaultPath),
            data:vm.sendItem
          }).then(function(returnData){
            vm.$store.commit("setPhone",{"tel":vm.sendItem.phone});
            vm.$store.commit("setLogin",);
            vm.login.show = false;
            vm.getUserInfo();
            vm.getRedpacket();
          }).catch(function(returnData){
            console.log("注册失败");
            vm.$vux.toast.show({
              text: '注册/登录失败',
              type:"text",
              position:"middle"
            })
          })
        }else{
          if(!vm.regItem.phone){
            console.log("请输入有效手机号");
            vm.reg.phone = true;
          }
          if(!vm.regItem.code){
            console.log("请输入验证码");
            vm.reg.code = true;
          }
        }
      },
      /*调取用户信息*/
      getUserInfo:function(){
        var vm = this;
        vm.$axios({
          url:vm.$util.getUrl(vm.login.userInfoPath || vm.userInfoDefaultPath),
          data:{
            phone:vm.sendItem.phone
          }
        }).then(function(returnData){
          vm.$store.commit("setUserInfo",returnData);
        }).catch(function(returnData){
          console.log("获取用户信息失败");
        })
      },
      /*调取红包信息*/
      getRedpacket:function(){
        var vm = this;
        vm.$axios({
          url:vm.$util.getUrl(vm.login.redpacketPath || vm.redpacketDefaultPath),
          data:{
            phone:vm.sendItem.phone
          }
        }).then(function(returnData){
          vm.$store.commit("setRedpacket");
        }).catch(function(returnData){
          console.log("获取红包信息失败");
        })
      },
      /*获取验证码禁用*/
      codeSleepFn:function(){
        var vm = this;
        var totalTime = Number(vm.login.totalSleep);
        var time = 0;
        var timer = setInterval(function(){
          vm.codeTip = "s后重新获取";
          time+=1000;
          vm.sleep = ((totalTime - time)/1000).toFixed(0) ;
          vm.codeSleep = true;
          if(vm.sleep ==0){
            vm.codeTip ="获取验证码";
            vm.sleep="";
            vm.codeSleep = false;
            clearInterval(timer);
          }
        },1000);
        return timer;
      },
      /*获取验证码*/
      getCode:function(){
        var vm = this;
        if(!vm.regItem.phone){
          console.log("请输入有效手机号");
          vm.reg.phone = true;
          return
        }
        if(!vm.codeSleep){
          var timer = vm.codeSleepFn();
          this.$axios({
            url:vm.$util.getUrl(vm.login.codePath || vm.codeDefaultPath),
            data:vm.sendItem
          }).then(

          ).catch(function(){
            vm.codeTip ="获取验证码";
            vm.sleep="";
            vm.codeSleep = false;
            clearInterval(timer);
            console.log("获取验证码失败");
            vm.$vux.toast.show({
              text: '获取验证码失败',
              type:"text",
              position:"middle"
            })
          })
        }

      },
    },
    components:{
      XDialog,
      FormPreview
    }
  }
</script>
<style lang="less" scoped>
  .login-dialog{
    /deep/.weui-dialog{
      border-radius: 0.5rem;
      width:82.7%;
      max-width: 82.7%;
    }
    /deep/.weui-cell{
      padding:0;
      width:100%;
    }
    /deep/.weui-cell__bd{
        border:1px solid #E4E4E4;
    }
  }
  .login{
    color: #333333;
    height:1px;
    .login-title{
      width:100%;
      height:4.9rem;
      line-height: 4.9rem;
      font-size: 1.7rem;
      position: relative;
      border-bottom:0.05rem solid #CCCCCC;
    }
    .login-close{
      display: inline-block;
      height:1.6rem;
      width:1.6rem;
      background: url("~@/assets/icon/close-black.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top:1.65rem;
      right:1.65rem;
    }
    .login-msg{
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin:1rem 0;
      .login-item{
        position: relative;
        display: flex;
        height:3.6rem;
        line-height: 3.6rem;
        margin:1rem 0;
        justify-content: space-between;
        font-size: 1.2rem;
        margin-right:1.65rem;
        label{
          flex-shrink:0;
          width:6.35rem;
        }
        input{
          width:100%;
          border: 0.05rem solid #E4E4E4;
          padding-left:0.5rem;
        }
        .reg-fail{
          height:auto;
          position: absolute;
          bottom:-1.5rem;
          line-height: normal;
          left:5.5rem;
          color:#ff3300;
        }
        .code-enter{
          /*flex-shrink:0;*/
          display: inline-block;
          width:10rem;
          background: #FF6F5A;
          color:#FFFFFF;
        }
      }
    }
    .login-btn{
      width:80%;
      height:3.55rem;
      line-height: 3.55rem;
      background: #FF5D4A;
      color:#FFFFFF;
      border:0;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
    }
  }


</style>
