const shopDetail = () => import('@/views/shopDetail');
import shopCity from '@/views/shopCity'
import redpacketDetail from '@/views/redpacketDetail'
const cityList = () => import('@/views/cityList');
import registerSuccess from '@/singleViews/rodRedPacket-kingcard/index';
import realNameAuthentication from '@/components/realNameAuthentication'
export default [
  {
    path: '/',
    name: 'shopCity',
    component: shopCity,
    meta:{
      needLogin:true,
      logId:'PAGE_CODE_004'
    }

  },

  {
    path: '/shopDetail',
    name: 'shopDetail',
    component: shopDetail

  },
  {
    path: '/redpacketDetail',
    name: 'redpacketDetail',
    component: redpacketDetail,
    meta:{
      needLogin:true,
      logId:'PAGE_CODE_006'
    }
  },
  {
    path: '/cityList',
    name: 'cityList',
    component: cityList
  },{
    path:"*",
    component: shopCity,
    name:"notFind"
  },{
    path: '/registerSuccess',
    name: 'registerSuccess',
    component: registerSuccess,
  },{
    path: '/realNameAuthentication',
    name: 'realNameAuthentication',
    component: realNameAuthentication,
  },
]
