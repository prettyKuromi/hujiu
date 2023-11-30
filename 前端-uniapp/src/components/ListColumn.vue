<script>
import { useMemberStore } from '@/stores';
import {postFavorAPI} from '@/services/favor'
export default {
  //参数
  props: {
    picSrc: {
      type: String,
      required: true
    },
    starName: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    openingHours: {
      type: String,
      required: true
    },
    Longitude: {
      type: String,
      required: true,
    },
    Latitude: {
      type: String,
      required: true,
    },
    id:{
      type:String,
      required: true,
    },
    isLike: {
      type: String,
      required: true,
    }
  },
  //初始值
  data() {
    return {
      store1: this.isLike,
    }
  },
  //收藏的星标
  methods: {
    async toggleStar() {
      //点击收藏
        if(this.store1==="未收藏"){
          this.store1="已收藏"
        }else{
          this.store1="未收藏"
        }
        const memberStore=useMemberStore()
        const post_id=this.id
        const params = {
          id: post_id,
          account: memberStore.profile.account
       };
      
      const res=await postFavorAPI(params)
      //提示
      
      // const msg=isFavor.value ? '取消收藏成功':'收藏成功'
      // uni.showToast({icon:'none',title:msg})
    },
    navigation1(){
      uni.openLocation({
        latitude: parseFloat(this.Latitude),
        longitude: parseFloat(this.Longitude),
        scale: 15,
        name: this.starName,
        address: this.address,
        success: function (res) {
          const instance = getCurrentInstance();
          instance.proxy.$modal.msgSuccess('打开地图成功！', res);
        },
        fail: function (error) {
          const instance = getCurrentInstance();
          instance.proxy.$modal.msgError('打开地图失败！', error);
        },
      });
    },
    toDetail(){
      uni.navigateTo({
        url: `/pages/detail/detail?id=${this.id}`
      })
    }
  },
  //计算属性（文字太多时过滤掉）
  computed: {
    truncatedStarName() { //name一行最多显示6个字，最多显示12个字
      let formattedText = "";
      if (this.starName && this.starName.length > 6) {
        for (let i = 0; i < this.starName.length; i += 6) {
          const chunk = this.starName.slice(i, i + 6);
          formattedText += chunk + "\n";
        }
      }else{
        formattedText=this.starName;
      }
      if (formattedText && formattedText.length > 12) {
        return formattedText.slice(0, 12) + "...";
      }
      return formattedText;
    },
    truncatedaddress() { //地址
      if (this.address && this.address.length > 9) {
        return this.address.slice(0, 9) + "...";
      }
      return this.address;
    },
    truncatedopeningHours() { //开放时间
      if (this.openingHours && this.openingHours.length > 9) {
        return this.openingHours.slice(0, 9) + "...";
      }
      return this.openingHours;
    },
  },
}
</script>

<template>
  <scroll-view class="List-Column">
    <view class="bar2">
      <!-- 区块1 -->
      <div class="block-img">
        <image class="pic" :src="picSrc"></image>
        <!-- <image class="pic" src="@/static/images/pic.png"></image> -->
      </div>
      <!-- 区块2 -->
      <div class="Block1">
        <div class="line1">
          <image class="pic1" src='@/static/images/star1.png' v-if="this.store1 === '未收藏'" @click="toggleStar"></image>
          <image class="pic1" src='@/static/images/star2.png' v-else @click="toggleStar"></image>
          <text class="word1">{{ truncatedStarName }}</text>
        </div>
        <view class="line2">
          <view class="line21">
            <text class="word2">评分</text>
          </view>
          <text class="word3">{{ rating }}分</text>
        </view>
        <div class="line3">
          <image class="pic2" src="@/static/images/location.png"></image>
          <text class="word4">{{ truncatedaddress }}</text>
        </div>
        <div class="line4">
          <image class="pic4" src="@/static/images/stLine-time.png"></image>
          <text class="word5">{{ truncatedopeningHours }}</text>
        </div>
      </div>
      <!-- 竖线 -->
      <view class="l1"></view>
      <!-- 区块3 -->
      <div class="Block2">
        <text class="word6" @tap="toDetail">查看详情</text>
        <view class="block-pic">
          <image class="pic7" src="@/static/images/location-arrow-fast.png" @click="navigation1"></image>
        </view>
      </div>
    </view>
  </scroll-view>
