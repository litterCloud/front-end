import axios from './axios';
import bssAxios from './bssAxios'
import formAxios from './formAxios'
import util from './util';
import confirm from './confirm';
import rodConfirm from './rodConfirm';
import login from './login'
import config from'../config/config';

let module = {
    util,
    axios
};
module.install = function (Vue) {
    Vue.prototype.$util = util;
    Vue.prototype.$axios = axios;
    Vue.prototype.$config = config;
    Vue.prototype.$bssAxios = bssAxios;
    Vue.prototype.$formAxios = formAxios;
    Vue.prototype.$confirm = confirm;
    Vue.prototype.$rodConfirm = rodConfirm;
    Vue.prototype.$login = login;
};
export default module;
