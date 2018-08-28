<template>
  <div class="recharge-head" >
    <!--<div class="centerDiv">-->
    <img  class="centerDivTitleImg" src="@/assets/rodRedPacket-kingcard/textImg.png"/>
    <form>
      <div class="centerDivNav">
        <div class="inputBox">
          <label>门店名称</label>
          <input placeholder="请选择门店" @focus="handleinput()" type="text" v-model='search' :disabled="disabled"/>
          <!--<div class="dropdownDoxSty" @click="clidropDownNav">-->
            <!--<div class="dropdownDox"></div>-->
          <!--</div>-->
          <div  class="selectListBox"  >
            <div id="cityList" class="selectList"  v-if="showSelectList">
              <div class="selectListnav" v-for="item in searchData" @click="selectList(item.storeName,item.storeId)" >
                {{item.storeName}}
              </div>

            </div>
          </div>
          <div class="notesred">{{storeName}}</div>
        </div>
        <div class="inputBox">
          <label>店员姓名</label>
          <input type="text" v-model="staffName" :disabled="disabled" />
          <div class="notesred">{{clerkName}}</div>
        </div>
        <div class="inputBox">
          <label>店员手机号码</label>
          <input  type="tel" maxlength="11"  v-model="staffPhone" :disabled="disabled" />
          <img class="clearBtn" src="@/assets/rodRedPacket-kingcard/clearBtn.png" @click="clearBtn">
          <div  :class='notesSure?"notes":"notesred"' >{{notes}}</div>
        </div>
        <div class="inputBox">
          <label>指导员姓名</label>
          <input type="text" v-model="instructorName" :disabled="disabled"/>
          <div class="notesred">{{instructorNamenot}}</div>
        </div>
        <div class="inputBox">
          <label>指导员手机号码</label>
          <input type="tel" maxlength="11" v-model="instructorMobile" :disabled="disabled"/>
          <div class="notesred">{{instructorphnot}}</div>
        </div>
      </div>
    </form>
    <div class="btnsubmit" @click="btnsubmit">确认</div>
    </div>
  <!--</div>-->
