import {http} from '@/utils/http'

//小程序登录data请求参数
export type LoginParams = {
    account: string
    password:string
}

//获取首页美食详情
export const postloginAPI=function(data: LoginParams){
    return http({
        method:'POST',
        url:'/user/login',
        data
    })
}
