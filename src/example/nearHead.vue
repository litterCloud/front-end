<template>
    <div class="near">
      <nearHead></nearHead>
      <nearActivity :activityList="activityList"></nearActivity>
    </div>
</template>
<script>
  import nearHead from "@/views/shopCity/nearHead"
  import nearActivity from "@/views/shopCity/nearActivity"
    export default {
        components: {
          nearHead,
          nearActivity
        },
        data() {
            return {
              activityList:[
                {
                  title:"抢红包",
                  iconPath:require("@/assets/mock/activity01.png"),
                  linkTo:"1589"
                },
                {
                  title:"充值送",
                  iconPath:require("@/assets/mock/activity02.png"),
                  linkTo:"1589"
                },
                {
                  title:"积分换礼包",
                  iconPath:require("@/assets/mock/activity01.png"),
                  linkTo:false
                }
              ]
            }
        },
        props: {},
        computed: {},
        methods: {},
        watch: {},
        created() {

        }
    }

</script>
<style scoped lang="less">
</style>
