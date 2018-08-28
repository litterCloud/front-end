<template>
  <div id="app" @click="triggerFn">
    <router-view></router-view>
    <div v-transfer-dom>
      <confirm
        v-model="show6"
        :show-cancel-button="false"
        title="提示信息"
        @on-confirm="onConfirm">
        <p style="text-align:center;">由于获取不到您的精准定位，无法给您推荐附近门店，请至设置中打开定位</p>
      </confirm>
    </div>
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
      triggerFn(data){
        let vm = this;
        let triggerDom = data.path;
        let storeMsg = '';
        let pageCode = 'PAGE_CODE_001';
        for(let i =0;i<triggerDom.length;i++){
          let $trigger = triggerDom[i];
          if($trigger.attributes){
            let touchId = $trigger.attributes['touchId'];

            if($trigger.attributes['pageCode']){
              pageCode = $trigger.attributes['pageCode'].value;
            }
            if($trigger.attributes['touchStoreId']){
              storeMsg = $trigger.attributes['touchStoreId'].value;
            }
            if($trigger.attributes['touchActiveUrl']){
              storeMsg = $trigger.attributes['touchActiveUrl'].value;
            }
            if($trigger.attributes['touchAxtiveId']){
              storeMsg = $trigger.attributes['touchAxtiveId'].value;
            }
            if(touchId){
              vm.ajaxTrigger(pageCode,touchId.value,storeMsg);
            }
          }
        }
      },
      ajaxTrigger(pageCode,touchId,storeMsg = ''){
        let vm = this;
        let path = location.href;
        console.log(vm.$store.state);
        let urlParam = vm.$util.getAllQueryString();
        let sendData = {
          pageCode:pageCode,//美宜佳本网抢红包,
          pageUrl:path,//页面url
          phoneNumber:vm.$store.state.userInfo.tel,//用户手机号
          sourceType:urlParam.sourceType ? urlParam.sourceType : '', //访问入口 url
          cityName:vm.$store.state.handleAddress.city || vm.$store.state.position.address ||  vm.$store.state.IpPosition.name || "", //用户定位获取到的地市名称
          touchCode:touchId,//页面触点的唯一标识
          spare: storeMsg
        }
        vm.$axios({
          url:vm.$util.getUrl('touchType'),
          data:sendData
        }).then(()=>{
          console.log("touch ajax success");
        }).catch(()=>{
          console.log("touch ajax fail");
        })
      },
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
