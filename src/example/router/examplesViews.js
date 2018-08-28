import exampleList from '@/example/exampleList'
import vuex from '@/example/vuex'
import homeFooter from '@/example/homeFooter'
import homeHeader from '@/example/homeHeader'
import notUsedTpl from '@/example/notUseTpl.vue'
import usedTpl from '@/example/usedTpl.vue'
import login from '@/example/login.vue'
import phoneFormat from '@/example/phoneFormat.vue'
import filters from '@/example/filters.vue'
import nearHead from '@/example/nearHead.vue'
import showHide from '@/example/showHide.vue'
import confirm from '@/example/confirm.vue'
import newLogin from '@/example/newLogin.vue'
import rodComfirm from '@/example/rodComfirm.vue'
export default [
  {
    path: "/",
    name: "exampleList",
    component: exampleList
  },
  {
    path: "vuex",
    name: "vuex",
    component: vuex
  },
  {
    path: "home-header",
    name: "homeHeader",
    component: homeHeader
  },
  {
    path: "home-footer",
    name: "homeFooter",
    component: homeFooter
  },
  {
    path: "not-used-tpl",
    name: "notUsedTpl",
    component: notUsedTpl
  },
  {
    path: "used-tpl",
    name: "usedTpl",
    component: usedTpl
  },
  {
    path: "login",
    name: "login",
    component: login
  },
  {
    path: "phoneFormat",
    name: "phoneFormat",
    component: phoneFormat
  },
  {
    path: "filters",
    name: "filters",
    component: filters
  },
  {
    path: "nearHead",
    name: "nearHead",
    component: nearHead
  },
  {
    path: "showHide",
    name: "showHide",
    component: showHide
  },
  {
    path: "confirm",
    name: "confirm",
    component: confirm
  },
  {
    path: "newLogin",
    name: "newLogin",
    component: newLogin
  },
  {
    path: "rodComfirm",
    name: "rodComfirm",
    component: rodComfirm
  }
]
