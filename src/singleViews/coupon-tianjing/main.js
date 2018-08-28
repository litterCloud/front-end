
import Vue from 'vue'
import tools from '@/libs/tools'
import App from './index'
import vux from '@/config/vux.js'
// import mock from '@/mock/mock'
Vue.config.productionTip = false;
Vue.use(tools);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
