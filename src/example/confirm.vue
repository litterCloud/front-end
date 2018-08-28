<template>
    <div>
      <!--<confirm :icon="'success'" :type="'pic'">
        <div slot="confirmExtra" >
          <img src="@/assets/icon/king.png" alt="">
        </div>
      </confirm>-->
      <!--confirm接收参数-->
      <!--icon:'success','fail',false-->
      <!--title:confirm标题-->
      <!--content:confirm内容-->
      <!--confirmBtn:'确认按钮内容'，false-->
      <!--cancelBtn:'取消按钮内容'，false-->
      <!--confirmFn:确定按钮的回调函数-->
      <!--cancelFn:取消按钮的回调函数-->
      <button @click="showConfirm">弹出带大王卡的弹框</button>
      <button @click="showErrorConfirm">弹出带失败图标的弹框</button>
      <button @click="showSuccessConfirm">弹出带成功图标的弹框</button>
      <button @click="shownoIconConfirm">弹出不带图标的弹框</button>
      <button @click="showtheConfirm">弹出抢红包背景的弹框</button>
      <button @click="hornConfirm">弹出喇叭背景的弹框</button>
      <button @click="redPacketConfirm">弹出红包背景的弹框（插槽）</button>
      <button @click="redPacketConfirm2">弹出红包背景的弹框（文本）</button>

    </div>
</template>
<script>
//  import confirmFn from "@/libs/confirm"
    export default {
        components: {
        },
        data() {
            return {
            }
        },
        props: {},
        computed: {},
        methods: {
          showConfirm(){
            let vm = this;
            vm.$confirm({
              config:{
                type:'pic',
                title:"title",
                content:"content",
                cancelFn(){
                  console.log("取消");
                }
              },
              render:{
                pic:(h)=>{
                  return h('div',
                    {},
                    [
                      h("img",{
                        attrs:{
                          src:require("@/assets/icon/king.png")
                        }
                      })
                    ]
                  )
                }
              }
            });
          },
          showErrorConfirm(){
            let vm = this;
            vm.$confirm({
              config: {
                icon: 'fail',
                title:  "失败标题",
                content: "失败的内容",
                confirmBtn: "确定",
                cancelBtn:false,
                confirmFn() {
                  console.log("确定");
                }
              }
            });

          },
          showSuccessConfirm(){
            let vm = this;
            vm.$confirm({
              config: {
                icon: 'success',
                title:  "成功标题标题",
                content: "成功的内容",
                confirmBtn: "确定",
                cancelBtn:false,
                confirmFn() {
                  console.log("确定");
                }
              }
            });
          },
          shownoIconConfirm(){
            let vm = this;
            vm.$confirm({
              config: {
                icon:false,
                title:  "标题",
                content: "内容",
                confirmBtn: "确定",
                cancelBtn:false,
                confirmFn() {
                  console.log("确定");
                }
              }
            });
          },
          showtheConfirm(){
            let vm = this;
            vm.$confirm({
              config: {
                icon:'redPacket',
                title:  "50元",
                content: "无门槛通用券",
                confirmBtn: "去消费，GO！",
                cancelBtn:false,
                confirmFn() {
                  console.log("确定");
                }
              }
            });
          },
          hornConfirm(){
            let vm = this;
            vm.$confirm({
              config: {
                type:"horn",
                content: "天知道去哪里了啊 ",
                confirmBtn: "立即查看",
                cancelBtn:false,
                confirmFn() {
                  console.log("确定不");
                }
              }
            });
          },
          redPacketConfirm(){
            let vm = this;
            vm.$confirm({
              config: {
                type:"redPacket",
                icon:"success",
                contentString:false,
                content: "红包啊",
                confirmBtn: "确定",
                cancelBtn:false,
                tip:'bottom',
                tipContent:"到我的红包消费",
                confirmFn() {
                  console.log("确定不");
                }
              },
              render:{
                contentFn:(h)=>{
                  return h('div',
                    {},
                    [
                      h("div",
                        {
                          style:{
                            display:"flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: "1rem"
                          }
                        },
                        [
                          h("div",{
                            domProps:{
                              innerHTML:"5.4"
                            },
                            style:{
                              width:"auto",
                              fontSize:"1.2rem",
                              fontWeight:"bold",
                              height:"1.2rem"

                            }
                          }),
                          h("div",{
                            domProps:{
                              innerHTML:"元"
                            },
                            style:{
                              width:"auto"
                            }
                          })
                        ]
                      ),
                      h("div",
                        {},
                        [
                          h("div",{
                            domProps:{
                              innerHTML:"恭喜获得联通红包"
                            }
                          })
                        ]
                      )
                    ]
                  )
                }
              }
            });
          },
          redPacketConfirm2(){
            let vm = this;
            vm.$confirm({
              config: {
                type:"redPacket",
                title:"",
                content: ["今天已领过红包啦！","明天再来"],
                confirmBtn: "确定",
                cancelBtn:false,
                tip:'bottom',
                tipContent:"到我的红包消费",
                confirmFn() {
                  console.log("确定不");
                }
              },
              render:{
                contentFn:(h)=>{
                  return h('div',
                    {},
                    [
                      h("div",
                        {
                          style:{
                            display:"flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: "1rem"
                          }
                        },
                        [
                          h("div",{
                            domProps:{
                              innerHTML:"5.4"
                            },
                            style:{
                              width:"auto",
                              fontSize:"1.2rem",
                              fontWeight:"bold",
                              height:"1.2rem"

                            }
                          }),
                          h("div",{
                            domProps:{
                              innerHTML:"元"
                            },
                            style:{
                              width:"auto"
                            }
                          })
                        ]
                      ),
                      h("div",
                        {},
                        [
                          h("div",{
                            domProps:{
                              innerHTML:"恭喜获得联通红包"
                            }
                          })
                        ]
                      )
                    ]
                  )
                }
              }
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
