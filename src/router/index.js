import Vue from 'vue'
import VueRouter from 'vue-router'
import views from './views';
import store from '@/store'
// import notFind from '@/views/notFind'
import login from '@/libs/login'
Vue.use(VueRouter);
let router =  new VueRouter({
  routes: [
    ...views,

  ]
})
router.beforeEach((to, from, next) => {
  console.log("路由前");
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
    console.log("页面不需要登录")
    //若页面不需要登录
    next(nextPage);
    return;
  }else{
    //页面需要登录
    if(store.state.userInfo.tel){
      //若已登录
      next(nextPage);
    }else{
      console.log("需要登录啊，亲");
      next(nextPage)

    }

  }

});

router.afterEach((to, from) => {
  console.log("路由后"+to.meta.logId);
  window.scrollTo(0, 0);
  if (to.meta.needLogin) {
    console.log("是否登陆")
    //页面需要登录
    setTimeout(function () { //将这玩意儿扔到下一个轮询执行
      if (store.state.userInfo.tel) {
        //若已登录
        console.log("111111");
      } else {
        login(); //弹出登录框
      }
    },0)
  }
});

// 路由配置
export default router;

