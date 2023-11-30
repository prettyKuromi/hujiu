<script setup lang="ts">
import { useMemberStore } from '@/stores';
import {ref} from 'vue';
import { postloginAPI } from '@/services/login';
import type {LoginParams} from '@/services/login';
import type { ProfileDetail } from '@/types/member';

//本地存储
const memberStore=useMemberStore()

//点击新用户注册
const OnclickRegister=function(){
  //跳转页面
  uni.navigateTo({ url: '/pages/register/register' })
}


//账号信息
const account=ref<string>("")
const psd=ref<string>("")
const profile=ref<ProfileDetail>({})

//点击登录
const onLogin=async function(){
  const loginParams = ref<LoginParams>({ account: account.value, password: psd.value });
  const res=await postloginAPI(loginParams.value)
  if(res.code=="1"){
    uni.showToast({icon:'error',title:'账号或密码错误'})
  }else if(res.code=="0"){
    //设置本地
    memberStore.setJwt(res.jwt)
    
    memberStore.setAccount(account.value)
    memberStore.setProfile(profile.value)
    //提示并跳转页面
    uni.showToast({icon:'success',title:'登录成功'})
    setTimeout(() => {
      uni.switchTab({ url: '/pages/index/index' })
    }, 500)
  }
}

</script>

<template>
  <!-- 测试样例，测试本地pinia存储持久化 -->
    <!-- <button @tap="memberStore.clearProfile()">清空用户信息</button> -->
  <div class="Inputcontainer">
      <img src="../static/logo.png" alt="" class="img">
      <input type="text" class="account ipt" placeholder="请输入账号" v-model="account">
      <input type="password" class="pwd ipt" placeholder="请输入密码" v-model="psd">
      <div class="register" @tap="OnclickRegister">新用户注册</div>
  </div>
  
  <div class="login" @tap="onLogin">登录</div>
</template>

<style lang="scss">
page{
  background-color: rgba(255, 255, 255, 1);
}
.Inputcontainer{
  position: relative;
  margin-top: 30px;
  .img {
    position: absolute;
    left: 0;
    right: 0;
    margin-left:auto ;
    margin-right:auto ;
    width: 200px;
    height: 200px;
  }
  .ipt{
      padding-left: 20px; 
      position: absolute;
      left: 0;
      right: 0;
      margin-left:auto ;
      margin-right:auto ;
      width: 70%;
      height: 52px;
      line-height: 52px;
      border-radius: 26px;
      background-color: rgba(249, 249, 249, 1);
      color: rgba(136, 136, 136, 1);
      font-size: 20px;
      text-align: left;
      font-family: Roboto;
      border: 1px solid rgba(255, 255, 255, 1);
  }
  .account{
      top: 220px;
  }
  .pwd{
      top: 290px;
  }
  .register{
    position: absolute;
    top: 360px;
    left: 40%;
    height: 28px;
    line-height: 28px;
    color: rgba(136, 136, 136, 1);
    font-size: 15px;
    text-align: left;
    font-family: PingFangSC-regular;
  }
}
.login{
  position: absolute;
  top: 440px;
  line-height: 40px;
  border-radius: 10px;
  background-color: rgba(254, 114, 107, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(255, 255, 255, 1);
  width: 80%;
  margin-left:10%;
  height: 40px;
  float: left;
}
</style>