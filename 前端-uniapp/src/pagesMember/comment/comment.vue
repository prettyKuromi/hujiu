<script setup lang="ts">
import { ref } from 'vue'  
import { postUserCommentAPI } from '@/services/comment';
import type { CommentDetail } from '@/types/comment';

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const comment = ref({} as CommentDetail)
// 上传的图片与上传类型的初始值
comment.value.picture = '../../static/upload.png'
comment.value.sid = '0'

/* 下拉选择器 */
const array = ref([{ typesof: '景点' }, { typesof: '美食' }]);
const index = ref(0);
const bindPickerChange = (e: { detail: { value: number; }; })=>{
  index.value = e.detail.value;
  uni.setStorage({
        key: 'sid',
        data: index.value,
      })
  comment.value.sid = uni.getStorageSync('sid')
}

/* 上传图片 */
const uploadpic = ()=>{
  // 调用微信自带选择图片API
    uni.chooseMedia({
    //个数限定
    count:1,
    // 文件类型
    mediaType:['image'],
    success: (res) => {
        // 文件图片本地路径
        const { tempFilePath } = res.tempFiles[0]
        // 缓存图片到本地
        uni.setStorage({
        key: 'pic_src',
        data: tempFilePath,
        success: function () {
          console.log('pic_src setStore');
        }
      })
      // 获取要上传的图片
      comment.value.picture = uni.getStorageSync('pic_src')
    },
  })
}

/* 提交评论表单 */
const CommentPost = async() =>{ 
  const { sid, name, address, opening_hours, picture} = comment.value
  const res = await postUserCommentAPI({
    sid, name, address, opening_hours, picture
  })
  console.log(res)

  // 判断是否成功上传
  if (res.code === '0') {
    // 上传成功 跳转“提交成功”页面方法
    uni.navigateTo({
      url: '/pagesMember/submitted/submitted',
    });
  } else if (res.msg === '已经有人上传') {
    // 提示已有人上传
    uni.showToast({
      title: '已有人上传啦~',
      icon: 'error',
    })
  } else {
    // 提示表单不完整
    uni.showToast({
      title: '信息不完整哦~',
      icon: 'error',
    })
  }
}
</script>

<template>
  <view class="viewport">
    <!-- 类型下拉框 -->
    <view class="item">
      <text class="label">请选择要发布的地点类型：</text>
      <picker class="picker" @change="bindPickerChange" :value="index" :range="array" range-key="typesof">
        <view style="padding: 20rpx;background-color: white;">{{ array[index].typesof }}</view>
      </picker>
    </view>
    <!-- 地点名称 -->
    <view class="item">
      <text class="label">名字：</text>
      <input class="input" type="text" placeholder="景点/美食的名字" v-model="comment.name" style="position: relative;left:8.5%"/>
    </view>
    <!-- 开放时间 -->
    <view class="item">
      <text class="label">开放时间：</text>
      <input class="input" type="text" placeholder="请输入开放时间（例：8:00-12:00）" v-model="comment.opening_hours" />
    </view>
    <!-- 具体位置 -->
    <view class="item">
      <text class="label">具体位置：</text>
      <input class="input" type="text" placeholder="请输入具体位置" v-model="comment.address" />
    </view>
    <!-- 描述 -->
    <view class="item">
      <text class="label" style="display: flex;justify-content: start;">添加描述：</text>
      <textarea class="brief" placeholder="描述一下想推荐的景点/美食吧~" placeholder-class="textarea-placeholder" />
    </view>
    <!--上传图片-->
    <view class="upload_item">
      <text class="lable">请上传一张图：</text>
      <view class="img_container">
        <image class="upload_img" :src=comment.picture mode="aspectFit" @tap="uploadpic"/>
      </view>
    </view>
    <!-- 提交按钮 -->
    <button class="form-button" @tap="CommentPost">提 交</button>
  </view>
</template>

<style lang="scss">
page {
  background-color: #fff;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 评论表单各模块
.item{
  display: flex;
  background-color: #fff;
  height: 20%;
  padding: 2%;
  justify-content: flex-start;
  .label{
    font-size: 15px;
    font-family: PingFangSC-regular;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 2%;
  }
  // 下拉选择器
  .picker{
    background-color: #f4f4f4;
    line-height: 20px;
    font-family: Microsoft Yahei;
    font-size: 14px;
    margin-right: 1%;
    width: 40%;
    height: auto;
    border: 1px solid #BBBBBB;
    // border-radius: 30rpx;
  }
  // 输入
  .input{
    background-color: #f4f4f4;
    font-family: Microsoft Yahei;
    font-size: 14px;
    margin-right: 1%;
    padding-left: 3%;
    width: 68%;
    height: auto;
    border: 1px solid #BBBBBB;
    border-radius: 15rpx;
  }
  // 描述
  .brief{
    background-color: #f4f4f4;
    font-family: Microsoft Yahei;
    font-size: 14px;
    margin-right: 1%;
    padding-left: 3%;
    width: 68%;
    border: 1px solid #BBBBBB;
    border-radius: 15rpx;
  }
}
// 上传图片入口
.upload_item{
  display: flex;
  background-color: #fff;
  height: 20%;
  padding: 2%;
  margin-top: 5%;
  margin-left: 2%;
  justify-content: flex-start;
  flex-direction: row;
  align-items: left;
  justify-content: left;
  // 上传图片
  .img_container{
    width: 170px;  
    height: 170px;  
    overflow: hidden;
    outline: 1px dashed#BBBBBB;
    position: relative;
    left: 5%;
  }
  .upload_img{
    width: 100%;  
    height: 100%;  
    object-fit: cover; /* 自适应大小并保持宽高比 */
  }
}

// 提交按钮
.form-button {
    height: 80rpx;
    width: 80%;
    text-align: center;
    line-height: 80rpx;
    margin-top: 23%;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #FFA500;
  }
</style>