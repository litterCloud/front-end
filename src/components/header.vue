<template>
  <div class="new-header">
    <div class="icon-area">
      <div class="icon-img">
        <img :src="icon.iconLink" alt="介是网站logo" @click="jumpHome">
      </div>
      <div class="icon-desc">{{icon.iconDesc}}</div>
    </div>
    <div class="search-area">
      <div class="user-input" @click="searchFn(search,search.showInput)">
        <div class="search-tap" v-show="!search.showInput">
          <div class="search-guide" v-for="(v,i) in search.searchTap" :key="'search-'+i" @click.stop="searchFn(search,v)">
            {{v}}
          </div>
        </div>
        <div class="search-input" v-show="search.showInput">
          <input type="text" v-modal="search.searchInput">
        </div>
      </div>
      <div class="search-icon" @click="searchFn(search,search.searchInput)"></div>
    </div>
    <div class="login-area">
      <div class="login-item" v-for="(v,i) in login" :key="'login-'+i" @click="loginClick(v,i)">
        <div class="login-icon">
          <img :src="v.typeIcon" :alt="v.typeName">
        </div>
        <div class="login-name">{{v.typeName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "header",
    components: {},
    data() {
      return {
        icon: {
          iconLink: '',
          iconDesc:'咕噜爱的喵'
        },
        tap: [
          {
            tapName: '',
            tapLink: ''
          }
        ],
        search:{
          showInput:false,
          searchTap:['js', 'node'],
          searchInput:''
        },
        login: {
          loginType: [
            {
              typeName: '登录',
              typeIcon: '',
            },
            {
              typeName: '注册',
              typeIcon: ''
            }
          ]
        }
      }
    },
    props: {},
    computed: {},
    methods: {
      jumpHome(){
        console.log('跳转回首页');
      },
      loginClick(v,i){
        console.log(v,i);
      },
      searchFn(key){
        if(!key){
          search.searchInput = true;
        }
        console.log(key);
      }
    },
    watch: {},
    created() {

    }
  }
</script>

<style scoped lang="less">

</style>