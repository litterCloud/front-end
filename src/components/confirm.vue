<template>
    <div class="confirm-window" :class="{'hide':!showConfirm}">
      <img v-if="type=='redPacket' && icon == 'success'" class="background-img" src="@/assets/rodRedPacket/success_bg.png">
      <div class="close-confirm" v-if="type!='horn'">
        <div class="close" @click="cancelFnDefault"></div>
      </div>
      <div v-if="type != 'redPacket' && type!='horn' && icon != 'redPacket'" class="confirm" :class="{'confirm-pic':type=='pic'}">
        <div class="confirm-default">
          <div>
            <div class="confirm-icon" :class="{'success':icon == 'success','fail':icon == 'fail'}" ></div>
            <div class="confirm-content">
              <div class="title">{{title}}</div>
              <div class="content">{{content}}</div>
            </div>
            <div class="confirm-operation">
              <div class="confirm-btn" v-if="confirmBtn" @click="confirmFnDefault">
                {{confirmBtn}}
              </div>
              <div class="cancel-btn" v-if="cancelBtn" @click="cancelFnDefault">
                {{cancelBtn}}
              </div>
            </div>
          </div>
        </div>
        <div class="solt-content">
          <slot name="confirmExtra"></slot>
        </div>
      </div>
      <div v-if="type != 'redPacket' && type!='horn' && icon == 'redPacket'" class="repacket-confirm">
        <div class="confirm-content">
          <div class="title">{{title}}</div>
          <div class="content">{{content}}</div>
        </div>
        <div class="confirm-operation">
          <div class="confirm-btn" v-if="confirmBtn" @click="confirmFnDefault">
            {{confirmBtn}}
          </div>
        </div>
      </div>
      <div class="coupon-confirm" v-if="type=='horn'">
        <div class="confirm-content">
          <div class="content" v-if="confirmBtn" @click="confirmFnDefault">{{content}}</div>
        </div>
          <!--<div class="confirm-btn" v-if="confirmBtn" @click="confirmFnDefault">-->
            <!--{{confirmBtn}}-->
          <!--</div>-->
      </div>

      <div class="confirm" :class="{'redpacket-rod':!operationNoMargin,'width-big':isWidth}" v-if="type=='redPacket'">
        <div class="confirm-default">
          <div class="redpacket-bg" >
            <div class="confirm-content">
              <div class="title">{{title}}</div>
              <div class="content">
                <div v-if="contentString">
                  <div v-for="v in content">{{v}}</div>
                </div>

                <slot v-else name="contentSlot"></slot>
              </div>
            </div>
            <div class="confirm-operation">
              <div class="extra-operation extra-top" v-if="tip && tip == 'top'" @click="tipTopFn">
                {{tipContent}}
              </div>
              <div class="confirm-btn" v-if="confirmBtn" @click="confirmFnDefault">
                {{confirmBtn}}
              </div>
              <div class="cancel-btn" v-if="cancelBtn" @click="cancelFnDefault">
                {{cancelBtn}}
              </div>
              <div class="extra-operation extra-bottom" v-if="tip && tip == 'bottom'" @click="tipBottomFn">
                {{tipContent}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="close-confirm-bottom" v-if="type=='horn'">
        <div class="line"></div>
        <div class="close" @click="cancelFnDefault"></div>
      </div>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
              showConfirm:true
            }
        },
        props: {
          operationNoMargin:{
            type:Boolean,
            default:true
          },
          contentString:{
            type:Boolean,
            default:true
          },
          tipContent:{
            type:String,
            default:""
          },
          tip:{
            default:false
          },
          isWidth:{
            default:false
          },
          "type":{
            type:String
          },
          "icon":{
            default:false
          },
          "title":{
            type:String,
            default:""
          },
          "content":{
            type:String,
            default:""
          },
          "confirmBtn":{
            default:"确定"
          },
          "cancelBtn":{
            default:"取消"
          },
          "confirmFn":{
            type:Function,
            default:function(){
              console.log("confirm");
            }
          },
          "cancelFn":{
            type:Function,
            default:function(){
              console.log("cancel");
            }
          },
          tipTopFn:{
            type:Function,
            default:function(){
              console.log("tipTopClick")
            }
          },
          tipBottomFn:{
            type:Function,
            default:function(){
              console.log("tipBottomClick")
            }
          },
          "from":{
            type:String
          }
        },
        computed: {},
        methods: {
          confirmFnDefault(){
            let vm = this;
            vm.showConfirm = false;
            /*默认操作*/
            /*回调*/
            vm.confirmFn();
            if(vm.from == "api"){
              let $parent = document.querySelector("body");
              $parent.removeChild(vm.$el);
              vm.$destroy();
            }

          },
          cancelFnDefault(){
            let vm = this;
            vm.showConfirm = false;
            /*默认操作*/
            /*回调*/
            vm.cancelFn();
            if(vm.from == "api"){
              let $parent = document.querySelector("body");
              $parent.removeChild(vm.$el);
              vm.$destroy();
            }
          },
          tipTopFn(){
            vm.tipTopFn();
          },
          tipBottomFn(){
            vm.tipBottomFn();
          }
        },
        watch: {},
        created() {
        }
    }

