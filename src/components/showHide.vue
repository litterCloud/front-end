
<script>
  export default {
    name:"showHide",
    components: {},
    render(h) {
      return h("div",{class: {"show-hide": true}},[
        h("div",{attrs:{class:"total-center"}},[
          h("div",{attrs:{class:"always"}},(function (num,context) {
            let arr = [];
            if(!context.$slots.item || (context.$slots.item || []).length <=num){
              return context.$slots.item || []
            }else{

              context.$slots.item.forEach(function (val,index) {
                if(index < num){
                  arr.push(val)
                }
              });
              return arr;
            }
          })(this.defaultNum,this)),
          h("div",{attrs:{class:"not-always"}},(function (num,context) {
            let arr =[];
            if(!context.isActive){
              return []
            }
            if(!context.$slots.item || (context.$slots.item || []).length <=num){
              return []
            }else{
              context.$slots.item.forEach(function (val,index) {
                if(index >= num){
                  arr.push(val)
                }
              });
              return arr;
            }
          })(this.defaultNum,this)),

        ]),
        h("div",{
          attrs:{
            class:"total"

          },
          on: {
            click: this.activeFn
          }
        },[
          h("span",{attrs:{class:"total-text"}},[(function (context) {
            if(context.$slots.total){
              return context.$slots.total
            }else{
              return `共${(context.$slots.item || []).length}个`
            }
          })(this)]),
          h("div",{class:[this.isActive?'total-down':'total-up']}),
        ])

      ])
    },
    data() {
      return {
        isActive:this.value || false
      }
    },
    props: {
      defaultNum:{
        type:Number,
        default:2
      },
      value:{
        type:Boolean,
        default:false
      }
    },
    computed: {

    },
    methods: {
      activeFn(event){
        event.stopPropagation();
        let vm = this;
        vm.isActive = !vm.isActive;
        vm.$emit('input',vm.isActive);
        vm.$emit("active",vm.isActive)
      }
    },
    watch: {
      value(val){
        this.isActive = val;
      }
    },
    created() {
    }
  }

</script>
<style scoped lang="less">
  .show-hide{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .total{
    display: flex;
    font-size: 0.2rem;
    line-height: 0.2rem;
    padding-right: 0.2rem;
    align-items: baseline;
    color: #666;
    flex-shrink:0;
  }
  .total-text{
    padding-right: 0.05rem;
  }
  .total-down {
    top: 1px;
    width: 0;
    height: 0;
    border-top: solid 0.06rem currentColor;
    border-bottom: solid 0.06rem transparent;
    border-left: solid 0.06rem transparent;
    border-right: solid 0.06rem transparent;
  }
  .total-up {
    top: 1px;
    width: 0;
    height: 0;
    border-top: solid 0.06rem transparent;
    border-bottom: solid 0.06rem currentColor;
    border-left: solid 0.06rem transparent;
    border-right: solid 0.06rem transparent;
  }
</style>
