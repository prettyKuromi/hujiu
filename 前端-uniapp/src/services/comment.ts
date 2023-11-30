import {http} from '@/utils/http'
import type { CommentDetail } from '@/types/comment'

/* 用户上传景点/美食 */
export const postUserCommentAPI = (data: CommentDetail) => {
    return http<CommentDetail>({
        method:'POST',
        url:'/release',
        data,
    })
}