</template>
<script>
  import config from '@/config/config.js'
  import {getUserIpPosition, getUserPosition} from '@/api/methods'
  export default {
    components: {

    },
    data() {
      return {
        disabled:false,
        search: '',//模糊搜索内容
        search1: [],//判断模糊搜索重复次数
        showSelectList:true,//模糊搜索是否显示
        clisum:0,//下拉点击次数
        notesSure:true,
        instructorName:"",//指导员
        products: [],//模糊搜索列表
        staffPhone:"",//电话号码
        instructorMobile:"",
        instructorphnot:"",
        staffName:"",
        notes:"用于赏金的发放账户号码",
        storeName:"",
        clerkName:"",
        instructorNamenot:"",
        latitude:"",
        longitude:"",
        storeId:"",
        initstoreId:"",
        provinceCode:"",
        qrcodeUrl:"",
        uuid:''
      }
    },
    props: ['sign'],
    computed: {
      qrcodeUrl(){
        let vm = this;
        console.log(vm.sign);
        if(vm.sign.qrcodeUrl){
          return vm.sign.qrcodeUrl;
        }else{
          let urldata= vm.$util.getAllQueryString();
          return urldata.qrcodeUrl;
        }
      },
      searchData: function() {
        let vm=this;
        var search = this.search;
//        if ((search)&&(vm.search1!=2)) {
        if(search){
          vm.search1.push(search)
          if(vm.search1[vm.search1.length-1]!=vm.search1[vm.search1.length-2]){
          let urldata= vm.$util.getAllQueryString();
            let provinceCode=urldata.provinceCode;
            vm.provinceCode=provinceCode;
            vm.$axios.post(
                vm.$util.getUrl("getKing"),
              {
                "provinceCode":provinceCode,
                "storeName":vm.search,
                "current":1,
                "pageSize":10
            }
            ).then(function (res) {
              vm.products=res.rows;
              //vm.search1++;
            }).catch(function (error) {
              console.log("失败");
            })
          }

          vm.showSelectList=true;
          this.products.filter(function(product) {
            Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(search) > -1
            })
          })

        }
        return this.products;
      }
    },
    created(){
      console.log("初始化");
      let vm=this;
      vm.showSelectList=true;
      let urldata= vm.$util.getAllQueryString();
     // console.log(urldata.storeId)
      vm.qrcodeUrl=urldata.qrcodeUrl;
      vm.uuid = urldata.UUID;
      vm.provinceCode=urldata.provinceCode;
      vm.$axios.post(
        vm.$util.getUrl("getKingstoreId"),
        {
             qrcodeUrl:vm.qrcodeUrl+"?UUID="+vm.uuid
           }
      )
        .then(function (res) {
           if(res.dataExist){
             vm.disabled = true;
             vm.storeId=res.storeId;
             // vm.provinceCode=res.provinceCode;
             vm.search=res.storeName;
             vm.showSelectList=false;
             vm.staffName=res.staffName;
             vm.staffPhone=res.staffPhone;
             vm.instructorName=res.instructorName;
             vm.instructorMobile=res.instructorMobile;
           }
         })
        .catch(function (error) {

         })

      vm.initTencentMap();
    },
    methods: {
      getUserIpPosition,
      getUserPosition,
      initTencentMap() {
        let vm = this;
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://map.qq.com/api/js?v=2.exp&key=${this.$config.tencentMapKey}&&libraries=geometry,autocomplete,drawing,convertor&callback=initTencentMap`;
        document.body.appendChild(script);
        window.initTencentMap = function () {
          vm.getUserIpPosition().then(function (data) {

          }).catch(function (error) {
            console.log(error);
          });
          vm.getUserPosition().then(function (data) {
            vm.latitude=data.lat;
            vm.longitude=data.lng
            /*发送定位信息接口*/

          }).catch(function (error) {
            if (error.errorCode == 1) {
              vm.$vux.toast.text('无获取地理位置的权限.');
            }else{
              vm.$vux.toast.text('定位信息获取失败.');

            }
          })
        }
      },
      clidropDownNav(){
        let vm=this;
        vm.clisum++;
        if(vm.clisum%2==0){
          vm.showSelectList=false;
        }else{
          vm.showSelectList=true;
        }
        vm.$axios({
          url: "/ab",
          data: {
          }
        }).then(function (res) {
          vm.products=res.products
        }).catch(function (error) {
          console.log("失败")
        })
      },
      handleinput(){
        let vm=this;
        vm.showSelectList=true;
      },
      selectList(data,data1){
        let vm=this;
        vm.showSelectList=false;
        vm.search=data;
        vm.storeId=data1;
      },
      clearBtn(){
        let vm=this;
        vm.staffPhone="";
      },
      btnsubmit(){
        console.log("提交按钮点击事件");
        let vm=this;
        if(vm.disabled){
          vm.$vux.toast.text('门店配置成功后，不可修改.');
          return false;
        }
        console.log(vm.provinceCode);
        let myreg = /^[1][2,3,4,5,6,7,8][0-9]{9}$/;
        if (!(myreg.test(vm.staffPhone))) {
          vm.notes="请填写正确得手机号码";
          vm.notesSure=false;
        }else{
          vm.notesSure=true;
          vm.notes="用于赏金的发放账户号码";
        }
        if (!(myreg.test(vm.instructorMobile))) {
          vm.instructorphnot="请填写正确得手机号码";
        }else{
          vm.instructorphnot="";
        }
        if(vm.search==""){
          vm.storeName="请填入门店名称"
        }else if(vm.search!=""){
          vm.storeName=""
        }
        if(vm.staffName==""){
          vm.clerkName="请填入店员姓名"
        }else if(vm.staffName!=""){
          vm.clerkName=""
        }
        if(vm.instructorName==""){
          vm.instructorNamenot="请填入指导员姓名"
        }else if(vm.instructorName!=""){
          vm.instructorNamenot=""
        }
        if((myreg.test(vm.staffPhone))&&(myreg.test(vm.instructorMobile))&&(vm.search!="")&&(vm.staffName!="")&&(vm.instructorName!="")){
          console.log("成功")
          let urldata= vm.$util.getAllQueryString();
           let urll=vm.qrcodeUrl+"?UUID="+urldata.UUID;
           console.log(urll);
          vm.$axios.post(
              vm.$util.getUrl("getKingsubmit"),
            {
              "storeId":vm.storeId,
              "storeName":vm.search,
              "storeLatitude":vm.latitude,
              "storeLongitude":vm.longitude,
              "provinceCode":vm.provinceCode,
              "staffName":vm.staffName,
              "qrcodeUrl":urll,
              "staffPhone":vm.staffPhone,
              "instructorName":vm.instructorName,
              "instructorMobile":vm.instructorMobile
            }
          ).then(function (res) {
//            alert(vm.latitude+","+vm.longitude)
            if(res.respCode!="0000"){
              console.log("提交成功所作操作")
              vm.$emit("changeSign",{
                showDataway:false,
                showSuccess:false,
                showFail:true,
                storeId:vm.storeId,
                provinceCode:vm.provinceCode,
                qrcodeUrl:vm.qrcodeUrl,
                uuId:urldata.UUID
              })
            }else{
              vm.$emit("changeSign",{
                showDataway:false,
                showSuccess:true,
                showFail:false,
                storeId:vm.storeId,
                provinceCode:vm.provinceCode,
                qrcodeUrl:vm.qrcodeUrl,
                uuId:urldata.UUID
              })
            }

          }).catch(function (error) {
            console.log("是啊比")
            vm.$emit("changeSign",{
              showDataway:false,
              showSuccess:false,
              showFail:true,
              storeId:vm.storeId,
              provinceCode:vm.provinceCode,
              qrcodeUrl:vm.qrcodeUrl,
              uuId:urldata.UUID
            })
          })
        }


      }
    },
  }

