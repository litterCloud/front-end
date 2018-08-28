
import 'mint-ui/lib/style.css'

import Vue from 'vue'
import MintUI from 'mint-ui'
import vux from '@/config/vux.js'
import router from './router/index'
import tools from '../libs/tools'
import filters from '../libs/filters'
import App from './App'
import store from '../store'

// import mock from './mock/mock'
Vue.config.productionTip = false;

Vue.use(tools);
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
