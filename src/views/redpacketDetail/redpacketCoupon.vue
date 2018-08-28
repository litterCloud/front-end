<template>
  <div class="redpacket-coupon">
    <!--无可用劵-->
    <div v-if="noRedpacket" class="no-redpacket">
      <div class="no-redpacket-icon"></div>
      <div class="no-redpacket-msg">
        <div>还没有劵哦~</div>
        <div>充值送电子卷哦！多充多送</div>
      </div>
      <div class="to-get-redpacket" @click="toRecharge" touchId="TOUCH_CODE_002" pageCode="PAGE_CODE_006">
        去充值
      </div>
    </div>
    <!--有可用劵-->
    <div v-if="!noRedpacket" class="has-redpacket" v-infinite-scroll="loadMore" infinite-scroll-distance="100" infinite-scroll-disabled="isLoading">
      <!--未用劵-->
      <div v-for="(v,i) in redPacketList" class="red-item"  :key="v.noUsedKey || v.usedkey">
        <div class="red-msg" :class="{'item-orientation':v.rpType=='定向券','item-universal':v.rpType=='通兑券','red-item-use':v.usedkey,'red-item-nouse':v.noUsedKey}">
          <div class="red-detail">
            <div class="coupon-type">
              <div  class="label-icon">
                {{v.rpName}}
              </div>
              <div class="coupon-time">
                {{timeSplit(v.effTime)}}-{{timeSplit(v.expTime)}}
              </div>
              <div class="detail-desc" @click="tirggerFn(v,i)">
                <div>
                  查看详情
                </div>
                <div class="detail-icon" :class="{'active':v.isActive}"></div>
              </div>
            </div>
          </div>
          <div class="red-amount">
            <div class="redpack-type">
              <div class="red-total">{{Number(v.rpContent)}}</div>
              <div class="red-total-title">
                <div>元</div>
                <div class="rp-type" :class="{'orientation':v.rpType=='定向券','universal':v.rpType=='通兑券'}">
                  {{v.rpType}}
                </div>
              </div>
            </div>
            <div class="to-use" v-if="v.noUsedKey" @click="toUse(v)">去消费</div>
            <div class="to-use" v-if="v.usedkey" >{{v.rpContent == 0 ? '已消费':'已过期'}}</div>
          </div>
        </div>
        <div class="use-method" :class="{'item-selected':v.isActive}" v-show="v.isActive">
          <div class="desc" v-if="v.rpDesc">
            <div  v-for="(v,i) in $util.setKey(v.rpDesc.split('/n') || [],'key')" :key="v.key">
              <span>{{v}}</span>
            </div>
          </div>

          <!--<show-hide :defaultNum="1" v-if="v.rpDesc" @active="tirggerFn($event,v,i)" >
            <div slot='item' class="method-item" v-for="item in $util.setKey(v.rpDesc.split('/n') || [],'key')" :key="item.key">
              <span>{{item}}</span>
            </div>
            <span slot="total"></span>
          </show-hide>-->
        </div>
      </div>
      <load-more :show-loading="true"  background-color="#fbf9fe" v-if="isLoading && (loadUseState || loadNoUseState)"></load-more>
      <load-more :show-loading="false" tip="我是有底线的" background-color="#fbf9fe" v-if="(!loadUseState && !loadNoUseState)"></load-more>
    </div>
  </div>
