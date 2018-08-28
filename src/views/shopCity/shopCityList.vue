<template>
    <div class="shop-city-list">
      <!-- <div class="list-title">
        <div class="heng"></div>
        <div class="dian"></div>
        <div class="title">{{shopListTitle}} </div>
        <div class="dian"></div>
        <div class="heng"></div>
      </div> -->
      <div class="list-area" v-infinite-scroll="loadMore"  infinite-scroll-distance="60" infinite-scroll-disabled="isLoading" touchId="TOUCH_CODE_007" pageCode="PAGE_CODE_005" >

        <div class="list-item" v-for="(item,index) in shopList" :touchStoreId="item.storeId" :key="item.key" @click="goToDeatils($event,item)">
          <div class="list-item-img">
            <div class="top-left " :class="{yellow:(item.storeSpecialMark || '').length>0}">
              {{item.storeSpecialMark || ''}}
            </div>
            <img :src="item.storeLogo">
          </div>

          <div class="list-item-right clearfix">
            <div class="item-title">{{item.storeName}}</div>
            <div class="item-middle">
              <div class="star">
                <rater star=" " v-model="item.starLevel" :disabled="true" :font-size="16"></rater>
              </div>
            </div>
            <div class="item-middle">
              <div class="item-middle-left">
                <div class="time">{{item.busiStartTime}}-{{item.busiEndTime}}</div>
              </div>
              <div class="item-middle-right" v-if="item.distance">{{item.distance}} | {{item.minutes}}</div>
            </div>
            <div class="clearfix list-youhui" :style="showBorderBottom(item)">
              <div class="item-youhui" v-if="(item.storeMarks || []).length>0">
                <div class="youhui-item" v-for="i in item.storeMarks">{{i}}</div>
              </div>
            </div>
            <div class="item-activity">
              <show-hide :defaultNum="2" @active="activeFn(index,$event)" v-if="(item.activities || []).length>0">
                <div slot="item" class="activity-item" v-for="j in item.activities">
                  <div class="activity-type"  v-if="j.benefitKeyword" :style="showActivityIcon(j)">{{j.benefitKeyword}}</div>
                  <div class="activity-title" :class="{active:item.issActive}" v-html="$util.replaceStr(j.activityName || '',2)"></div>
                </div>
              </show-hide>
            </div>
          </div>
        </div>
        <load-more :show-loading="true"  background-color="#fbf9fe" v-if="isLoading && !xhrCounter && current"></load-more>
        <load-more :show-loading="false" tip="我是有底线的" background-color="#fbf9fe" v-if="!current"></load-more>
        <div class="load-more" v-if="xhrCounter" ><span class="load-more-text" @click="loadMore">加载更多</span></div>
      </div>
    </div>
