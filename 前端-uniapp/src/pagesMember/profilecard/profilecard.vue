<script setup lang="ts">
import { ref } from 'vue';
import type { UserDetail } from '@/types/member';
import { getOtherInfoAPI } from '@/services/profile';
import { onLoad } from '@dcloudio/uni-app';

const otherinfo = ref({} as UserDetail)
const getOtherInfoData = async () =>{
  const res = await getOtherInfoAPI('lyn') // 括号内传递account参数
  otherinfo.value = res.data
  console.log(res)
  if (res.code !== '0') {
    // 失败提示
    uni.showToast({
          title: '出错啦请重试！',
          icon: 'error',
          duration: 1000  //显示持续时间为1秒
        })
  }
}

onLoad(()=>{
  getOtherInfoData()
})
</script>

<template>
  <view class="viewport">
      <!-- 个人资料 -->
      <view class="profile" >
        <view class="overview" v-if="true">
          <view>
            <image class="avatar" mode="aspectFill" :src=otherinfo.avatar></image>
          </view>

          <view class="meta">
            <view class="nickname"> {{ otherinfo.nickname }} </view>
          </view>

	      </view>
      </view>

      <view class="credit">
        <image src="../../static/credit.png" class="credit_img"></image>
        <text class="credit_sorce" >{{ otherinfo.credit }}</text>
      </view>
  </view>

      <!--信誉分-->
      
</template>

<style lang="scss">
.page{
  z-index: 999;
}
.viewport {
  border-radius: 5%;
  height: 150px;
  width: 90%;
  background-repeat: no-repeat;
  background: linear-gradient(to left,#AFE1AF ,#BFFE6B ,#AFE1AF ); //背景渐变色
  margin: 5% 5%;
}

/* 用户信息 */
.profile {
  margin-top: 20rpx;
  position: static;
  padding: 3%;

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
    margin-left: 10%;
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
	height: 50px;
	width: 40%;
	margin-left: 25%;
  margin-top: -2%;
	// background-color: #FE726B;
  padding: 2%;
	color: #fff;
}
// 信誉分图片
.credit_img{
	width:40px;
	height: 40px;
	position: relative;
	top:10%;
	left:10%;
}
// 信誉分分数
.credit_sorce{
    position: relative;
    top:-8%;
    left: 25%;
    text-justify: auto;
    font-size: 30px;
    font-family:PingFangSC-semiBold;    //PingFangSC-semiBold字体
}
</style>