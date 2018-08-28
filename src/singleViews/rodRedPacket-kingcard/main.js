
import Vue from 'vue'
import tools from '@/libs/tools'
import App from './index'
 //import mock from '@/mock/mock'
import store from '@/store'
import vux from '@/config/vux.js'
//import router from '@/router/index'
Vue.config.productionTip = false;
Vue.use(tools);
new Vue({
  el: '#app',
 // router,
  store,
  components: { App },
  template: '<App/>'
});
