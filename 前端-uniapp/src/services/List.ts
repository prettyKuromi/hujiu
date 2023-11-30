import type { ListItem, PageItem } from '@/types/List'
import type { DataResult } from '@/types/global'
import { http } from '@/utils/http'

/////首页部分
//首页景点
export const getSceneAPI = (page: string) => {
  return http<DataResult<PageItem, ListItem>>({
    method: 'GET',
    url: '/index/scene',
    data: {
      page,
    },
  })
}
//首页美食
export const getFoodAPI = (page: string) => {
  return http<DataResult<PageItem, ListItem>>({
    method: 'GET',
    url: '/index/food',
    data: {
      page,
    },
  })
}

//首页景点搜索
export const SeachSceneAPI = (keyword: string, page: string) => {
  return http<DataResult<PageItem, ListItem>>({
    method: 'GET',
    url: '/index/scene/search',
    data: {
      keyword,
      page,
    },
  })
}

//首页美食搜索
export const SeachFoodAPI = (keyword: string, page: string) => {
  return http<DataResult<PageItem, ListItem>>({
    method: 'GET',
    url: '/index/food/search',
    data: {
      keyword,
      page,
    },
  })
}

/////收藏部分
//收藏景点
export const StoreSceneAPI = (page: string) => {
  return http<DataResult<PageItem, ListItem>>({
    method: 'GET',
    url: '/save/scene',
    data: {
      page,
    },
  })
}
//收藏美食
export const StoreFoodAPI = (page: string) => {
  return http<DataResult<PageItem, ListItem>>({
    method: 'GET',
    url: '/save/food',
    data: {
      page,
    },
  })
}

//收藏景点搜索
export const StoreSeachSceneAPI = (keyword: string, page: string) => {
  return http<DataResult<PageItem, ListItem>>({
    method: 'GET',
    url: '/save/scene/search',
    data: {
      keyword,
      page,
    },
  })
}

//收藏美食搜索
export const StoreSeachFoodAPI = (keyword: string, page: string) => {
  return http<DataResult<PageItem, ListItem>>({
    method: 'GET',
    url: '/save/food/search',
    data: {
      keyword,
      page,
    },
  })
}