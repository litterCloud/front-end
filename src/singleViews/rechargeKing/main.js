
import Vue from 'vue'
import tools from '@/libs/tools'
import filters from '@/libs/filters'
import store from '@/store'
import App from './index'
import {ToastPlugin} from 'vux';
import vux from '@/config/vux.js'

Vue.config.productionTip = false;
Vue.use(tools);
Vue.use(ToastPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
});