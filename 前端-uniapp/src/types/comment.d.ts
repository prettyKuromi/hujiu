/** 用户上传景点/美食 */
export type CommentDetail = {
    /** 上传类形：0代表景点，1代表美食  */
    sid?: string
    /** 名称 */
    name?: string
    /** 开放时间 */
    opening_hours?: string
    /** 具体位置 */
    address?: string
    /** 图片 */
    picture?: string
  }