</template>
<script>
  import { Rater } from 'vux'
  import ShowHide from "@/components/showHide.vue";

  export default {
        components: {
          Rater,
          ShowHide
        },
        data() {
          return {
            shopList: [],
            shopListTitle: "联通特邀商户",
            pageSize:5,
            shopListUrl:"getShopList",
            current:1,
            isLoading:true,
            cacheId:[],
            xhrCounter:false,
            storeListcancel:false  //门店列表的取消函数
          }

        },
        props: {
          componentId:{}
        },
        computed: {
          position(){
            return{
              cityName: this.$store.state.handleAddress.city || this.$store.state.position.city || this.$store.state.IpPosition.name,
              lat:this.$store.state.handleAddress.city ? this.$store.state.handleAddress.lat :this.$store.state.position.lat,
              lng:this.$store.state.handleAddress.city ? this.$store.state.handleAddress.lng :this.$store.state.position.lng
            }

          },
        },
        methods: {
          showActivityIcon(j) {
            if (j.benefitType === '02') {
              return {
                background: (this.$config['benefitType'][j.benefitType] || {}).color 
              }
            } else {
              return {
                backgroundColor: (this.$config['benefitType'][j.benefitType] || {}).color 
              }
            }
            
          },
          showBorderBottom(item) {
            if ((item.activities || []).length>0) {
              return {
                borderBottom: '1px solid #F3F3F3'
              }
            }
          },
          goToDeatils(event,item){
            if(item.detailUrl){
              location.href = item.detailUrl;
            }else{
              this.$router.push({name: "shopDetail", query: {merchantId: item.merchantsId || "",storeId: item.storeId,ticket:this.$parent.$data.ticket || ""}});

            }
          },
          loadMore(event,flag) {
            let vm = this;
            vm.isLoading = true;
            vm.xhrCounter =false;
            if (vm.current) {
              vm.$axios.post(
                vm.$util.getUrl(vm.shopListUrl),
                {
                  province:"",
                  city:vm.position.cityName,
                  touchSpotType:vm.$config.touchSpotType,
                  latitudeWeb:vm.position.lat || "",
                  longitudeWeb:vm.position.lng || "",
                  pageSize: vm.pageSize,
                  current: vm.current
                },{
                  cancelToken: vm.cancelStoreList().token
                }).then(function (returnData) {
                if((returnData.rows || []).length == 0 && returnData.recordsTotal > 0) {
                    vm.xhrCounter = true;
                }else{
                  vm.xhrCounter =false;
                  vm.shopList = (vm["shopList"] || []).concat(vm.handleShopList(returnData.rows || [],vm.position.lat));
                  if (returnData.recordsTotal > vm.current * vm.pageSize) {
                    vm.isLoading = false;
                    vm.current = vm.current + 1;
                  } else {
                    vm.current = false;
                  }
                }
              }).catch(function (error) {
                vm.xhrCounter =true;
                console.log(error);
              })

            }
          },
          activeFn(index,active){
            let vm = this;
            let data = vm.shopList[index];
            if(data["issActive"] === undefined){
              data["issActive"] = active;
              vm.shopList.splice(index,1,JSON.parse(JSON.stringify(data)))
            }else{
              data["issActive"] = active;
            }
          },
          handleShopList(list = [],flag=false){
            let vm = this;
            list = vm.$util.setKey(list,"key");
            if(flag){
              let latlng = new qq.maps.LatLng(vm.position.lat,vm.position.lng);
              list.forEach(function (value) {
                if(value.latitude && value.longitude){
                  let _latlng = new qq.maps.LatLng(value.latitude,value.longitude);
                  let distance = parseInt(qq.maps.geometry.spherical.computeDistanceBetween(latlng, _latlng));
                  value.distance = (distance/1000).toFixed(2)+"km"; //距离
                  let minutes = parseInt((distance/80));
                  let flag = "分钟";
                  if(minutes>60&flag=="分钟"){
                    minutes = parseInt((minutes/60));
                    flag = "小时"
                  }
                  if(minutes>24&flag=="小时"){
                    minutes = parseInt((minutes/24));
                    flag = "天"
                  }
                  if(minutes>30&flag=="天"){
                    minutes = parseInt((minutes/30));
                    flag = "月"
                  }
                  if(minutes>12&flag=="月"){
                    minutes = parseInt((minutes/12));
                    flag = "年"
                  }
                  value.minutes = minutes+flag ;//分钟数

                }else{
                  value.distance = ""; //距离
                  value.minutes = "" ;//分钟数
                }

              });
            }else{
              list.forEach(function (value) {
                value.distance = ""; //距离
                value.minutes = "" ;//分钟数
              });
            }
            return list
          },
          cancelStoreList(){
            let vm = this;
            if(vm.storeListcancel){
              vm.storeListcancel.cancel("门店列表请求被正常狙杀");
              vm.storeListcancel = undefined;
            }

            let source = vm.$axios.CancelToken.source();
            vm.storeListcancel = source;
            return source;
          }
        },
        watch: {
          position:{
            handler:function (val,oldVal) {
              let vm = this;
              vm.$util.getCacheOrAjaxData(
                val.cityName+"first",
                vm.$util.getUrl("getFirstShopList"),
                {
                  province:"",
                  city:val.cityName,
                  touchSpotType:vm.$config.touchSpotType,
                }
              ).then(function (returnData) {
                vm.shopList = vm.handleShopList(returnData.rows || [],val.lat);
                vm.isLoading = true;
                vm.current = 1;
                vm.loadMore();

              },function (error) {
                vm.isLoading = true;
                vm.current = 1;
                vm.loadMore();

              })
            },
            immediate: true,
            deep:true
          },

        },
        created() {

        }
    }

