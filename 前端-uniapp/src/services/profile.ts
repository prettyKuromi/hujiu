import {http} from '@/utils/http'
import type { ProfileDetail } from '@/types/member'
import type { UserDetail } from '@/types/member'
import { ref } from 'vue'


/* 获取profile页面用户信息 */
export const getProfileInfoAPI = () =>{
    return http<ProfileDetail>({
        method:'GET',
        url:'/changeinfo/getUserInfo_second',
    })
}
/* 获取my页面用户信息 */
export const getMyInfoAPI = () =>{
    return http<UserDetail>({
        method:'GET',
        url:'/changeinfo/getUserInfo',
    })
}
/* 用户资料信息修改 */ 
export const postUpdateUserAPI = (data: ProfileDetail) => {
    return http<ProfileDetail>({
        method:'POST',
        url:'/changeinfo/updateUser',
        data,
    })
}
/* 用户头像修改 */
export const postAvatarAPI = (data: ProfileDetail) =>{
    return http({
        method:'POST',
        url: '/changeinfo/updateAvatar',
        data,
    })
}
/* 获取他人用户信息 */
export const getOtherInfoAPI = (account:string) =>{
    return http<UserDetail>({
        method:'GET',
        url:'/detailed/getaccount/'+account,
    })
}
