<template>
  <div>
    <p>
      请输入手机号：<input type="text" v-model="phone">
      <button @click="filter">手机号格式化</button>
    </p>
    <p>
      请输入加密符号（选填）：<input type="text" v-model="symbol">
      <button @click="filter2">手机号加密</button>
      <button @click="filter3">手机号格式化并加密</button>
    </p>

    格式化结果:
    {{format}}
  </div>
</template>
<script>
  export default {
    data(){
      return {
        phone:"",
        symbol:"",
        format:""
      }
    },
    methods:{
      filter:function(){
        var vm = this;
        var phone = vm.phone;
        vm.format = this.$util.phoneFormat(phone);
      },
      filter2:function(){
        var vm = this;
        var phone = vm.phone;
        var symbol = vm.symbol;
        vm.format = this.$util.phoneEncryption(phone,symbol);
      },
      filter3:function(){
        var vm = this;
        var phone = vm.phone;
        var symbol = vm.symbol;
        vm.format = this.$util.phoneFormatEncryption(phone,symbol);
      }
    }
  }
</script>
<style></style>
