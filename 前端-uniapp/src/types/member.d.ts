/** profile页面用户信息 */
export type ProfileDetail = {
    /** 头像  */
    avatar?: string
    /** 昵称 */
    nickname?: string
    /** 账号 */
    account?: string
    /** 性别 */
    sex?: Gender
    /** 生日 */
    birthday?: string
  }

/** 性别 */
export type Gender = '女' | '男'

/** 主页用户信息 */
export type UserDetail = {
  /** 头像  */
  avatar?: string
  /** 昵称 */
  nickname?: string
  /** 信誉分 */
  credit?: int
}