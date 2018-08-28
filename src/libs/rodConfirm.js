import Vue from "vue"
import rodConfirm from "@/components/rodConfirm.vue"
let confirmFn = ({config={},render={}})=>{
  let  newModal = new Vue({
    data:{},
    method:{},
    render(h){
      let vm = this;
      return h(rodConfirm,{
        props:Object.assign({},config,{from:"api"}),
        scopedSlots:{
          confirmExtra:props =>render.pic && render.pic(h)
        }
      })
    }
  });
  let VueModal = newModal.$mount();
  document.querySelector('body').appendChild(VueModal.$el);
};

export default confirmFn;
