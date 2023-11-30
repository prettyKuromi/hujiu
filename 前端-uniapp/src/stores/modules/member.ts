import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProfileDetail } from '@/types/member'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref({} as ProfileDetail)
    //账号
    const account=ref<string>('ssssss')
    //jwt信息 
    const jwt=ref<any>()
    //保存jwt，登录时使用
    const setJwt = (val: any) => {
      jwt.value = val
    }
    //清理jwt信息
    const clearJwt = () => {
      jwt.value = ''
    }

    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      account.value = val
    }

    //保存account
    const setAccount=(val:string)=>{
      profile.value.account=val
      console.log('ssss')
      console.log(profile.value.account)
      
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = {}
    }

    // 记得 return
    return {
      profile,
      jwt,
      setJwt,
      clearJwt,
      setAccount,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    persist: {
      storage:{
        getItem(key){
          return uni.getStorageSync(key)
        },
        setItem(key,value){
          uni.setStorageSync(key,value)
        }
      }
    },
  },
)