</script>
<style scoped lang="less">

  .confirm-window{
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 950120;
    .background-img {
      height: 120%;
      width: 100%;
      position: absolute;
      z-index: -1;
    }
    .close-confirm{
      width:80%;
      text-align: right;
      .close{
        display: inline-block;
        width:0.6rem;
        height:0.6rem;
        border-radius: 50%;
        border:2px solid #FFFFFF;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        position: relative;
      }
      .close:before{
        content: '';

        position: absolute;
        top:45%;
        left:4px;
        width: 0.4rem;
        height: 2px;
        background-color: #FFFFFF;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);

      }
      .close:after{
        content: '';
        position: absolute;
        top:45%;
        left:4px;
        width: 0.4rem;
        height: 2px;
        background-color: #FFFFFF;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }
    .close-confirm-bottom{
      width:80%;
      text-align: center;
      .line{
        width: 1px;
        height: 0.7rem;
        background-color: #fff;
        margin: 0 auto;
      }
      .close{
        display: inline-block;
        width:0.6rem;
        height:0.6rem;
        border-radius: 50%;
        border:2px solid #FFFFFF;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        position: relative;
      }
      .close:before{
        content: '';

        position: absolute;
        top:45%;
        left:4px;
        width: 0.4rem;
        height: 2px;
        background-color: #FFFFFF;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);

      }
      .close:after{
        content: '';
        position: absolute;
        top:45%;
        left:4px;
        width: 0.4rem;
        height: 2px;
        background-color: #FFFFFF;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }

    .repacket-confirm {
      background: url("~@/assets/icon/rodSuccess.png") no-repeat;
      background-size: 100% 100%;
      width: 6.2rem;
      height: 7.2rem;
      padding-left: 0.2rem;
      .confirm-content{
        margin-top:4.5rem;
        line-height: 0.5rem;
        text-align: center;
        color:#FFFFFF;
        .title{
          font-size: 0.42rem;
          font-weight: bold;
        }
        .content{
          margin-top:0.1rem;
          font-size: 0.3rem;
        }
      }
      .confirm-operation{
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        text-align: center;
        margin-top:0.5rem;
        margin-bottom:0.56rem;
        .confirm-btn{
          padding: 0 0.5rem;
          height:0.7rem;
          line-height: 0.7rem;
          background: #ffdb34;
          border-radius: 0.435rem;
          font-size: 0.32rem;
          color:#932321;
        }
        .cancel-btn{
          width:70%;
          height:0.7rem;
          line-height: 0.7rem;
          border-radius: 0.435rem;
          font-size: 0.32rem;
          color:#ffdb34;
          border:1px solid #ffdb34;
          box-sizing: border-box;
          margin-top: 0.3rem;
        }
      }
    }
    .width-big{
      width:90% !important;
    }
    .confirm{
      width:70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 0.1rem;
      .confirm-default{
        .redpacket-bg{
          background: url("~@/assets/icon/btn_01.png") no-repeat ;
          border-radius: 0.2rem;
          background-size: 100% 100%;
          div{
            background-color: transparent;
          }
          .confirm-content{
            min-height: 2.26rem;
            margin-top:2.2rem;
            display: flex;
            justify-content: center;
          }
          .confirm-operation{
            cursor: pointer;
            .extra-operation{
              font-size: 0.24rem;
              color:rgb(248,222,72);
            }
            .extra-top{
              margin-bottom:0.16rem;
            }
            .extra-bottom{
              margin-top:0.16rem;
            }
          }
        }
        width:100%;
        div{
          border-radius: 0.1rem;
          width:100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #c33f3d;
          .confirm-icon{
            background: blue;
            margin-top:0.4rem;
          }
          .success{
            width:1.05rem;
            height:1rem;
            background: url('~@/assets/icon/success.png') no-repeat;
            background-size: 100% 100%;
          }
          .fail{
            width:1.05rem;
            height:1rem;
            background: url('~@/assets/icon/fail.png') no-repeat;
            background-size: 100% 100%;
          }
          .confirm-content{
            margin-top:0.1rem;
            line-height: 0.5rem;
            text-align: center;
            color:#FFFFFF;
            .title{
              padding: 0 10%;
              font-size: 0.42rem;
              font-weight: bold;
            }
            .content{
              margin-top:0.1rem;
              font-size: 0.3rem;
            }
          }
          .confirm-operation{
            width:100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            text-align: center;
            margin-top:0.5rem;
            margin-bottom:0.56rem;
            .confirm-btn{
              width:70%;
              height:0.7rem;
              line-height: 0.7rem;
              background: #ffdb34;
              border-radius: 0.435rem;
              font-size: 0.32rem;
              color:#932321;
            }
            .cancel-btn{
              width:70%;
              height:0.7rem;
              line-height: 0.7rem;
              border-radius: 0.435rem;
              font-size: 0.32rem;
              color:#ffdb34;
              border:1px solid #ffdb34;
              box-sizing: border-box;
              margin-top: 0.3rem;
            }
          }
        }

      }
      .solt-content{
        width:100%;
        img{
          width:100%;
        }
      }
    }
    .redpacket-rod{
      .confirm-default{
        .redpacket-bg{
          .confirm-operation{
            margin:0.1rem 0;
          }
        }
      }
    }
    .confirm-pic{
      .confirm-default:after{
        content:"";
        display: block;
        position: relative;
        top:-1px;
        width:100%;
        height:0.29rem;
        background: url("~@/assets/icon/confirm-type-pic.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .hide{
    display: none;
  }
  .coupon-confirm{
    background: url("~@/assets/coupon/confirm.png") no-repeat;
    background-size: 100% 100%;
    width: 5.87rem;
    height: 5.47rem;
    .confirm-content{
      margin-top: 3.5rem;
      .content{
        /*color: #3c3c3c;*/
        /*font-size: 0.36rem;*/
        /*text-align: center;*/
        color: #3c88ed;
        font-size: 0.32rem;
        text-align: center;
        width: 88%;
        margin: auto;
        left: 0;
      }
    }
    .confirm-btn{
      width: 4rem;
      height: 0.84rem;
      margin: 0 auto;
      margin-top: 0.65rem;
      border-radius: 1rem;
      text-align: center;
      font-size: 0.42rem;
      color: #fff;
      line-height: 0.8rem;
      background-image: linear-gradient(18deg,
      #ff6f3f 0%,
      #fe9d3f 100%),
      linear-gradient(
        #ef5522,
        #ef5522);
      background-blend-mode: normal, normal;
    }
  }
</style>
