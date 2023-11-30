<script setup lang="ts">
import { ref,defineProps } from 'vue';
import type { UserDetail } from '@/types/member';
import { getOtherInfoAPI } from '@/services/profile';
import { onLoad } from '@dcloudio/uni-app';


//接收父组件的传参
const props = defineProps({
  //子组件接收父组件传递过来的值
  account: {
    type: String,
    required: true
  }
})

const otherinfo = ref<UserDetail>()
const getOtherInfoData = async () =>{
  const res = await getOtherInfoAPI(props.account) // 括号内传递account参数
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
        <view class="overview">
          <view>
            <image
              class="avatar"
              mode="aspectFill"
              :src = otherinfo?.avatar
            ></image>
          </view>
          <view class="meta">
            <view class="nickname"> {{ otherinfo?.nickname }} </view>
          </view>
        </view>
      </view>

      <!--信誉分-->
      <view class="credit">
        <image src="../../static/credit.png" class="credit_img"></image>
        <text class="credit_sorce" >{{ otherinfo?.credit }}</text>
      </view>
	  </view>

    <!--填补空白区-->
    <view class="img_contanier">
      <!--填充图-->
      <image class="card" src="@/static/invisible.png" mode="aspectFit"/>
      <!-- 填充文字 -->
      <text class="text">“诶呀，TA设置了隐私不可见哦”</text>
    </view>
</template>

<style lang="scss">
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

// 填充模块
.img_contanier{
  height: 230px;

  // 填充图片
  .card{
    margin-top: 5%;
    width: 100%;
    height: 100%;
  }
  // 填充文字
  .text{
    margin-top: 20%;
    font-family: PingFangSC-regular;
    color: #AAA8AA;
    font-size: 18px;
    display: flex;
    justify-content: center;
  }
}

</style>