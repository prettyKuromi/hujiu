import type { DetailItem } from '@/types/detail'
import {http} from '@/utils/http'

//获取首页美食详情
export const getFoodAPI=function(){
    return http({
        method:'GET',
        url:'/index/food'
    })
}

