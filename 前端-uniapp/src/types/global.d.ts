/** 通用分页结果类型 */
export type DataResult<T1, T2> = {
  item1: T1[]
  item2: T2[]
}
/** 通用分页参数类型 */
export type PageParams = {
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 10 */
  pageSize?: number
}