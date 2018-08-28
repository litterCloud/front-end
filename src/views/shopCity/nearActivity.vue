<template>
    <div class="near-activity" >
      <div class="activity-window" v-if="activityLists.length > 0">
        <div v-for="(v,i) in activityLists" :class="{'activity-link':!v.detailUrl}" class="activity-item"  @click="clickActivity(v.detailUrl)" :key="'redActivity'+i" :touchId = touchId[i] pageCode="PAGE_CODE_004" :touchAxtiveId="v.marketingActivityId">

          <div class="activity-content">
            <div class="activity-mark" :class="'mark'+i">
              {{v.activityMark}}
            </div>
            <div class="activity">
              <div class="activity-title">
                {{v.activityMainTitle}}
              </div>
              <div class="activity-desc">
                {{v.activitySubtitle}}
              </div>
            </div>
          </div>
          <div class="activity-icon">
            <img :src="v.promotionImageUrl" alt="">
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {filterActivityUrl} from '@/api/methods.js'
    export default {
      name:"nearActivity",
        components: {},
        data() {
            return {
              touchId : ['TOUCH_CODE_002','TOUCH_CODE_003','TOUCH_CODE_004','TOUCH_CODE_005','TOUCH_CODE_006'],
              activityList:[],
              spareActivity:[
                {
                  activityMark:'千万福利',
                  activityMainTitle:'最长字符',
                  activitySubtitle:'预存300送100',
                  promotionImageUrl: "../static/activity01.png",
                },
                {
                  activityMark:'千万福利',
                  activityMainTitle:'最长字符',
                  activitySubtitle:'预存300送100',
                  promotionImageUrl: "../static/activity02-rpg.png",
                  detailUrl:"rodRedPacket-entry.html"

                },
                {
                  activityMark:'千万福利',
                  activityMainTitle:'最长字符',
                  activitySubtitle:'预存300送100',
                  promotionImageUrl: "../static/activity03.png",
                },
                {
                  activityMark:'千万福利',
                  activityMainTitle:'最长字符',
                  activitySubtitle:'预存300送100',
                  promotionImageUrl: "../static/activity03.png",
                },
                {
                  activityMark:'千万福利',
                  activityMainTitle:'最长字符',
                  activitySubtitle:'预存300送100',
                  promotionImageUrl: "../static/activity03.png",
                }
              ]
            }
        },
        props: ["componentId"],
        computed: {
          activityLists(){
            let vm = this;
            /*if(!vm.activityList[0]){
              vm.activityList[0] = vm.spareActivity[0]
            }
            if(!vm.activityList[1]){
              vm.activityList[1] = vm.spareActivity[1]

            }
            if(!vm.activityList[2]){
              vm.activityList[2] = vm.spareActivity[2]
            }
            if(!vm.activityList[3]){
              vm.activityList[3] = vm.spareActivity[3]
            }
            if(!vm.activityList[4]){
              vm.activityList[4] = vm.spareActivity[4]
            }*/
            return vm.activityList;
          },
          userPosition(){
            return this.$store.state.handleAddress.city || this.$store.state.position.city || this.$store.state.IpPosition.name;
          },
          queryData(){
            let vm = this;
            return {
              city:vm.$store.state.handleAddress.city || this.$store.state.position.city || vm.$store.state.IpPosition.name,
              touchSpotType:vm.$config.touchSpotType,
              componentId:vm.componentId
            }
          }
        },
        methods: {
          filterActivityUrl,
          clickActivity:function(link){
            let vm = this;
            if(link){
              location.href = vm.filterActivityUrl(link);
            }

          },
          filterActivity(activityList){
            let vm = this;
            let item = {},list=[];
            activityList.forEach(function (value) {
              // value.activityType
              if(value.position == "1"){
                if(!item['item1']) {
                  item['item1']= value;
                  item['item1'].activityMark = value['activityMark'];
                  item['item1'].activityMainTitle = value['activityMainTitle'];
                  item['item1'].activitySubtitle = value['activitySubtitle'];
                  item['item1'].activityGuideWords = value["activityGuideWords"];
                }
              }
              if(value.position == "2"){
                if(!item['item2']){
                  item['item2']= value;
                  item['item2']['activityMark'] = value['activityMark'];
                  item['item2']['activityMainTitle'] = value['activityMainTitle'];
                  item['item2']['activitySubtitle'] = value['activitySubtitle'];
                  item['item2']['activityGuideWords'] = value["activityGuideWords"];

                }
              }
              if(value.position == "3"){
                if(!item['item3']){
                  item['item3']= value;
                  item['item3']['activityMark'] = value['activityMark'];
                  item['item3']['activityMainTitle'] = value['activityMainTitle'];
                  item['item3']['activitySubtitle'] = value['activitySubtitle'];
                  item['item3']['activityGuideWords'] = value["activityGuideWords"];
                }
              }
              if(value.position == "4"){
                if(!item['item4']){
                  item['item4']= value;
                  item['item4']['activityMark'] = value['activityMark'];
                  item['item4']['activityMainTitle'] = value['activityMainTitle'];
                  item['item4']['activitySubtitle'] = value['activitySubtitle'];
                  item['item4']['activityGuideWords'] = value["activityGuideWords"];
                }
              }
              if(value.position == "5"){
                if(!item['item5']){
                  item['item5']= value;
                  item['item5']['activityMark'] = value['activityMark'];
                  item['item5']['activityMainTitle'] = value['activityMainTitle'];
                  item['item5']['activitySubtitle'] = value['activitySubtitle'];
                  item['item5']['activityGuideWords'] = value["activityGuideWords"];
                }
              }

            });
            for(let i=1 ;i<6;i++){
              if(item['item'+i]){
                list.push(item['item'+i])
              }
            }
            console.log(list);
            // return [one,two,three,four,five]
            return list;
          }

        },
        watch: {
          userPosition:{
            handler(val,oldVal){
              let vm = this;
              if(val){
                this.$util.getCacheOrAjaxData(vm.queryData.city+vm.queryData.componentId,vm.$util.getUrl("getActivity"),vm.queryData)
                  .then((returnData)=>{
                    vm.activityList = vm.filterActivity(returnData["activityList"] || []);
                  })
                  .catch((error)=>{
                    console.log("活动数据加载失败",error);
                  });
              }
            },
            immediate:true,
            deep:true
          }
        },
        created() {}
    }

