<template>
 <div  class="bg-img-box">
   <slot></slot>
 </div>
</template>
<script>

    export default {
      name:"homeHeader"
    }

</script>
<style scoped>
  .bg-img-box{
    width: 100%;
    height: 14rem;
    background-image:url("../assets/home/u983.png"),url("../assets/home/u987.png"), url("../assets/home/u985.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
