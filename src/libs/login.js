import Vue from "vue"
import login from "@/components/newLogin.vue"
import util from '@/libs/util'
import store from '@/store'
let loginFn = function(successFn,errorFn){
  if(util.getData("haveLogin")){
    return false;
  }
  let  newLogin = new Vue({
    store,
    data:{
      show:true
    },
    methods:{
      successFn(value){

        ( typeof successFn == 'function' ) && successFn(value);
      },
      errorFn(value){
        ( typeof errorFn == 'function' ) && errorFn(value);
      }
    },
    created(){
      let vm = this;
      util.setData("haveLogin",true);

    },
    render(h){
      let vm = this;
      return h(login,{
        on: {
          successFn: vm.successFn,
          errorFn:vm.errorFn,
          outShow:function($event){
            util.setData("haveLogin",false);
            vm.show = $event;
          }
        },
        props:{
          from:"api",
          outshow:vm.show
        }
      })
    }
  });
  console.log("渲染loginin")
  document.querySelector('body').appendChild(newLogin.$mount().$el);
  return loginFn;
};

export default loginFn;
