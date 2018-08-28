import Vue from "vue"
import confirm from "@/components/confirm.vue"
let confirmFn = ({config={},render={}})=>{
    let  newModal = new Vue({
      data:{},
      method:{},
      render(h){
        let vm = this;
        return h(confirm,{
          props:Object.assign({},config,{from:"api"}),
          scopedSlots:{
            confirmExtra:props =>render.pic && render.pic(h),
            contentSlot:props =>render.contentFn && render.contentFn(h)
          }
        })
      }
    });
    let VueModal = newModal.$mount();
    document.querySelector('body').appendChild(VueModal.$el);
};

export default confirmFn;
