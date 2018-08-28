<template>
  <div>
    <popup v-model="show" should-rerender-on-show :hide-on-blur="false">
      <div class="login-div">
        <div class="login-item">
          <x-input class="tel-input" mask="999 9999 9999" placeholder="请输入手机号" v-model="tel" :max="13"></x-input>
        </div>
        <div class="login-item">
          <x-input :max="8" :show-clear="false" v-model="code" class="tel-input code" placeholder="请输入验证码">
            <x-button slot="right" type="primary" class="code-button"
                      v-bind:class="{isloading:loading && !showCountDown}" @click.native="getCode">
              {{showCountDown ? "" : "获取验证码"}}
              <countdown v-if="showCountDown" v-model="countTimeDown" @on-finish="finish"
                         v-show="showCountDown"></countdown>
              {{showCountDown ? "秒后重新获取" :""}}
            </x-button>
          </x-input>
        </div>
        <div class="error-notice">
          {{error || ""}}
        </div>
        <div class="button-item">
          <x-button type="default" class="confirm-btn" @click.native="confirmBtn">火速登录</x-button>

        </div>
        <div class="button-item">
          <x-button type="default" class="cancel-btn" @click.native="cancelBtn">取消</x-button>

        </div>

      </div>
    </popup>
  </div>
</template>

<script>
  import {Popup, Countdown, Spinner} from 'vux'


  export default {
    name: "newLogin",
    model: {
      prop: 'outshow',
      event: 'outShow'
    },
    components: {Popup, Countdown, Spinner},
    data() {
      return {
        show: false,
        tel: "",
        code: "",
        errorMsg: {
          errorTel: "请输入正确的手机号！",
          errorCode: "请输入正确验证码",
          successCode: "验证码已发到你手机上了，15分钟内有效。",
          failCode: "验证码获取失败,请稍后再试。。。",
          noCode: "请先获取验证码",
          login: "努力登录中。。。",
          getCoding:"正在发送验证码。",
          error:"验证码或手机号错误"
        },
        error: "",
        showCountDown: false,
        countTimeDown: 60,
        loading: false,
        hasCoding: false, //是否已获取验证码
        logining: false //是否正在登录

      }
    },
    props: ['outshow','from'],
    computed: {
      userTel() {
        let vm = this;
        let tel = (vm.tel + "").replace(/ /g, "");
        if (!Number(tel)) {
          tel = false
        }
        if (tel.length != 11) {
          tel = false
        }

        return tel
      }
    },
    methods: {
      //摧毁这个实例
      destoryLogin(){
        let vm = this;
        if(vm.from == "api"){
          let $parent = document.querySelector("body");
          $parent.removeChild(vm.$el);
          vm.$destroy();
        }
      },
      //fn 取消按钮
      cancelBtn() {
        //取消后，关闭弹框
        let vm = this;
        vm.$emit("outShow",false);
        vm.$emit("errorFn",false);
        vm.destoryLogin();
      },
      //fn 登录按钮
      confirmBtn() {
        let vm = this;
        if (!vm.userTel) {
          vm.error = vm.errorMsg['errorTel'];
          return false;
        }
        if (!vm.code) {
          vm.error = vm.errorMsg['errorCode'];
          return false;
        }
        if (!vm.hasCoding) {  //若没有验证码，则提示请获取验证码
          vm.error = vm.errorMsg['noCode'];
          return false;
        }
        vm.error = vm.errorMsg["login"];
        vm.logining = true;
        vm.$axios.post(
          vm.$util.getUrl("login"),
          {
            "desmobile":vm.userTel,
            "verityCode":vm.code
          }
        ).then(function (data) {
          vm.logining = false;
          //成功后 关闭弹框 并将手机号码放入该放的地方
          vm.$util.storeSet("userInfoTel", data.desmobile);
          vm.$util.storeSet("userInfoToken", data.token);
          vm.$store && vm.$store.commit("setPhone", {tel: data.desmobile || ""});
          vm.$store && vm.$store.commit("setToken", {token: data.token || ""});
          vm.$emit("outShow",false);
          vm.$emit("successFn",{
            tel:data.desmobile,
            token:data.token
          })
          vm.destoryLogin();
          location.reload(); //重新加载页面
        }).catch(function (error) {
          vm.error = error.respDesc || vm.errorMsg['error'];
        })

      },
      //fn 倒计时完成
      finish() {
        let vm = this;
        vm.showCountDown = false;
        vm.countTimeDown = 60;
        vm.loading = false;
      },
      getCode(event) {
        event.stopPropagation();
        let vm = this;
        if (vm.loading) {
          //若正在加载验证码 则返回
          return false;
        }
        if (!vm.userTel) {
          vm.error = vm.errorMsg["errorTel"];
          return;
        }
        vm.error = vm.errorMsg["getCoding"];
        vm.loading = true;
        vm.$axios.post(
          vm.$util.getUrl("getCode"),
          {
            desmobile: vm.userTel
          }
        ).then(function (data) {
          vm.loading = true;
          vm.showCountDown = true;
          vm.hasCoding = true;
          vm.error = vm.errorMsg['successCode'];
        }).catch(function (error) {
          vm.loading = false;
          vm.error = error.respDesc || vm.errorMsg['failCode'];
          vm.hasCoding = false;
        })
      }
    },
    watch: {
      outshow:{
        handler: function (val, oldVal) {
          let vm = this;
          vm.show = val || false;
        },
        immediate: true
      }
    },
    created() {
    }
  }
</script>

<style scoped lang="less">
  .login-div {
    background-color: #fff;
    padding: 0.5rem 0.3rem 0.2rem 0.3rem;
    overflow-y: hidden;
    .tel-input {
      line-height: 0.86rem;
      height: 0.86rem;
      background-color: #ffffff;
      box-shadow: inset 0.02rem 0.03rem 0.07rem 0rem rgba(0, 0, 0, 0.1);
      border: solid 0.01rem rgba(0, 0, 0, 0.14);
      border-radius: 0.4rem;
      margin-bottom: 0.24rem;
      font-size: 0.26rem;
      color: #333;
      ::-webkit-input-placeholder {
        color: #999;
      }
      &.code {
        padding-right: 0.1rem;
        margin-bottom: 0rem;
      }
    }
    .code-button {
      height: 0.65rem;
      background-color: #ffdc34;
      font-size: 0.26rem;
      line-height: 0.65rem;
      color: #a64824;
      border-radius: 0.3rem;
      padding: 0 0.38rem;
      position: relative;
      &:active {
        color: #a64824;
        background-color: #ffdc93;

      }
      &.isloading {
        background-color: #dad532;
      }
    }
    .button-item {
      margin-bottom: 0.24rem;
    }
    .confirm-btn {
      height: 0.8rem;
      background: linear-gradient(-90deg,#FF9845,#FF371E);
      color: #fff;
      font-size: 0.32rem;
      line-height: 0.8rem;
      border-radius: 0.4rem;
      &:active {
        color: #fff;
        background-color: #ce3c39;

      }

    }
    .cancel-btn {
      height: 0.8rem;
      background-color: #eaeaea;
      color: #666;
      font-size: 0.32rem;
      line-height: 0.8rem;
      border-radius: 0.4rem;
    }
    .error-notice {
      font-size: 0.22rem;
      line-height: 0.6rem;
      color: #c33f3d;
      padding-left: 0.26rem;
      height: 0.6rem;
    }
    .spinner {
      color: red;
    }
  }
</style>
