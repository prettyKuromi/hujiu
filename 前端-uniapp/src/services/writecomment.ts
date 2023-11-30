import {http} from '@/utils/http'

//用户发表评论所需参数
export type CommentParams = {
    content: string,
    id: string,
    rating: number,
    sid: string,
    picture1?: string,
    picture2?: string,
    picture3?: string
}

//获取首页美食详情
export const postCommentAPI=function(data: CommentParams){
    return http({
        method:'POST',
        url:'/detailed/postcomment',
        data
    })
}
