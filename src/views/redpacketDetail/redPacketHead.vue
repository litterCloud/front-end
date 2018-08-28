<template>
  <div class="redpacket-head">
    <div class="redpacket-detail">
      <div class="user-tel">
        <div class="tel-icon"></div>
        <div class="tel">{{phoneNum | phoneFormatEncryption}}</div>
      </div>
      <div class="redpacket-total">
        <div class="red-total">
          <div class="redpacket-desc">红包总金额(元)</div>
          <div class="redpacket-count">
            <span class="price-num">{{String(radpackTotal).split('.')[0]}}<span class="small-num" v-if="radpackTotal.toString().indexOf('.') != -1">.{{String(radpackTotal).split('.')[1]}}</span></span>
          </div>
        </div>
        <div class="red-detail" v-if="Number(radpackTotal)>0">
          <div class="universal-red">
            <span>通用劵：{{String(universalTotal).split('.')[0]}}<span class="small-num" v-if="universalTotal.toString().indexOf('.') != -1">.{{String(universalTotal).split('.')[1]}}</span></span>
          </div>
          <div class="orientation-red">
            <span>定向劵：{{String(orientationTotal).split('.')[0]}}<span class="small-num" v-if="orientationTotal.toString().indexOf('.') != -1">.{{String(orientationTotal).split('.')[1]}}</span></span>
          </div>
        </div>
        <div class="to-recharge-btn" v-if="!Number(radpackTotal)>0" @click="toRecharge" touchId="TOUCH_CODE_001" pageCode="PAGE_CODE_006">去领红包</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getReadPacketMoney, filterActivityUrl } from "@/api/methods";
export default {
  components: {},
  name: "redPacketHead",
  data() {
    return {
      redActivityLink: false
    };
  },
  props: ["componentId"],
  computed: {
    userPosition() {
      let vm = this;
      return (
        vm.$store.state.handleAddress.city ||
        this.$store.state.position.city ||
        vm.$store.state.IpPosition.name
      );
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
    radpackTotal() {
      return this.$store.state.userInfo.redPacket.total;
    },
    phoneNum() {
      return this.$store.state.userInfo.tel;
    },
    positionAddress() {
      return (
        this.$store.state.handleAddress.address ||
        this.$store.state.handleAddress.city ||
        this.$store.state.position.address ||
        this.$store.state.IpPosition.name ||
        "没定位成功哟~"
      );
    },
    universalTotal() {
      return this.$store.state.userInfo.redPacket.universalTotal;
    },
    orientationTotal() {
      return this.$store.state.userInfo.redPacket.orientationTotal;
    }
  },
  methods: {
    filterActivityUrl,
    getReadPacketMoney,
    loadActivity() {
      let vm = this;
      vm.$util
        .getCacheOrAjaxData(
          vm.queryActivity.city + vm.queryActivity.componentId + "head",
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
    /*去充值*/
    toRecharge() {
      let vm = this;
      location.href = vm.filterActivityUrl(this.redActivityLink);
    },
    toRedPacket() {
      this.$router.push("toRedPacket");
    },
    toLogin() {
      this.$router.push("toLogin");
    },
    goToCityList() {
      this.$router.push("cityList");
    }
  },
  watch: {
    phoneNum: {
      handler: function(newVal, oldVal) {
        let vm = this;
        if (newVal) {
          vm.getReadPacketMoney(newVal);
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
  },
  created() {}
};
</script>
<style scoped lang="less">
.redpacket-head {
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.2rem;
  .redpacket-detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 7.02rem;
    height: 2.54rem;
    background: url("~@/assets/home/head-bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0.32rem 0 0 0.32rem;
    font-size: 0.24rem;
    color: #ffffff;
    .user-tel {
      height: 0.48rem;
      display: flex;
      .tel-icon {
        width: 0.48rem;
        background: url("~@/assets/home/tel-icon.png") no-repeat;
        background-size: 100% 100%;
      }
      .tel {
        margin-left: 0.12rem;
        padding: 0.12rem 0;
      }
    }
    .redpacket-total {
      display: flex;
      margin-top: 0.28rem;
      justify-content: space-between;
      align-items: flex-end;
      .red-total {
        .redpacket-count {
          font-size: 0.8rem;
          span.price-num {
            position: relative;
            bottom: 0.12rem;
            .small-num {
              font-size: 0.4rem;
            }
          }
        }
      }
      .red-detail {
        display: flex;
        font-size: 0.24rem;
        background: rgba(0, 0, 0, 0.2);
        width: 4.12rem;
        height: 0.48rem;
        border-radius: 0.24rem;
        padding: 0.06rem 0.2rem;
        margin-right: 0.32rem;
        margin-bottom: 0.28rem;
        div {
          display: flex;
          justify-content: center;
          width: 50%;
        }
        .universal-red {
          border-right: 1px solid #ffffff;
        }
      }
      .to-recharge-btn {
        width: 1.6rem;
        height: 0.48rem;
        border: 0.02rem solid #ffffff;
        border-radius: 0.24rem;
        color: #ffffff;
        font-size: 0.24rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.32rem;
        margin-bottom: 0.28rem;
      }
    }
  }
}
</style>
