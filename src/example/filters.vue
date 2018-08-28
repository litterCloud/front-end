<template>
  <div class="filter">
    <p>格式化</p>
    <input type="text" v-model="input0">
    <p>{{input0 | phoneFormat}}</p>
    <p>加密</p>
    <input type="text" v-model="input1">
    <p>{{input1 | phoneEncryption}}</p>
    <p>{{input1 | phoneEncryption("@")}}</p>
    <p>加密并格式化</p>
    <input type="text" v-model="input2">
    <p>{{input2 | phoneFormatEncryption}}</p>
    <p>{{input2 | phoneFormatEncryption("@")}}</p>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        input0:"18516498546",
        input1:"18516498546",
        input2:"18516498546"
      };
    }
  }
</script>
<style></style>
