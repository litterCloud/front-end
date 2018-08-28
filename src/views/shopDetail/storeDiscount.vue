<template>
  <div class="shore-discount">
    <div class="gray" v-if="(benefitGood || []).length>0"></div>
    <div class="good-area" v-if="(benefitGood || []).length>0">
      <div class="title">店铺优惠</div>
      <div class="nav-one" v-for="item in benefitGood" :key>
        <div class="n-o-left">
          <div class="food-icon">
            <img v-bind:src="item.goodsIconUrl" alt="">
          </div>
        </div>
        <div class="n-o-right">
          <div class="food-name">{{item.goodsName}}</div>
          <div class="price">
            <div class="now-price" v-if="item.currentPriceStr">￥{{item.currentPriceStr}}</div>
            <div class="old-price" v-if="item.originPriceStr">原价：￥{{item.originPriceStr}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="gray" v-if="(benefitGood || []).length>0"></div>

    <div class="cooperate-area" touchId="TOUCH_CODE_001" pageCode="PAGE_CODE_005" v-if="(benefitGood || []).length>0">
      <div class="title">优惠活动</div>
      <div class="nav-two" v-for="item in cooperate" :key :touchAxtiveId = "item.marketingActivityId" :touchActiveUrl = "item.promotionImageUrl">
        <div class="n-t-left">
          <div class="food-icon">
            <img :src="item.promotionImageUrl" alt="">
          </div>
          <div class="food-name">
            <div class="info-one" v-html="item.activityName"></div>
            <div class="info-two">{{item.activitySummery}}</div>
          </div>
        </div>
        <div class="n-o-right">
          <div class="go-pay" @click="goPay(item.detailUrl)">{{item.activityGuideWords}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { filterActivityUrl } from "@/api/methods.js";
export default {
  name: "",
  props: ["componentId", "benefitGoods", "cooperateActivities"],
  data: function() {
    return {
      benefitGood: [],
      cooperate: []
    };
  },
  methods: {
    filterActivityUrl,
    goPay: function(url) {
      location.href = this.filterActivityUrl(url);
    }
  },
  watch: {
    benefitGoods: function(newValue, oldValue) {
      var self = this;
      if (typeof newValue != "undefined" && newValue.length > 0) {
        self.benefitGood = self.benefitGoods;
      }
    },
    cooperateActivities: function(newValue, oldValue) {
      var self = this;
      if (typeof newValue != "undefined" && newValue.length > 0) {
        self.cooperate = self.cooperateActivities;
      }
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
.gray {
  height: 0.26rem;
  background: #f3f3f3;
}
.shore-discount {
  .good-area,
  .cooperate-area {
    padding: 0.16rem 0.33rem;
  }
  .title {
    @height: 0.61rem;
    padding-left: 0.18rem;
    height: @height;
    line-height: @height;
    font-size: 0.3rem;
    font-weight: bold;
  }
  .nav-one {
    display: flex;
    padding: 0.28rem 0;
    border-top: 1px solid #f0f0f0;
    .n-o-left {
      display: flex;
      align-items: center;
      .food-icon {
        display: flex;
        justify-content: center;
        width: 1.12rem;
        height: 1.12rem;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
          border: 1px solid #f3f3f3;
        }
      }
    }
    .n-o-right {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.24rem;
      div {
        text-align: left;
      }
      .price {
        display: flex;
        .now-price {
          color: #ff4123;
          font-size: 0.36rem;
        }
        .old-price {
          margin-left: 0.2rem;
          padding: 0.06rem 0;
          color: #666666;
          font-size: 0.24rem;
          text-decoration: line-through;
        }
      }
      .food-name {
        color: #000000;
        font-size: 0.32rem;
        padding-left: 0.16rem;
        word-break: break-all;
        font-weight: bold;
      }
    }
  }
  .nav-two {
    display: flex;
    justify-content: space-between;
    min-height: 1.45rem;
    border-bottom: 1px solid #f1f1f1;
    .n-t-left {
      display: flex;
      align-items: center;
      width: 75%;
      .food-icon {
        display: flex;
        justify-content: center;
        width: 1.12rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .food-name {
        color: #333;
        padding-left: 0.16rem;
        flex: 1;
        font-weight: bold;
        .info-one {
          font-size: 0.32rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 3rem;
        }
        .info-two {
          font-size: 0.24rem;
          color: #666666;
          /*min-height: 0.47rem;*/
          /*line-height: 0.47rem;*/
          font-weight: 300;
        }
      }
    }
    .n-o-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .go-pay {
        width: 1.28rem;
        height: 0.48rem;
        color: #fff;
        background-image: linear-gradient(45deg, #ff9b46 0%, #ff371f 100%);
        border-radius: 0.32rem;
        font-size: 0.24rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