</script>
<style scoped lang="less">
  .load-more{
    text-align: center;
    padding-top: 0.2rem;
    padding-bottom: 0.5rem;
    .load-more-text{
      font-size: 0.26rem;
      border: 1px solid #e5e5e5;
      display: inline-block;
      padding: 0.1rem 0.2rem;
      border-radius: 0.3rem;

    }
  }
  .shop-city-list{
    background-color: #fff;

  }
  .list-title{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.3rem;
    .heng{
      height: 2px;
      width: 0.5rem;
      background-color: #bfbdbd;
      margin: 0 0.03rem;
    }
    .dian{
      height: 2px;
      width: 2px;
      background-color: #bfbdbd;
    }
    .title{
      font-size: 0.3rem;
      padding: 0 0.2rem;
      font-weight: bold;

    }
  }
  .list-item{
    padding-top: 0.3rem;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    padding-left: 0.24rem;
    .list-item-img{
      width: 1.92rem;
      height: 1.92rem;
      border: 1px solid #f3f3f3;
      border-radius: 0.05rem;
      margin-left: 0.1rem;
      margin-right: 0.2rem;
      position: relative;
      flex-shrink: 0;
      overflow: hidden;
      .top-left{
        position: absolute;
        color: #FFFFFF;
        display: block;
        /*top: 0.1rem;*/
        /*width: 1.2rem;*/
        width: 0.4rem;
        height:0.36rem;
        left:0.12rem;
        /*padding: 0 0.32rem;*/
        /*left: -0.3rem;*/
        /*transform: rotate(-45deg);*/
        /*font-size: 0.2rem;*/
        font-size: 0.16rem;
        /*overflow: hidden;*/
        /*white-space: nowrap;*/
        line-height: 1.2;
        text-align: center;
        padding:0.06rem 0;
      }
      .orange{
        background-color: orange;
        background-size: 100% 100%;
        top:-0.06rem;
        left:-0.03rem;
      }
      .yellow{
        /*background-color: #fc9005;*/
        background: url('~@/assets/shopCity/special_back.png') no-repeat;
        background-size: 100% 100%;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .list-item-right{
      flex-grow:1;
      flex-shrink: 2;
      .item-title{
        font-size: 0.32rem;
        line-height: 0.32rem;
        font-weight: bold;
      }
      .item-middle{
        line-height: 0.42rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.24rem;
        color: #666;
        .star{
          margin-top:0.08rem;
          /deep/.vux-rater-box {
            background: url("~@/assets/icon/star-gray.png") no-repeat;
            background-size: 100% 100%;
          }
          /deep/.vux-rater-box.is-active {
            background: url("~@/assets/icon/star-orange.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .item-middle-left{
          display: flex;
          .time{
            /*padding-left: 0.1rem;*/
            color:#666;
          }
        }
        .item-middle-right{
          padding-right: 0.2rem;
          color: #666;
        }
      }
      .list-youhui{
        margin-top: 0.1rem;
        padding-bottom: 0.1rem;
        margin-right: 0.24rem;
        // border-bottom: 1px solid #F3F3F3;
        .item-youhui{
          float: left;
          width: auto;
          font-size: 0.24rem;
          display: block;
          color: #f86652;
          border: 1px solid #f86652;
          border-radius: 0.06rem;
          padding: 0;
          .youhui-item{
            display: inline-block;
            border-right: 1px solid #f86652;
            padding: 0 0.1rem;
            line-height: 0.24rem;
            &:last-child{
              border-right:none;

            }
          }

        }
      }

      .line{
        padding-top: 0.12rem;
        border-bottom: 1px dotted #f1f1f1;
        margin-right: 0.25rem;
      }
      .activity-item{
        display: flex;
        padding-top: 0.2rem;
        .activity-type{
          width: 0.28rem;
          height: 0.28rem;
          font-size: 0.24rem;
          line-height: 0.28rem;
          background-color: #3767e1;
          border-radius: 2px;
          color: #fff;
          text-align: center;
        }
        .activity-title{
          font-size: 0.24rem;
          line-height: 0.28rem;
          padding-left: 0.2rem;
          color: #454545;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 3.8rem;
          &.active{
            white-space: normal;
          }
        }
      }

    }
  }
</style>
