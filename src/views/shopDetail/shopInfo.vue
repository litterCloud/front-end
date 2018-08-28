<template>
  <div class="shop" v-if="bool">
    <div class="tencent-map-div"  v-if="openMap">
      <div id="qqmap"></div>
      <div class="backMap" @click.stop="backMap"></div>
    </div>
    <div class="shop-info">
      <div class="store-head">
        <div class="store-icon" @click="showStoreImg">
          <img :src="storeDetail.images[0]" alt="">
          <div class="img-num">共{{storeDetail.images.length || 0}}张</div>
        </div>
        <div class="center">
          <div class="shop-name">{{storeDetail.storeName}}</div>
          <div class="level">
            <div class="level-left">
              <rater class="rater" star=" " v-model="storeDetail.starLevel" :max="5" active-color="#ffa901" disabled :font-size="16"></rater>
            </div>

          </div>
          <div class="notice" v-if="(storeDetail.marks || []).length>0">
            <div v-for="item in storeDetail.marks" class="notice-item">{{item}}</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left" @click="openMapDiv">
          <div class="line line-address">
            <img src="../../assets/shopDetail/position.png" alt="" >
            <div>{{storeDetail.address}}</div>
          </div>
          <div class="line line-position">
            <div class="distance">{{distance}}</div>
            <div class="stick" v-show="(distance.length>0) && (needTime.length >0)"></div>
            <div class="need-time" v-if="needTime">{{needTime}}</div>
          </div>
        </div>
        <div class="bottom-right">
          <img src="../../assets/shopDetail/call.png" @click="show">
          <actionsheet v-model="showCall" :menus="menus2" @on-click-menu="goCall" show-cancel></actionsheet>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left" @click="openMapDiv">
          <div class="line line-time">
            <img src="../../assets/shopDetail/work-time.png" alt="" >
            <div class="time">营业时间：{{storeDetail.busiStartTime}}-{{storeDetail.busiEndTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="gray"></div>
    <div class="red-env">
      <div class="left" :class="{'moneyd':true}">
        <div class="left-money" >{{money || "0.00"}}</div>
        <div class="money-type" >联通红包</div>
      </div>
      <div class="right">
        <show-hide :defaultNum="2">
          <div class="right-t" slot="item" v-for="item in storeDetail.activities">
            <div class="icon" v-bind:style="{backgroundColor:item.color}">{{item.benefitType}}</div>
            {{item.activityName}}
          </div>
        </show-hide>
      </div>
    </div>
    <div class="store-img-show" v-show="showImg" @click="closeStoreImgShow">
      <swiper  dots-position="center" @on-index-change="onIndexChange" :index="swiperIndex">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in storeDetail.images" :key="index"><img :src="item"></swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swiper } from "vux";
import { SwiperItem } from "vux";
import { Actionsheet } from "vux";
import { Rater } from "vux";
import shopHeader from "@/components/shopHeader";
import ShowHide from "@/components/showHide.vue";
import { getUserPosition } from "@/api/methods";

Vue.component("swiper", Swiper);
Vue.component("actionsheet", Actionsheet);
export default {
  name: "",
  props: ["componentId", "storeDetail"],
  data: function() {
    return {
      showImg: false,
      bool: false,
      money: 0,
      getLoc: true,
      distance: "",
      needTime: "",
      currentPoint: null,
      storePoint: null,
      swiperIndex: 0,
      showCall: false,
      menus2: {
        menu1: ""
      },
      openMap: false,
      getLocationing: false,
      map: false,
      currentMarker: false,
      storeMarker: false,
      drivingServiceFlag: false //是否已规划驾车路线
    };
  },
  created: function() {},
  computed: {
    cityName() {
      return this.$store.state.IpPosition.name;
    },
    position() {
      return this.$store.state.position;
    }
  },
  methods: {
    //打开门店图片详情
    showStoreImg() {
      let vm = this;
      vm.showImg = true;
      vm.$emit("showImgFn", true);
      console.log("open");
    },
    //关闭门店图片详情
    closeStoreImgShow() {
      let vm = this;
      vm.showImg = false;
      vm.$emit("showImgFn", false);
      console.log("close");
    },
    //获得用户精准的地理位置
    getUserPosition,
    //获取当前位置--腾讯地图
    getLocation: function() {
      var vm = this;
      if (
        vm.position &&
        vm.position.lat &&
        vm.position.lng &&
        vm.storeDetail.latitude &&
        vm.storeDetail.longitude
      ) {
        if (
          vm.$store.state.handleAddress.city &&
          !vm.$store.state.handleAddress.lng
        ) {
          return false;
        }
        vm.storePoint = {
          lng: vm.storeDetail.longitude,
          lat: vm.storeDetail.latitude
        };
        vm.currentPoint = {
          lat: vm.position.lat,
          lng: vm.position.lng
        };
        vm.getDistanceQQ(vm.storePoint, vm.currentPoint);
      }
    },
    //获取当前位置到店家的距离--腾讯地图
    getDistanceQQ: function(point1, point2) {
      var vm = this;
      var a = new qq.maps.LatLng(point1.lat, point1.lng);
      var b = new qq.maps.LatLng(point2.lat, point2.lng);
      var distance = qq.maps.geometry.spherical.computeDistanceBetween(a, b);
      var needTime = Math.floor(distance / 80);
      vm.distanceFormat(distance, needTime);
    },
    //格式化所获得距离和时间
    distanceFormat: function(distance, needTime) {
      var vm = this;
      vm.distance = (distance / 1000).toFixed(2) + "km";
      if (needTime < 60) {
        //小于60分钟
        vm.needTime = needTime + "分钟";
      } else if (distance / 60 <= 24) {
        //1h到24h之间
        vm.needTime = (needTime / 60).toFixed(2) + "小时";
      } else {
        //大于24小时
        vm.needTime = "大于1天";
      }
    },
    onIndexChange(index) {
      this.swiperIndex = index;
    },
    show() {
      this.showCall = !this.showCall;
    },
    //去打电话
    goCall(e) {
      let vm = this;
      if (e == "menu1" && vm.$util.getData("userFrom") != 1) {
        window.location.href = "tel://" + vm.storeDetail.contactPhone;
      }
    },
    link: function() {},
    openMapDiv() {
      let vm = this;
      if (vm.storeDetail.latitude && vm.storeDetail.longitude) {
        vm.openMap = true;
        let storeMarker = function(opts) {
          qq.maps.Overlay.call(this, opts);
        };
        storeMarker.prototype = new qq.maps.Overlay();
        storeMarker.prototype.construct = function() {
          this.dom = document.createElement("div");
          this.dom.style.color = " #5392FF";
          this.dom.style.width = "320px";
          this.dom.style.height = "60px";
          this.dom.style.background = "#FFFFFF";
          this.dom.style.position = "absolute";
          this.dom.style.borderRadius = "8px";
          this.dom.style.boxShadow = "0 0 4px 0 rgba(0,0,0,0.15)";

          let content = document.createElement("div");
          content.style.display = "flex";
          content.style.width = "100%";
          content.style.height = "100%";
          content.style.justifyContent = "space-between";
          content.style.alignItems = "center";
          content.style.padding = "10px";
          content.style.backgroundColor = "#FFFFFF";
          content.style.position = "absolute";
          content.style.borderRadius = "8px";
          content.style.zIndex = "2";
          let div = document.createElement("div");
          let shopName = document.createElement("div");
          shopName.style.color = "#000000";
          shopName.style.fontSize = "16px";
          shopName.innerHTML = vm.storeDetail.storeName;

          let shopAdd = document.createElement("div");
          shopAdd.innerHTML = vm.storeDetail.address;
          shopAdd.style.color = "#666666";
          shopAdd.style.fontSize = "12px";
          div.appendChild(shopName);
          div.appendChild(shopAdd);
          content.appendChild(div);

          let btn = document.createElement("btn");
          btn.style.display = "block";
          btn.style.width = "56px";
          btn.style.height = "24px";
          btn.style.lineHeight = "24px";
          btn.style.textAlign = "center";
          btn.style.backgroundImage =
            "linear-gradient(45deg, #FF9B46 0%, #FF371F 100%)";
          btn.style.borderRadius = "12px";
          btn.style.color = "#FFFFFF";
          btn.style.fontSize = "12px";
          btn.innerHTML = "导航";
          content.appendChild(btn);
          let arrow = document.createElement("div");
          arrow.style.backgroundColor = "#FFFFFF";
          arrow.style.width = "20px";
          arrow.style.height = "20px";
          arrow.style.position = "absolute";
          arrow.style.left = "142px";
          arrow.style.bottom = "-10px";
          arrow.style.boxShadow = "0 4px 4px 0 rgba(0,0,0,0.15)";
          arrow.style.transform = "rotate(-45deg)";
          this.dom.appendChild(content);
          this.dom.appendChild(arrow);

          //将dom添加到覆盖物层，overlayLayer的顺序为容器 1，此容器中包含Polyline、Polygon、GroundOverlay等
          this.getPanes().overlayMouseTarget.appendChild(this.dom);
          btn.onclick = function() {
            console.log("引导下载");
            location.href =
              "https://apis.map.qq.com/uri/v1/routeplan?type=walk&fromcoord=" +
              vm.position.lat +
              "," +
              vm.position.lng +
              "&to=" +
              vm.storeDetail.storeName +
              "&tocoord=" +
              vm.storeDetail.latitude +
              "," +
              vm.storeDetail.longitude +
              "&policy=2&referer=广东o2o红包项目";
          };
        };
        //绘制和更新自定义的dom元素
        storeMarker.prototype.draw = function() {
          //获取地理经纬度坐标
          var position = this.get("position");
          if (position) {
            //根据经纬度坐标计算相对于地图外部容器左上角的相对像素坐标
            //var pixel = this.getProjection().fromLatLngToContainerPixel(position);
            //根据经纬度坐标计算相对于地图内部容器原点的相对像素坐标
            var pixel = this.getProjection().fromLatLngToDivPixel(position);
            this.dom.style.left = pixel.getX() - 160 + "px";
            this.dom.style.top = pixel.getY() - 150 + "px";
            console.log(pixel);
            console.log("pixel");
          }
        };

        storeMarker.prototype.destroy = function() {
          //移除dom
          this.dom.parentNode.removeChild(this.dom);
        };
        vm.$nextTick(function() {
          vm.map = new qq.maps.Map(document.getElementById("qqmap"), {
            center: new qq.maps.LatLng(
              vm.storeDetail.latitude,
              vm.storeDetail.longitude
            ), // 地图的中心地理坐标。
            zoom: 13, // 地图的缩放级别。
            mapTypeControl: false, //地图类型关闭
            zoomControl: false, //缩放控件关闭
            panControl: false, // 平移控件关闭
            noClear: true
          });
          //目标位置
          //            vm.storeMarker=new qq.maps.Marker({
          //              position:new qq.maps.LatLng(vm.storeDetail.latitude,vm.storeDetail.longitude),
          //              animation:qq.maps.MarkerAnimation.DROP,
          //              map:vm.map,
          //              icon:vm.storeDetail.storeLogo ? new qq.maps.MarkerImage(vm.storeDetail.storeLogo,new qq.maps.Size(24, 24),new qq.maps.Point(0, 0),new qq.maps.Point(0, 0),new qq.maps.Size(24, 24)) : undefined
          //            });
          vm.storeMarker = new storeMarker({
            map: vm.map,
            position: new qq.maps.LatLng(
              vm.storeDetail.latitude,
              vm.storeDetail.longitude
            )
          });

          let markerImg = new qq.maps.MarkerImage(
            require("../../assets/icon/icon-position.png"),
            new qq.maps.Size(32, 64),
            new qq.maps.Point(0, 0),
            new qq.maps.Point(16, 64),
            new qq.maps.Size(16, 34)
          );
          let marker = new qq.maps.Marker({
            map: vm.map,
            position: new qq.maps.LatLng(
              vm.storeDetail.latitude,
              vm.storeDetail.longitude
            )
          });
          marker.setIcon(markerImg);
          marker.setShadow(markerImg);

          /*if(vm.position.lat && vm.position.lng){
              vm.currentMarker = new qq.maps.Marker({
                position:new qq.maps.LatLng(vm.position.lat,vm.position.lng),
                animation:qq.maps.MarkerAnimation.DROP,
                map:vm.map
              });
            }*/
        });
      } else {
        vm.openMap = false;
      }
    },
    backMap() {
      let vm = this;
      vm.openMap = false;
      vm.map = false;
      vm.currentMarker = false;
      vm.storeMarker = false;
      vm.drivingServiceFlag = false;
    },
    getThePosition() {
      let vm = this;
      if (vm.getLocationing) {
        vm.$vux.toast.text("正在获取定位信息。。。");
        return false;
      }
      vm.getLocationing = true;
      vm
        .getUserPosition()
        .then(function(returnData) {
          vm.getLocationing = false;
          let latLng = new qq.maps.LatLng(returnData.lat, returnData.lng);
          if (vm.currentMarker) {
            vm.currentMarker.setPosition(latLng);
          } else {
            vm.currentMarker = new qq.maps.Marker({
              position: latLng,
              animation: qq.maps.MarkerAnimation.DROP,
              map: vm.map
            });
          }
          vm.map.panTo(latLng);
        })
        .catch(function(error) {
          vm.getLocationing = false;
          if (error.errorCode == 1) {
            vm.$vux.toast.text('位置获取失败，无获取地理位置的权限"');
          } else {
            vm.$vux.toast.text("位置获取失败.");
          }
        });
    },
    goToStoreMarker() {
      let vm = this;
      //        vm.map.panTo(vm.storeMarker.getPosition());
      vm.map.panTo(
        new qq.maps.LatLng(vm.storeDetail.latitude, vm.storeDetail.longitude)
      );
    },
    findRute() {
      let vm = this;
      if (vm.drivingServiceFlag) {
        vm.$vux.toast.text("正在规划路线。。。");
        return false;
      }

      if (vm.storeMarker && vm.currentMarker) {
        vm.drivingServiceFlag = true;
        var drivingService = new qq.maps.DrivingService({
          //设置回调函数
          complete: function(result) {
            vm.drivingServiceFlag = false;
          },
          //设置检索失败回调函数
          error: function(data) {
            vm.drivingServiceFlag = false;
          },
          //展现结果的地图实例
          map: vm.map
          //展现结果
          //            panel: document.getElementById('qqmap')
        });
        drivingService.search(
          vm.currentMarker.getPosition(),
          new qq.maps.LatLng(vm.storeDetail.latitude, vm.storeDetail.longitude)
        );
      } else {
        vm.$vux.toast.text("未能获取定位信息。");
        console.log("请获取自己的位置信息");
      }
    }
  },
  watch: {
    storeDetail: function(newValue, oldValue) {
      var vm = this;
      if (vm.getLoc && newValue.latitude && newValue.longitude) {
        vm.getLocation(); //腾讯地图
      }
      if (newValue.storeName) {
        vm.bool = true; //说明父组件把数据传过来了
      }
      if (vm.getLoc && newValue.contactPhone) {
        //商家手机号
        vm.menus2.menu1 = vm.storeDetail.contactPhone;
      }
      if (vm.getLoc && newValue.activities) {
        //处理通用红包活动类型
        var activity = vm.storeDetail.activities;
        for (var i = 0; i < activity.length; i++) {
          activity[i].benefitType = activity[i].benefitKeyword || "";
          activity[i].color = (
            vm.$config.benefitType[activity[i].redpacketType] || {}
          ).color;
        }
      }
      if (newValue.money) {
        vm.money = newValue.money;
      }
      vm.getLoc = false; //标志某些方法只执行一次
    },
    position: {
      handler: function(newValue, oldValue) {
        var vm = this;
        if (newValue && newValue.lat && newValue.lng) {
          vm.getLocation(); //腾讯地图
        }
      },
      immediate: true,
      deep: true
    }
  },
  components: {
    Swiper,
    Actionsheet,
    shopHeader,
    ShowHide,
    SwiperItem,
    Rater
  }
};
</script>

<style scoped lang="less" type="text/less">
.shop {
  color: #040404;
}
.shop-info {
  /*.swiper-demo-img /deep/ img {
      width: 100%;
      height: 100%;
    }*/
  .store-head {
    display: flex;
    height: 2.42rem;
    padding: 0.22rem 0.24rem 0.28rem 0.24rem;
    .store-icon {
      position: relative;
      width: 1.92rem;
      height: 1.92rem;
      img {
        width: 100%;
        height: 100%;
      }
      .img-num {
        width: 0.72rem;
        height: 0.32rem;
        font-size: 0.2rem;
        text-align: center;
        border-radius: 0.16rem;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        right: 0.08rem;
        bottom: 0.08rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .center {
      margin-left: 0.24rem;
      .shop-name {
        @height: 0.3rem;
        font-size: @height;
        line-height: 0.32rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        letter-spacing: -1px;
        font-weight: bold;
        padding: 0.2rem 0 0.16rem 0;
      }
      .level {
        color: #666;
        /*height: @height;
          line-height: @height;*/
        display: flex;
        justify-content: space-between;
        .level-left,
        .time,
        .level-right {
          @height: 0.16rem;
          height: @height;
          line-height: @height;
          font-size: 0.175rem;
        }
        .level-left {
          height: 100%;
          display: flex;
          align-items: center;
          .vux-rater {
            margin-top: -1px;
          }
          /deep/.vux-rater-box {
            width: 0.32rem;
            height: 0.32rem;
            background: url("~@/assets/icon/star-gray.png") no-repeat;
            background-size: 100% 100%;
          }
          /deep/.vux-rater-box.is-active {
            background: url("~@/assets/icon/star-orange.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .level-right {
          display: flex;
          justify-content: right;
          .need-time {
            padding-left: 0.1rem;
            border-left: 1px solid #c3c3c3;
          }
          .distance {
            padding-right: 0.06rem;
          }
        }
      }
      .notice {
        width: auto;
        margin-top: 0.16rem;
        font-size: 0.24rem;
        display: inline-block;
        color: #f86652;
        border: 1px solid #f86652;
        border-radius: 0.06rem;
        padding: 0.04rem 0.07rem;
        .notice-item {
          display: inline-block;
          border-right: 1px solid #f86652;
          padding: 0 0.1rem;
          line-height: 0.18rem;
          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
  .bottom {
    @height: 1.28rem;
    height: @height;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f3f3f3;
    margin: 0 0.26rem;
    padding: 0.24rem 0;
    .bottom-right {
      display: flex;
      img {
        width: 0.44rem;
        height: 0.44rem;
      }
    }
    .bottom-left {
      display: flex;
      flex-direction: column;
      font-size: 0.26rem;
      flex: 1;
      letter-spacing: -1px;
      .line {
        display: flex;
        align-items: center;
      }
      .line-address,
      .line-time {
        img {
          width: 0.24rem;
        }
        div {
          margin-left: 0.14rem;
          font-size: 0.28rem;
          line-height: 0.4rem;
        }
      }
      .line-position {
        padding-left: 0.38rem;
        div {
          color: #666666;
          font-size: 0.24rem;
          line-height: 0.34rem;
        }
        .stick {
          margin: 0 0.12rem;
          width: 0.02rem;
          height: 0.18rem;
          background: #d8d8d8;
        }
      }
    }
    .bottom-right {
      padding-left: 0.31rem;
      /*border-left: 1px solid #c3c3c3;*/
    }
  }
}
.gray {
  height: 0.26rem;
  background: #f3f3f3;
}
.red-env {
  min-height: 1.28rem;
  padding: 0.09rem 0.31rem;
  display: flex;
  .left {
    height: 1.12rem;
    width: 1.55rem;
    margin-left: -0.13rem;
    text-align: center;
    line-height: 0.84rem;
    font-size: 0.2rem;
    color: #ffffff;

    .left-money {
      height: 0.5rem;
      padding-right: 0.4rem;
      font-size: 0.28rem;
      font-weight: 500;
      padding-left: 0.4rem;
    }
    .money-type {
      font-size: 0.2rem;
    }
    .left-yuan {
    }
  }

  .moneyd {
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("../../assets/shopDetail/redPacked02.png");
  }
  .right {
    font-size: 0.22rem;
    overflow: hidden;
    flex-grow: 1;
    margin-top: 0.22rem;
    margin-bottom: 0.22rem;
    .right-t {
      @height: 0.32rem;
      height: @height;
      line-height: @height;
      display: flex;
      align-items: baseline;
    }
    .icon {
      @height: 0.3rem;
      min-width: @height;
      height: @height;
      color: #fff;
      border-radius: 0.05rem;
      font-size: 0.18rem;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 0 0.19rem 0 0.17rem;
    }
  }
}
.tencent-map-div {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color: #fff;
  #qqmap {
    width: 100%;
    height: 100%;
  }
  .backMap {
    width: 0.7rem;
    height: 0.8rem;
    position: fixed;
    top: 0.4rem;
    left: 0.4rem;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    border: 1px solid #e5e5e5;
  }
  .backMap:before {
    content: "";
    display: inline-block;
    margin-left: 0.25rem;
    width: 0.3rem;
    height: 0.3rem;
    border-top: solid 2px #ff6525;
    border-right: solid 2px #ff6525;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }

  .map-detail {
    padding-top: 0.26rem;
    padding-left: 0.24rem;
    padding-right: 0.3rem;
    width: 100%;
    position: fixed;
    bottom: 0px;
    background-color: #fff;
    .popo {
      width: 0.58rem;
      height: 0.58rem;
      background-color: #fff;
      color: #000;
      top: -0.9rem;
      left: 0.4rem;
      padding: 0.1rem;
      display: flex;
      position: absolute;
      align-items: center;
      justify-content: space-between;
      .popo-circle {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #777777;
        padding: 0.1rem;
        position: relative;
        .popo-small-circle {
          width: 100%;
          height: 100%;
          border: 1px solid #777777;
          border-radius: 50%;
        }
      }
      .popo-circle:before {
        content: "";
        position: absolute;
        left: -2px;
        top: 0.15rem;
        width: 0.2rem;
        height: 1px;
        border-left: solid 0.12rem #777777;
        border-right: solid 0.12rem #777777;
      }
      .popo-circle:after {
        content: "";
        position: absolute;
        left: 0.16rem;
        top: -2px;
        width: 1px;
        height: 0.18rem;
        border-top: solid 0.12rem #777777;
        border-bottom: solid 0.12rem #777777;
      }
    }
    .map-detail-content {
      display: flex;
      padding-bottom: 0.24rem;
      border-bottom: 1px solid #f3f3f3;
    }
    .map-detail-left {
      width: 1.02rem;
      height: 1.02rem;
      margin-right: 0.2rem;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .map-detail-right {
      flex-grow: 1;
      .map-detail-title {
        display: flex;
        justify-content: space-between;
        line-height: 0.28rem;
        align-items: baseline;
        padding-bottom: 0.24rem;
        .title {
          font-size: 0.26rem;
        }
        .distance {
          font-size: 0.18rem;
          color: #666;
          flex-shrink: 0;
        }
      }
      .map-detail-address {
        font-size: 0.2rem;
        line-height: 0.22rem;
        color: #464646;
      }
    }
    .map-detail-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.14rem 0;
      .map-detail-time {
        font-size: 0.2rem;
        color: #464646;
      }
      .map-detail-route {
        line-height: 0.4rem;
        border: 1px solid #d42f36;
        font-size: 0.2rem;
        color: #d42f36;
        padding: 0 0.2rem;
        border-radius: 0.2rem;
      }
    }
  }
}
.store-img-show {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #000000;
  padding-top: 1.68rem;
  z-index: 1;
  /deep/ .vux-slider {
    .vux-swiper {
      height: 7.5rem !important;
      .vux-swiper-item {
        img {
          width: 100%;
          margin-top: 50%;
          transform: translateY(-50%);
          // height:100%;
        }
      }
    }
    .vux-indicator-center {
      position: fixed;
      .vux-icon-dot {
        width: 0.16rem;
        height: 0.16rem;
        background-color: #ffffff;
        opacity: 0.5;
      }
      .vux-icon-dot.active {
        opacity: 1;
      }
    }
  }
}
</style>
