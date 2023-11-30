import {http} from '@/utils/http'

//类型
export type postFavorParams = {
    id: string //景点或美食id
    account:string  //用户名，存储在storage中
}


//收藏景点或美食
export const postFavorAPI=function(data: postFavorParams){
    return http({
        method:'POST',
        url:'/save/save_delete',
        data
    })
}

