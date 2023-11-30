<script setup lang="ts">
import type { Gender } from '@/types/member';
import type { ProfileDetail } from '@/types/member';
import { ref } from 'vue';
import { getProfileInfoAPI } from '@/services/profile';
import { postUpdateUserAPI } from '@/services/profile';
import { postAvatarAPI } from '@/services/profile';
import { onLoad } from '@dcloudio/uni-app';
import { useMemberStore } from '@/stores';

// 获取个人信息
const profile = ref({} as ProfileDetail)
const getProfileInfoData = async ()=>{
  const res = await getProfileInfoAPI()
  profile.value = res.data
  console.log(res)
}
const memberStore = useMemberStore()

/* 修改用户头像 */
const onAvaterChange = () => {
   // 调用微信自带选择上传图片API
  uni.chooseMedia({
    count:1,
    mediaType:['image'],
    success: async function (res) {
      console.log(res)
      // 文件路径
      const { tempFilePath } = res.tempFiles[0]
      console.log(tempFilePath)
      // 用户信息页头像更新
      profile.value.avatar = tempFilePath
      // 主页头像更新
      memberStore.profile!.avatar = tempFilePath
      
      // 上传新头像到服务器
      const avatarres = await postAvatarAPI({
        avatar: profile.value.avatar,
      })
      if (avatarres.code === '0') {
        uni.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000  //显示持续时间为1秒
        })
      } else {
        // 失败提示
        uni.showToast({
          title: '保存错误请重试',
          icon: 'error',
          duration: 1000  //显示持续时间为1秒
        })
      }
	  }
  });
}

/* 跳转到 “我的” 页面 */
const goto_my = ()=>{
    uni.switchTab({
      url: '/pages/my/my',
    });
  }
/* 修改用户资料“提交” */
const SubmitTap = async()=>{
  const { nickname, birthday, account, sex} = profile.value
  const res = await postUpdateUserAPI({
     nickname, birthday, account, sex
  })
  console.log(res)
  // 同步更新主页昵称
  memberStore.profile!.nickname = profile.value.nickname
  
  if (res.code === '0') {
    // 保存成功提示
    uni.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000  //显示持续时间为1秒
      })
      // 提示“保存成功”后延时返回“我的”
      setTimeout(goto_my,500)
  } else {
    // 失败提示
    uni.showToast({
        title: '保存错误请重试',
        icon: 'error',
        duration: 1000  //显示持续时间为1秒
      })
  }
  
}

/* 修改性别 */
const onGenderChange:UniHelper.RadioGroupOnChange = (ev) =>{
  // console.log(ev.detail.value)
  profile.value.sex = ev.detail.value as Gender
}

/* 修改生日 */
const onBirthdayChange:UniHelper.DatePickerOnChange = (ev) =>{
  // console.log(ev.detail.value)
  profile.value.birthday = ev.detail.value
}


/* 退出登录提示 */
const exit_tip = ()=>{
  uni.showModal({
    title: '提示',
    content: '确认退出登录吗？',
    cancelText: "取消",
    confirmText: "退出",
    //删除字体的颜色
    confirmColor:'red', 
    //取消字体的颜色
    cancelColor:'#000000',
    success: function(res) {
      if (res.confirm) {
        //执行确认后 清除用户登录信息( jwt & profile )     
        memberStore.clearJwt()
        memberStore.clearProfile()
        // 执行确认后 跳转到登录“login”页面
        uni.navigateTo({
          url: '/pages/login/login',
        });
      } 
      else {
        // 执行取消后的操作
      }
    }
  })
}

profile.value!.avatar = uni.getStorageSync('avater_src')
onLoad(()=>{
  getProfileInfoData()
})
</script>

<template>
  <view class="viewport">
    <!-- 头像 -->
    <view class="avatar">
      <view @tap="onAvaterChange" class="avatar-content">
        <image class="image" :src=profile.avatar mode="aspectFill" />
        <text class="text" style="color: #666;">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="profile.nickname" />
        </view>
        <view class="form-item">
          <text class="label">账号</text>
          <text>{{ profile.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profile.sex === '男' " />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile.sex === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker class="picker" @change="onBirthdayChange" mode="date" start="1900-01-01" :end="new Date()" :value="profile.birthday">
            <view v-if="profile.birthday">{{ profile.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
      </view>
      <!-- 安全提示 -->
      <view class="safetip">
        <text class="tiptext">根据未成年人保护相关法律法规的要求，我们不主动处理14周岁以下未成年人的个人信息。如果您为14周岁以下的用户，请勿填写您的个人资料。</text>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="SubmitTap">保 存</button>
      <!-- 退出登录 -->
      <button class="exit-button" @tap="exit_tip">退出登录</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #FFF;
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // 头像图片
  .image {
    width: 114px;
    height: 114px;
    border-radius: 50%;
    background-color: #eee;
  }
  // “点此修改头像”提示词
  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 信息表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin-top: 8%;
    padding: 5%;
    background-color: #fff;
  }
  // 信息项
  &-item {
    display: flex;
    height: 20%;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
      padding-left: 5%;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }
// “保存”按钮
  &-button {
    height: 80rpx;
    width: 80%;
    text-align: center;
    line-height: 80rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    font-family: Roboto;
    background-color: #FE726B;
    margin-top: 15%;
  }
}
// 安全提示
.safetip{
  margin:5%;
  width: 90%;
  justify-content: center;
  align-items: center;
}
// 安全提示文本内容
.tiptext{
  font-family: PingFangSC-regular;
  font-size: 12px;
  color: #AAA8AA;
}
// “退出登录”按钮
.exit-button{
  margin-top: 5%;
  width: 40%;
  height: auto;
  font-size: 30rpx;
  font-family: PingFangSC-regular;
  color: #AAA8AA;
  background-color: #F4F4F4;
}
</style>