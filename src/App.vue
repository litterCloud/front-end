<template>
  <div id="app" @click="triggerFn">
    <router-view></router-view>
    <div>测试master</div>
  </div>
</template>
<script>
  import {getUserIpPosition, getUserPosition,getReadPacketMoney,setTelAndToken} from '@/api/methods'

  export default {
    name: 'App',
    data() {
      return {
        show6:false,
        tel: ""
      }
    },
    methods: {
      onConfirm (msg) {
        if (msg) {
          alert(msg)
        }
      },
      getUserIpPosition,
      getUserPosition,
      getReadPacketMoney,
      setTelAndToken,
      initTencentMap() {
        let vm = this;
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://map.qq.com/api/js?v=2.exp&key=${this.$config.tencentMapKey}&&libraries=geometry,autocomplete,drawing,convertor&callback=initTencentMap`;
        document.body.appendChild(script);
        window.initTencentMap = function () {
          console.log("1111")
//          vm.getUserIpPosition().then(function (data) {
//
//          }).catch(function (error) {
//            console.log(error);
//          });
          vm.getUserPosition().then(function (data) {
            /*发送定位信息接口*/
            vm.$axios({
              url: vm.$util.getUrl("sendPosition"),
              data: {
                latitude: data.lat,
                longitude: data.lng
              }
            }).then(function () {})

          }).catch(function (error) {
            console.log(error);
            if (error.errorCode == 1) {
              vm.show6=true;
              // vm.$vux.toast.text('无获取地理位置的权限.');
            }else{
             vm.$vux.toast.text('定位信息获取失败.');

            }
          })
        }
      },
    },
    watch: {
      userTel: {
        handler: function (newVal, oldVal) {
          let vm = this;
          if (newVal) {
           vm.getReadPacketMoney(newVal);
          }
        },
        immediate: true
      }
    },
    computed: {
      userTel() {
        return this.$store.state.userInfo.tel;
      }
    },
    created: function () {
      let vm = this;
      vm.initTencentMap(); //初始化腾讯地图并定位
      vm.setTelAndToken(); //设置初始化的手机号

    }
  }
</script>

<style>

</style>
