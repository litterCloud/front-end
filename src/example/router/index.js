import Vue from 'vue'
import VRouter from 'vue-router'
import util from '@/libs/util'
import examplesViews from './examplesViews';
import { Indicator } from 'mint-ui';
import store from '@/store'
import notFind from '@/views/notFind'
Vue.use(VRouter);
let router =  new VRouter({
  routes: [
    ...examplesViews,
    {
      path:"*",
      component: notFind,
      name:"notFind"
    }
  ]
})
router.beforeEach((to, from, next) => {
  let nextPage = undefined; //此处必须为undefined
  // if((!to.query.token || !to.query.tel) && (!to.params.$IsTransForm)){
  //   nextPage = {
  //     name:to.name,
  //     query:{
  //       tel:store.state.userInfo.tel || "",
  //       token:store.state.userInfo.token || "",
  //       ...to.query
  //     },
  //     params:{
  //       "$IsTransForm":true,
  //       ...to.params
  //     }
  //   }
  // }
  if(!to.meta.needLogin){
    //若页面不需要登录
    next(nextPage);
    return;
  }else{
    //页面需要登录
    if(store.state.userInfo.isLogin){
      //若已登录
      next(nextPage);
    }else{
      console.log("需要登录啊，亲");
      next(false)
    }

  }

});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

// 路由配置
export default router;

