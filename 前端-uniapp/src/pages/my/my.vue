<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useMemberStore } from '@/stores';
import type { UserDetail } from '@/types/member';
import { getMyInfoAPI } from '@/services/profile';
const { safeAreaInsets } = uni.getSystemInfoSync()
const memberStore = useMemberStore()

// 获取主页用户信息
const myinfo = ref({} as UserDetail)
const getMyInfoData = async () =>{
  const res = await getMyInfoAPI()
  myinfo.value = res.data
  console.log(res);
  memberStore.profile.avatar = myinfo.value.avatar
  memberStore.profile.nickname = myinfo.value.nickname
}

/* 跳转“关于”方法 */
const goto_about = ()=>{
  uni.navigateTo({
    url: '/pagesMember/about/about',
  });
}
/* 跳转到“联系”方法 */
const goto_connect = ()=>{
  uni.navigateTo({
    url: '/pagesMember/connect/connect',
  });
}
/* 跳转到“新建评论”方法 */
const goto_comment = ()=>{
  uni.navigateTo({
    url: '/pagesMember/comment/comment',
  });
}


onLoad(() => {
  getMyInfoData()
})
</script>


<template>
  <scroll-view class="com1" scroll-y enable-back-to-top >
	  <view class="viewport">
      <!-- 个人资料 -->
      <view class="profile" >
        <!-- 情况1：已登录 -->
        <view class="overview" v-if="true">
          <navigator url="/pagesMember/profile/profile" hover-class="none">
            <image
              class="avatar"
              mode="aspectFill"
              :src = memberStore.profile!.avatar
            ></image>
          </navigator>
          <view class="meta">
            <view class="nickname">{{ memberStore.profile!.nickname }}</view>
          </view>
        </view>
      </view>

      <!--信誉分-->
      <view class="credit">
        <image src="../../static/credit.png" class="credit_img"></image>
        <text class="credit_sorce" >{{ myinfo.credit }}</text>
      </view>
	  </view>

    <!--设置-->
    <view class="list_contanier">
      <!-- 列表 -->
      <view class="list">
        <button hover-class="none" class="item arrow" @tap="goto_connect">
            <image
                src="../../static/phone.png"
                mode="aspectFit" class="setting_img"
            /><text class="setting_text">联系我们</text></button>
        <button hover-class="none" class="item arrow" @tap="goto_about">
            <image
                src="../../static/about.png"
                mode="aspectFit" class="setting_img"
            />
            <text class="setting_text">关于</text></button>
      </view>
    </view>

    <!--提交评价入口（加号）-->
    <view>
      <image
      src="../../static/add.png"
      mode="aspectFit"
      class="add_img"
      @tap="goto_comment"
      />
    </view>
	</scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color:#ECEBEC;
}

.com1{
	height: 100%;
	background-repeat: no-repeat;
	background-size: 100% auto;
}

.viewport {
  border-radius: 5%;
  height: 230px;
  width: 94%;
  background-repeat: no-repeat;
  background: linear-gradient(to left,#AFE1AF ,#BFFE6B ,#AFE1AF ); //背景渐变色
//   background-color: #AFE1AF;
  background-size: 100% auto;
  margin: 5% 3%;
}

/* 用户信息 */
.profile {
  margin-top: 20rpx;
  position: relative;

  .overview {
    display: flex;
    height: 120rpx;
    padding: 0 36rpx;
    color: #fff;
  }

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    margin-top: 20%;
    background-color: #eee;
  }

  .gray {
    filter: grayscale(100%);
  }

  .meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 30rpx;
    padding: 16rpx 0;
    margin-left: 20rpx;
  }

  .nickname {
    margin-top: auto;
    max-width: 350rpx;
    margin-bottom: 16rpx;
    font-size: 20px;
    font-family: PingFangSC-regular;
	  color: #000000;
    overflow: visible;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}


// 信誉分部分
.credit{
	border-radius: 10%;
	height: 104px;
	width: 90%;
	margin:13% 5%;
	background-color: #FE726B;
	color: #fff;
	
}
// 信誉分图片
.credit_img{
	width: 71.05px;
	height: 71.37px;
	position: relative;
	top:15%;
	left:10%;
}
// 信誉分分数
.credit_sorce{
    position: relative;
    top:auto;
    left: 25%;
    text-justify: auto;
    font-size: 48px;
    font-family:PingFangSC-semiBold;    //PingFangSC-semiBold字体
}


/* 列表 */
.list_contanier{
  padding: 25rpx;
  height: 120px;
  border-radius: 5%;
  margin-top: 3%;
}
.list {
  padding: 0 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  .item {
    display: flex;
	  align-items: center; //前2行用于调整文字与图片对齐

    line-height: 90rpx;
    padding-left: 10rpx;
    color: #333;
    border-top: 1rpx solid #BBBBBB;
    position: relative;
    text-align: left;
    border-radius: 0;
    background-color: #fff;
    &::after {
      width: auto;
      height: auto;
      left: auto;
      border: none;
    }
    &:first-child {
      border: none;
    }
    &::after {
      right: 5rpx;
    }
  }
//   “设置”中的图片
  .setting_img{
    width: 20px; 
    height: 20px;
  }
}
// “设置”中的文本内容
.setting_text{
    margin-left: 3%;
    font-family: PingFangSC-regular;
    font-size: 14px;
}


// 发布评价入口图片
.add_img{
  margin-top: 20%;
  margin-left: 60%;
  height: 112px;
  width: 112px;
}
</style>