</script>
<style scoped lang="less">
  .near-activity{
    // margin-top: 3rem;
    padding-left:0.24rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width:100%;
    overflow-x: auto;
    overflow-y: hidden;
    background: #F3F3F3;
    .activity-window{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .activity-item{
        flex-shrink:0;
        width:3.2rem;
        height:2rem;
        margin:0.24rem 0.06rem 0.12rem 0.06rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #FFFFFF;
        box-shadow: 0 0.06rem 0.04rem -0.05rem rgba(0,0,0,0.15);
        border-radius: 0.08rem;
        justify-content: space-between;
        padding:0.2rem 0;
        .activity-content{
          display: flex;
          flex-direction: column;
          justify-items: flex-start;
          height:100%;
          margin-left: 0.16rem;
          .activity-mark{
            width:1rem;
            height:0.32rem;
            line-height: .24rem;
            border-radius: .12rem;
            color:#FFFFFF;
            // border-radius: 0.02rem;
            font-size: 0.2rem;
            display: flex;
            padding: 0.04rem 0 ;
            justify-content: center;
          }
          .mark0{
            background-image: linear-gradient(90deg, #00C2C4 23%, #66D799 100%);
          }
          .mark1{
            background-image: linear-gradient(-90deg, #3023AE 0%, #C86DD7 100%);
          }
          .mark2{
            background-image: linear-gradient(45deg, #FF9B46 0%, #FF371F 100%);
          }
          .mark3{
            background-image: linear-gradient(90deg, #95D02B 0%, #53B82A 100%);
          }
          .mark4{
            background-image: linear-gradient(-134deg, #3023AE 0%, #C86DD7 100%);
          }
          .activity{
            .activity-title{
              font-size: 0.24rem;
              color: #000000;
              line-height: 0.32rem;
              margin-top: 0.26rem;
            }
            .activity-desc{
              font-size: 0.2rem;
              color: #999999;
              line-height: 0.32rem;
            }
          }
        }
        .activity-icon{
          width:1.6rem;
          height:1.6rem;
          img{
            width:100%;
            height:100%;
          }
        }
      }
    }

  }
</style>
