let getUserPositionPromise = undefined;
let getUserIpPositionPromise = undefined;
let getReadPacketMoneyAxios = undefined;
let editData = function (index) {
  this.$store.commit("increment",{id:"4545",index:index})
};
let getUserPosition = function () {
  //this 关键字需要指向vue示例
  var vm = this;
  if(getUserPositionPromise){
    return getUserPositionPromise
  }else{
    let promise = new Promise(function (resolve,reject) {
      if(vm.$store.state.position.flag){
        getUserPositionPromise = undefined;
        resolve(JSON.parse(JSON.stringify(vm.$store.state.position)))
      }else{
        vm.$util.getCurrentPosition().then(function (data) {
          data.flag = true;
          vm.$store.commit("setPosition",data);
          getUserPositionPromise = undefined;
          resolve(JSON.parse(JSON.stringify(vm.$store.state.position)));
        }).catch(function (error) {
          error.flag = false;
          vm.$store.commit("setPosition",error);
          getUserPositionPromise = undefined;
          reject(error)
        })
      }
    });
    getUserPositionPromise = promise;
    return promise;
  }


};
let getUserIpPosition = function () {
  console.log("gitip")
  var vm = this;
  if(getUserIpPositionPromise){
    return getUserIpPositionPromise
  }else{
    let promise = new Promise(function (resolve,reject) {
      if(vm.$store.state.IpPosition.flag){
        getUserIpPositionPromise=undefined;
        resolve(JSON.parse(JSON.stringify(vm.$store.state.IpPosition)))
      }else{
        vm.$util.getIpPosition().then(function (data) {
          data.flag = true;
          vm.$store.commit("setIpPosition",data);
          getUserIpPositionPromise=undefined;
          resolve(JSON.parse(JSON.stringify(vm.$store.state.IpPosition)))
        }).catch(function (error) {
          error.flag = false;
          vm.$store.commit("setIpPosition",error);
          getUserIpPositionPromise=undefined;
          reject(error)
        })
      }

    });
    getUserIpPositionPromise = promise;
    return promise;
  }


}
//获得红包
let getReadPacketMoney = function (tel) {
  let vm =this;
  if(getReadPacketMoneyAxios){
    return;
  }

  getReadPacketMoneyAxios =vm.$bssAxios({
    url: vm.$util.getUrl("getRedPacket"),
    data: {
      bodyAttributeName: "QRY_USER_COUPONS_VIEW_REQ",
      "mechanismCode": "9940",
      "accNbr": tel,
      "merchantId": "",
      "rpType": "99"
    }
  });
  getReadPacketMoneyAxios.then(function (data) {
    getReadPacketMoneyAxios = undefined;
      /*通用劵*/
      let comAvaiFee = data["comAvaiFee"];
      /*定向劵*/
      let assAvaiFee = data["assAvaiFee"];
      let total = (Number(comAvaiFee) + Number(assAvaiFee)).toFixed(2);
      let redPacket = {
        redPacket: {
          universalTotal: comAvaiFee,
          orientationTotal: assAvaiFee,
          total: total
        }
      };
      vm.$store.commit("setRedpacket", redPacket);
    }).catch(function (error) {
    getReadPacketMoneyAxios = undefined;
    console.log("红包数据获取失败", error);
    })
}
// 设置 手机号
let setTelAndToken = function () {
  let vm = this;
  let tel = "";
  let token = "";
  let query = "";
  if(vm.$route){
    query = vm.$route.query
  }else{
    query = vm.$util.getAllQueryString();
  }
  //手机号
  if(query.tel && Number(query.tel)){
    tel = query.tel;
    vm.$util.storeSet("userInfoTel",query.tel)
  }else{
    tel = vm.$util.storeGet("userInfoTel");
  }
  //token
  if(query.token){
    token = query.token;
    vm.$util.storeSet("userInfoToken",query.token)
  }else{
    token = vm.$util.storeGet("userInfoToken");
  }
  //from 参数
  if(query.from){
    vm.$util.storeSet("userFrom",query.from);
    vm.$util.setData("userFrom",query.from)
  }else{
    let userFrom = vm.$util.storeGet("userFrom");
    vm.$util.setData("userFrom",userFrom)

  }


  vm.$store.commit("setPhone", {tel: tel || ""});
  vm.$store.commit("setToken", {token: token || ""});
};
// 获取 活动url
let filterActivityUrl = function (url = "") {
  let newUrl = "";
  let vm = this;
  if(vm.$util.getData("userFrom") == 1){
    //手厅进入
    newUrl = url.split("[from=1]")[0] || url;
  }else{
    //非手厅进入
    newUrl = url.split("[from=1]")[1] || url;
  }
  return newUrl
};
export  {
  editData,
  getUserPosition,
  getUserIpPosition,
  getReadPacketMoney,
  setTelAndToken,
  filterActivityUrl
}