</template>
<script>
import ShowHide from "@/components/showHide.vue";
import { filterActivityUrl } from "@/api/methods.js";
export default {
  name: "redpacketCoupon",
  components: {
    ShowHide
  },
  data() {
    return {
      isLoading: true,
      loadUseState: false,
      loadNoUseState: false,
      pageSize: "10",
      redPacketList: [], //红包列表的数据
      /*已使用红包*/
      redpacketUsedTotal: 0,
      hasLoadUsedTotal: 0,
      usedCurret: 1,
      /*未使用红包*/
      redpacketNoUsedTotal: 0,
      hasLoadNoUsedTotal: 0,
      noUsedCurret: 1,
      redActivityLink: false
    };
  },
  props: ["componentId"],
  computed: {
    /*可使用劵状态*/
    noRedpacket() {
      let redpacketNoUsedState = Boolean(this.redpacketNoUsedTotal == 0);
      return redpacketNoUsedState;
    },
    /*用户登陆状态*/
    userTel() {
      return this.$store.state.userInfo.tel;
    },
    queryActivity() {
      let vm = this;
      return {
        city:
          vm.$store.state.handleAddress.city ||
          this.$store.state.position.city ||
          vm.$store.state.IpPosition.name,
        touchSpotType: vm.$config.touchSpotType,
        componentId: vm.$config.redPacketActivityComponentId
      };
    },
    userPosition() {
      let vm = this;
      return (
        vm.$store.state.handleAddress.city ||
        this.$store.state.position.city ||
        vm.$store.state.IpPosition.name
      );
    }
  },
  methods: {
    filterActivityUrl,
    loadActivity() {
      let vm = this;
      vm.$util
        .getCacheOrAjaxData(
          vm.queryActivity.city + vm.queryActivity.componentId,
          vm.$util.getUrl("getActivity"),
          vm.queryActivity
        )
        .then(function(returnData) {
          var data = returnData["activityList"][0];
          vm.redActivityLink = data["detailUrl"];
        })
        .catch(function(returnData) {
          console.log("活动图片获取失败");
        });
    },
    /*时间截取*/
    timeSplit(time) {
      return time.split(" ")[0].replace(/-/g, ".");
    },
    /*初始化数据*/
    initData() {
      let vm = this;
      /*初始化已使用红包数据*/
      vm.redpacketUsedTotal = 0;
      vm.hasLoadUsedTotal = 0;
      vm.usedCurret = 1;
      vm.loadUseState = true;
      /*初始化未使用红包数据*/
      vm.redpacketNoUsedTotal = 0;
      vm.hasLoadNoUsedTotal = 0;
      vm.noUsedCurret = 1;
      vm.loadNoUseState = true;
      //可以加载红包明细列表
      vm.isLoading = true;
      vm.redPacketList = []; //重置红包列表
    },
    /*劵下拉触发更改样式*/
    tirggerFn(itemData, itemIdex) {
      let data = Object.assign({}, itemData, { isActive: !itemData.isActive });
      this.redPacketList.splice(itemIdex, 1, data);
    },

    /*去消费*/
    toUse(item) {
      let vm = this;
      // vm.$router.push({
      //   path:"/payCode",
      //   query:{
      //     telphone:vm.$store.state.userInfo.tel,
      //     rpCode:item.rpCode
      //   }
      // });
      vm.$router.push({
        path: "/"
      });
    },
    /*去充值*/
    toRecharge() {
      let vm = this;
      console.log(this.redActivityLink);
      console.log(vm.filterActivityUrl(this.redActivityLink));
      location.href = vm.filterActivityUrl(this.redActivityLink);
    },
    /*滚动加载*/
    loadMore(event) {
      let vm = this;
      vm.isLoading = true;
      if (!vm.loadUseState && !vm.loadNoUseState) {
        return;
      }
      /*优先加载可使用红包*/
      if (vm.loadNoUseState) {
        /*加载可使用劵*/
        vm.loadNoUsed(vm.userTel);
      } else {
        /*加载已用劵*/
        vm.loadUsed(vm.userTel);
      }
    },
    /*加载已使用红包*/
    loadUsed(tel) {
      let vm = this;
      vm
        .$bssAxios({
          url: vm.$util.getUrl("getUsedRedpacketDetail"),
          data: {
            bodyAttributeName: "QRY_USER_COUPONS_BY_COM_CODE_REQ",
            accNbr: tel,
            mechanismCode: "9940",
            state: "2", //不可用
            currPage: vm.usedCurret + "",
            pageSize: vm.pageSize
          }
        })
        .then(function(returnData) {
          vm.redPacketList = vm.redPacketList.concat(
            vm.$util.setKey(returnData["rpEntity"], "usedkey")
          );
          vm.redpacketUsedTotal = returnData["totalItem"];
          vm.hasLoadUsedTotal += returnData["rpEntity"].length;
          if (vm.usedCurret * vm.pageSize >= vm.redpacketUsedTotal) {
            vm.loadUseState = false;
          } else {
            vm.usedCurret += 1;
            vm.isLoading = false;
          }
        })
        .catch(function(error) {
          vm.isLoading = false;
          console.log("获取可用劵信息失败", error);
        });
    },
    /*加载未使用红包*/
    loadNoUsed(tel) {
      let vm = this;
      vm
        .$bssAxios({
          url: vm.$util.getUrl("getNoUseRedpacketDetail"),
          data: {
            bodyAttributeName: "QRY_USER_COUPONS_BY_COM_CODE_REQ",
            accNbr: tel,
            mechanismCode: "9940",
            state: "1", //可用
            currPage: vm.noUsedCurret + "",
            pageSize: vm.pageSize
          }
        })
        .then(function(returnData) {
          vm.redPacketList = vm.redPacketList.concat(
            vm.$util.setKey(returnData["rpEntity"], "noUsedKey")
          );
          vm.redpacketNoUsedTotal = returnData["totalItem"];
          vm.hasLoadNoUsedTotal += returnData["rpEntity"].length;
          if (vm.noUsedCurret * vm.pageSize >= vm.redpacketNoUsedTotal) {
            vm.loadNoUseState = false;
            vm.loadUsed(tel);
          } else {
            vm.noUsedCurret += 1;
            vm.isLoading = false;
          }
        })
        .catch(function(error) {
          vm.isLoading = false;
          console.log("获取可用劵信息失败", error);
        });
    }
  },
  watch: {
    /*根据手机号请求劵信息*/
    userTel: {
      handler: function(newVal, oldVal) {
        let vm = this;
        if (newVal) {
          vm.initData();
          vm.loadMore(newVal);
        }
      },
      immediate: true
    },
    userPosition: {
      handler(val, oldVal) {
        let vm = this;
        if (val) {
          vm.loadActivity();
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style scoped lang="less">
.redpacket-coupon {
  padding: 0.2rem 0.13rem;
  background: #f3f3f3;
  .has-redpacket {
    .red-item {
      width: 7.18rem;
      margin-top: 0.1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .red-msg {
        width: 7.2rem;
        display: flex;
        justify-content: space-between;
        height: 2.62rem;
        .red-detail {
          padding-top: 0.4rem;
          margin-left: 0.34rem;
          .label-icon {
            font-size: 0.28rem;
            color: #333333;
          }
          .coupon-time {
            margin-top: 0.1rem;
            font-size: 0.24rem;
            color: #666666;
          }
          .detail-desc {
            font-size: 0.24rem;
            color: #666666;
            display: flex;
            margin-top: 0.8rem;
            align-items: center;
            .detail-icon {
              margin-left: 0.1rem;
              width: 0.24rem;
              height: 0.24rem;
              background: url("~@/assets/redpacketDetail/detail-hide.png")
                no-repeat;
              background-size: 100% 100%;
            }
            .detail-icon.active {
              background: url("~@/assets/redpacketDetail/detail-show.png")
                no-repeat;
              background-size: 100% 100%;
            }
          }
        }
        .red-amount {
          margin-top: 0.46rem;
          margin-right: 0.32rem;
          .redpack-type {
            display: flex;
            .red-total {
              font-size: 0.72rem;
              width: 1.16rem;
              text-align: right;
              color: #ffffff;
            }
            .red-total-title {
              margin-left: 0.08rem;
              color: #ffffff;
              font-size: 0.24rem;
              padding-top: 0.12rem;
              .rp-type {
                font-size: 0.2rem;
                background-color: rgba(204, 204, 204, 0.4);
                border-radius: 2px;
                padding: 0 1px 2px 1px;
              }
            }
          }
          .to-use {
            display: flex;
            justify-content: center;
            font-size: 0.24rem;
            width: 1.92rem;
            height: 0.4rem;
            border-radius: 0.2rem;
            color: #ffffff;
            margin-top: 0.14rem;
          }
        }
      }
      .item-universal {
        background: url("~@/assets/redpacketDetail/red-universal.png") no-repeat;
        background-size: 100% 100%;
        .to-use {
          border: 1px solid #ffac7f;
        }
      }
      .item-orientation {
        background: url("~@/assets/redpacketDetail/red-orientation.png")
          no-repeat;
        background-size: 100% 100%;
        .to-use {
          border: 1px solid #ff898d;
        }
      }
      .red-item-use {
        background: url("~@/assets/redpacketDetail/red-used.png") no-repeat;
        background-size: 100% 100%;
        .to-use {
          border: 1px solid #cfcfcf;
        }
      }
      .use-method {
        width: 7rem;
        background-color: #ffffff;
        font-size: 0.24rem;
        color: #666666;
        padding: 0 0.26rem 0 0.28rem;
        position: relative;
        top: -0.1rem;
        .desc:first-child {
          padding-top: 0.16rem;
        }
        .desc:last-child {
          padding-bottom: 0.12rem;
        }
      }
    }
  }
  .no-redpacket {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.24rem;
    padding-bottom: 0.5rem;
    .no-redpacket-icon {
      margin-top: 1.15rem;
      width: 1.92rem;
      height: 1.92rem;
      background: url("~@/assets/redpacketDetail/noCoupon.png") no-repeat;
      background-size: 100% 100%;
    }
    .no-redpacket-msg {
      text-align: center;
      margin-top: 0.3rem;
      color: #666666;
      div {
        margin: 0.1rem 0;
      }
    }
    .to-get-redpacket {
      margin-top: 0.2rem;
      width: 2rem;
      height: 0.64rem;
      border: 1px solid #f98d31;
      color: #f98d31;
      text-align: center;
      line-height: 0.62rem;
      border-radius: 0.31rem;
    }
  }
}
</style>
