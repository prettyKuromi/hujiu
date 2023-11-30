import {http} from '@/utils/http'

//详情信息的类型
export type DetailItem = {
    counts:number,
    pages:number,
    page:number,
    pagesize:number,
    isLike:string
    datas:{
        name:string,
        address:string,
        picture:string,
        rank:string,
        longtitude:string,
        latitude:string,
        comment:CommentItem
    }
}
//评论详情
export type CommentItem = {
    content:string,
    account:string,
    nickname:string,
    rating:string,
    avatar:string,
    picture1:string,
    picture2:string,
    picture3:string,
}



//获取详情
export const getDetailAPI=function(id,data:string){
    return http<DetailItem>({
        method:'GET',
        url:`/all/details/${id}`,
        data
    })
}

