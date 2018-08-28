<template>
    <div class="share-component">
      <div class="share-btn share-friends" @click="shareToFriends">
        <div>分享给微信好友</div>
      </div>
      <div class="share-btn share-friends-circle" @click="shareToFrirendsCircle">
        <div>分享到朋友圈</div>
      </div>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {},
        computed: {},
        methods: {
          shareToFriends(){
            let vm = this;
            console.log("微信好友share")
            vm.$wechat.onMenuShareTimeline({
                title: '微信好友', // 分享标题
                link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function () {
                  console.log("分享到微信好友");
                },
            })
          },
          shareToFrirendsCircle(){
            let vm = this;
            console.log("朋友圈share");
            vm.$wechat.onMenuShareAppMessage({
              title: '腾讯', // 分享标题
              desc: 'king', // 分享描述
              link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
              success: function () {
                  console.log("分享到朋友圈");
              }
            });
          },
        },
        watch: {},
        created() {

        }
    }

</script>
<style scoped lang="less">
  .share-component{
    .share-btn{
      width:5.26rem;
      height:0.88rem;
      background-color: #eb5145;
      border-radius: 0.44rem;
      color:#FFFFFF;
      line-height: 0.88rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin:0.16rem 0;
      div{
        width:50%;
        text-align: center;
      }
    }
    .share-friends:before{
      content:"";
      display: inline-block;
      width:0.6rem;
      height:0.48rem;
      background:url("~@/assets/redpacketGrab/friends.png") no-repeat;
      background-size: 100% 100%;
    }
    .share-friends-circle:before{
      content:"";
      display: inline-block;
      width:0.6rem;
      height:0.48rem;
      background:url("~@/assets/redpacketGrab/friendsCircle.png") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
