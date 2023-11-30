import {http} from '@/utils/http'


//小程序登录data请求参数
export type RegisterParams = {
    account: string
    password:string
}

//获取首页美食详情
export const postregisterAPI=function(data: RegisterParams){
    return http({
        method:'POST',
        url:'/user/register',
        data
    })
}
