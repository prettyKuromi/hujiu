<script setup lang="ts">
//景点搜索页面
import ListColumn from '@/components/ListColumn.vue';
import { StoreSeachSceneAPI } from '@/services/List';
import type { ListItem } from '@/types/List';
import type { PageParams } from '@/types/global';
import { ref } from 'vue';

const keyword = ref('');
const SearchSceneList = ref<ListItem[]>([]);
const finish = ref(false)
//设置全局变量，接收关键词
let key = ref('');

const search = () => {
  resetData()
  getListData(keyword.value)
};
//分页参数
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 6,
}
// 重置数据
const resetData = () => {
  finish.value = false
  SearchSceneList.value = []
  pageParams.page = 1
}
// 下拉刷新状态
const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onSceneRefresherrefresh = async () => {
  // 开启动画
  isTriggered.value = true
  // 重置组件数据
  resetData()
  await Promise.all([getListData(key.value)]) // 关闭动画
  isTriggered.value = false
}

const getListData = async (searchKeyword: string) => {
  key.value = searchKeyword;
  if (finish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  //读取搜索的第一个页面
  const res3 = await StoreSeachSceneAPI(searchKeyword, pageParams.page.toString())
  console.log("The datas have recieved",res3)
  //放入列表
  SearchSceneList.value.push(...res3.datas)
  if (SearchSceneList.value.length === 0) {
    finish.value = true
    return uni.showToast({ icon: 'none', title: '无数据，换个词试试~' })
  }
  //分页条件
  if (pageParams.page < Number(res3.data.totalPages)) {
    // 页码累加
    pageParams.page++;
    console.log('当前读取的景点搜索页数:', pageParams.page.toString());
  } else {
    finish.value = true
  }
}
// 加载下一页数据
const SceneScrolltolower = () => {
  getListData(key.value);
}
</script>


<template>
  <view class="search-bar">
    <view class="GreenBar1">
      <view class="whitebar">
        <view>
          <input
            class="icon-search"
            type="text"
            v-model="keyword"
            placeholder="搜索您收藏的景点"
            @confirm="search"
          />
        </view>
      </view>
    </view>
  </view>
  <scroll-view
    @scrolltolower="SceneScrolltolower"
    scroll-y
    class="bar"
    refresher-enabled
    @refresherrefresh="onSceneRefresherrefresh"
    :refresher-triggered="isTriggered"
  >
    <view v-for="item in SearchSceneList" :key="item.name">
      <List-Column
        :picSrc="item.picture"
        :star-name="item.name"
        :rating="item.rank"
        :reviewCount="item.commentnum"
        :address="item.address"
        :openingHours="item.opening_hours"
        distance="7.6"
        :Longitude="item.Longitude"
        :Latitude="item.Latitude"
        :isLike="item.isLike"
        :id="item.id"
      />
    </view>
  </scroll-view>
</template>

<style>
.GreenBar1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vh;
  width: calc(100vw);
  line-height: 20px;
  background-color: rgba(175, 225, 175, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: center;
  font-family: Roboto;
}

.whitebar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw * 0.95);
  height: 4.3vh;
  line-height: 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(255, 255, 255, 1);
}

.icon-search {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.7vh;
  width: 100%;
  line-height: 20px;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(133, 133, 133, 1);
  font-size: 14px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}

.icon-search::before {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.7vh;
  width: 20px;
}

.bar {
  height: 93vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  background-color: rgba(239, 239, 245, 1);
  overflow-y: auto;
}
</style>
