//景点、美食的滚动容器
export type ListItem = {
  name: string
  rank: number
  address: string
  commentnum: integer
  opening_hours: string
  picture: string
  Longitude: string
  Latitude: string
  id: string
  isLike: string
}

export type PageItem = {
  /** 总条数 */
  counts: number
  /** 每页条数 */
  pageSize: number
  /** 总页数 */
  totalPages: number
  /** 当前页数 */
  page: number
}