</template>

<style>
/* 一整块 */
.List-Column {
  width: 100%;
  background-color: rgba(239, 239, 239, 1);
}
/* 白块 */
.bar2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw * 0.955);
  line-height: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: center;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  font-family: Roboto;
  margin-top: 10px;
  margin-bottom: 9px;
  margin-left: 7px;
  margin-right: 7px;
}
/* 块1-图像块 */
.pic {
  margin-left: 15px;
  margin-right: 15px;
  width: 91px;
  height: 87px;
  border-radius: 10px 10px 10px 10px;
  background-color: rgba(229, 229, 229, 1);
  width: 91px;
  height: 87px;
  max-width: 100%;
  max-height: 100%;
}
/* 块2 */
.Block1 {
  margin-right: 15px;
  display: flex;
  width: 350px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}
/* 块2第一行 */
.line1 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: row; /* 水平排列 */
}
.pic1 {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.word2 {
  width: 56px;
  height: 20px;
  line-height: 20px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: left;
  font-family: PingFangSC-regular;
}
/* 块2第二行 */
.line2 {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 105px;
  height: 19px;
  line-height: 20px;
  border-radius: 3px 3px 3px 3px;
  background-color: rgba(255, 194, 191, 1);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 1);
}
.line21 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 19px;
  line-height: 20px;
  border-radius: 3px 0px 0px 3px;
  background-color: rgba(254, 114, 107, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: Roboto;
}
.word2 {
  width: 28px;
  height: 14px;
  line-height: 14px;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: row; /* 水平排列 */
  color: rgba(255, 255, 255, 1);
  font-size: 11px;
  text-align: center;
  font-family: PingFangSC-semiBold;
}
.word3 {
  display: flex;
  text-align: center;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: row; /* 水平排列 */
  width: 54px;
  height: 14px;
  line-height: 14px;
  color: rgba(254, 114, 107, 1);
  font-size: 11px;
  font-family: PingFangSC-semiBold;
}
/* 块2第三行 */
.pic2 {
  width: 14px;
  height: 14px;
}
.word4 {
  width: 114px;
  height: 14px;
  line-height: 14px;
  color: rgba(170, 168, 170, 1);
  font-size: 10px;
  text-align: left;
  font-family: PingFangSC-regular;
}
/* 块2第四行 */
.line4 {
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: row; /* 水平排列 */
}
.pic4 {
  width: 14px;
  height: 14px;
}
.word5 {
  width: 54px;
  height: 14px;
  line-height: 14px;
  color: rgba(170, 168, 170, 1);
  font-size: 10px;
  text-align: left;
  font-family: PingFangSC-regular;
}
/* 线 */
.l1 {
  width: 1px;
  height: 90px;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(187, 187, 187, 1);
}
/* 块3 */
.Block2 {
  margin-left: 15px;
  margin-right: 15px;
  height: 113px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.word6 {
  align-items: center;
  justify-content: center;
  width: 59px;
  height: 22px;
  line-height: 20px;
  color: rgba(133, 200, 126, 1);
  font-size: 14px;
  text-align: left;
  font-family: PingFangSC-regular;
  margin-bottom: 10px;
}
.word7 {
  height: 14px;
  line-height: 14px;
  color: rgba(170, 168, 170, 1);
  font-size: 10px;
  text-align: left;
  font-family: PingFangSC-regular;
  padding-bottom: 7px;
}
.block-pic {
  width: 34px;
  height: 34px;
  line-height: 20px;
  background-color: rgba(207, 201, 201, 1);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pic7 {
  width: 19px;
  height: 19px;
}
</style>
