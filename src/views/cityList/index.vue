<template>
  <div class="city-list" >
    <index-list>
      <cell style="color: #bfbdbd" v-if="address" :title="'当前位置: '+ address" @click.native.stop="clickAddress"></cell>
      <index-section v-for="item in cityList" :index="item.index" :key="item.index">
        <cell v-for="(i,j) in item.rows" :title="i" :key="j" @click.native="clickFn(i)"></cell>
      </index-section>
    </index-list>
  </div>
</template>
<script>
  import { IndexList, IndexSection ,Cell} from 'mint-ui';
  export default {
    components: {
      IndexList,
      IndexSection,
      Cell
    },
    data() {
      return {
        cityList:[
          {
            index:"B",
            rows:["北京市"]
          },
          {
            index:"C",
            rows:["潮州市"]
          },
          {
            index:"D",
            rows:["东莞市"]
          },
          {
            index:"F",
            rows:["佛山市"]
          },
          {
            index:"G",
            rows:["广州市"]
          },
          {
            index:"H",
            rows:["惠州市","河源市"]
          },
          {
            index:"J",
            rows:["江门市","揭阳市"]
          },
          {
            index:"M",
            rows:["茂名市","梅州市"]
          },
          {
            index:"N",
            rows:["南昌市"]
          },
          {
            index:"S",
            rows:["深圳市","汕头市","汕尾市","韶关市"]
          },
          {
            index:"Q",
            rows:["清远市"]
          },
          {
            index:"Y",
            rows:["阳江市","云浮市"]
          },
          {
            index:"Z",
            rows:["中山市","珠海市","肇庆市","湛江市"]
          },
        ]
      }
    },
    props: {},
    computed: {
      address(){
        return this.$store.state.position.address || this.$store.state.IpPosition.name || ""
      }
    },
    methods: {
      clickFn(i){
        this.$store.commit("setHandlePosition",i);
        this.$router.back();
      },
      clickAddress(){
        this.$store.commit("setHandlePosition",{flag:"position"});
        this.$router.back();
      }
    },
    watch: {},
    created() {

    }
  }

</script>
<style scoped lang="less">
</style>