</script>
<style scoped lang="less" type="text/less">
  .centerDiv{
    min-height: 8rem;
    background-color: #ffffff;
    position: absolute;
    top: 4.61rem;
    width: 6.71rem;
    left: 0.42rem;
    border-radius: 0.2rem;
    text-align: center;
  }
  .centerDivTitleImg{
    width: 3.67rem;
    height: 1.01rem;
    margin-top: 0.28rem;
  }
  .centerDivNav{
    width: 6.47rem;
    font-size: 0.31rem;
    font-weight: 600;
    overflow: hidden;
    padding-bottom: 0.28rem;
    padding-right: 0.01rem;
  }
  label{
    padding-right: 0.15rem;
  }
  input{
    width: 3.98rem;
    height: 0.74rem;
    outline: 1px solid #b5b5b5;
    border: none;
    padding-left: 0.1rem;
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color:#ccc;
    padding-left: 0.16rem;
  }
  .selectListBox{
    width: 4rem;
    position: absolute;
    display: inline-block;
    right: 0;
    padding-top: 0.18rem;
    z-index: 10;
  }
  .selectList{
    width: 4.00rem;
    top: -0.1rem;
    max-height: 3.72rem;
    overflow-y: scroll;
    text-align: left;
    position: absolute;
    background-color: #c4c3c3;
    /*position: relative;*/
  }
  .inputBox{
    display: inline-block;
    float: right;
    padding-top: 0.18rem;
    position: relative;
  }
  .dropdownDox{
    width: 0;
    height: 0;
    border-left: 0.2rem solid transparent;
    border-right: 0.2rem solid transparent;
    border-top: 0.2rem solid #858585;

  }
  .dropdownDoxSty{
    display: inline-block;
    position: absolute;
    right: 0.00rem;
    top: 0.18rem;
    height: 0.74rem;
    line-height: 0.74rem;
    padding-top: 0.3rem;
    padding-left: 0.03rem;
    width: 0.46rem;
    background-color: #dadada;
  }
  .selectListnav:hover
  {
    background-color:#ffffff!important;
  }
  .selectListnav{
    border-bottom: 0.01rem solid #908c8c;
    padding: 0.1rem 0 0.1rem 0.1rem;
    color: #737171;
  }
  .notes{
    padding-left: 1rem;
    color: #b5b5b5;
    font-size: 0.24rem;
    padding-top: 0.16rem;
    font-weight: 200;
  }
  .notesred{
    padding-left: 1rem;
    color: red;
    font-size: 0.24rem;
    padding-top: 0.16rem;
    font-weight: 200;
  }
  .clearBtn{
    width: 0.32rem;
    height: 0.32rem;
    position: absolute;
    top: 0.4rem;
    right: 0.1rem;
  }
  .btnsubmit{
    width: 6.07rem;
    height: 0.8rem;
    background: url("~@/assets/rodRedPacket-kingcard/btnsubmit.png") ;
    background-size: 100% 100%;
    margin: 0 auto;
    text-align: center;
    color: #df5645;
    line-height: 0.8rem;
    font-size: 0.32rem;
    font-weight: 600;
  }
</style>
