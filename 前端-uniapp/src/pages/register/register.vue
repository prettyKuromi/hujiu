<script setup lang="ts">
import { useMemberStore } from '@/stores';
import {ref} from 'vue';
import type {RegisterParams} from '@/types/member';
import { postregisterAPI } from '@/services/register';

//本地存储
const memberStore=useMemberStore()

//账号信息
const account=ref<string>("")
const psd1=ref<string>("")
const psd2=ref<string>("")

//点击注册按钮
const OnRegister=async function(){
  //判断两次密码是否一致
  if (psd1.value !== psd2.value) {
    return uni.showToast({icon: 'error', title: '密码不一致'});
  } else if(psd1.value.length < 6 || psd2.value.length > 12){
    return uni.showToast({icon: 'error', title: '密码需6到12位'});
  }else if (account.value.length < 1 || account.value.length > 10) {
    return uni.showToast({icon: 'error', title: '账号需1到10位'});
  } else if(!/^[0-9a-zA-Z]+$/.test(account.value) || !/^[0-9a-zA-Z]+$/.test(psd1.value)){
    return uni.showToast({icon: 'error', title: '请输入字母数字'});
  }
  //验证通过，执行后续步骤
  
  const RegisterParams:RegisterParams={
    account:account.value,
    password:psd1.value
  }
  
  const res=await postregisterAPI(RegisterParams)
  if(res.code==0){
    uni.showToast({icon:'success',title:'注册成功~'})
    //存储jwt和账号在本地
    memberStore.setJwt(res.jwt)
    memberStore.setAccount(account.value)
    
    setTimeout(function(){
      uni.switchTab({ url: '/pages/login/login' })
    },500)
    
  }else{
    //错误提示
    uni.showToast({icon:'none',title:'注册失败，换个用户名试试'})
  }
  

}
</script>

<template>
  <div class="Inputcontainer">
      <img src="../static/logo.png" alt="" class="img">
      <input type="text" class="account ipt" placeholder="请输入账号,1到10位" v-model="account">
      <input type="password" class="pwd1 ipt" placeholder="请输入密码,6到12位" v-model="psd1">
      <input type="password" class="pwd2 ipt" placeholder="验证密码" v-model="psd2">
  </div>
  
  <div class="register" @tap="OnRegister">立刻注册</div>
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
      position: absolute;
      padding-left: 20px; 
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
  .pwd1{
      top: 290px;
  }
  .pwd2{
    top: 360px;
  }
}
.register{
  position: absolute;
  top: 470px;
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