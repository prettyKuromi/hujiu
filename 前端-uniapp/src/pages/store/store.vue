<script setup lang="ts">
import type { ListItem } from '@/types/List'
import { onMounted, ref } from 'vue';
import ListColumn from '@/components/ListColumn.vue';
import { StoreFoodAPI, StoreSceneAPI } from '@/services/List';
import type { PageParams } from '@/types/global';

//滚动容器读取及翻页
// 分页参数
const pageSceneParams: Required<PageParams> = {
  page: 1,
  pageSize: 6,
}
const pageFoodParams: Required<PageParams> = {
  page: 1,
  pageSize: 6,
}
const SceneList = ref<ListItem[]>([]);
const FoodList = ref<ListItem[]>([]);
const finish1 = ref(false)
const finish2 = ref(false)
//景点数据
const getSceneListData = async () => {
  if (finish1.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  //读取景点的第一个页面
  const res1 = await StoreSceneAPI(pageSceneParams.page.toString())
  //放入列表
  SceneList.value.push(...res1.datas)
  if (SceneList.value.length === 0) {
    finish1.value = true
    return uni.showToast({ icon: 'none', title: '收藏景点内容为空~' })
  }
  // 分页条件
  if (pageSceneParams.page < Number(res1.data.totalPages)) {
    // 页码累加
    pageSceneParams.page++;
    console.log('当前读取的景点页数:', pageSceneParams.page.toString());
  } else {
    finish1.value = true
  }
}
//美食数据
const getFoodListData = async () => {
  if (finish2.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  //美食第一个页面
  const res2 = await StoreFoodAPI(pageFoodParams.page.toString())
  console.log(res2)
  //放入列表
  FoodList.value.push(...res2.datas)
  if (FoodList.value.length === 0) {
    finish2.value = true
    return uni.showToast({ icon: 'none', title: '收藏美食内容为空~' })
  }
  // 分页条件
  if (pageFoodParams.page < Number(res2.data.totalPages)) {
    // 页码累加
    pageFoodParams.page++;
    console.log('当前读取的美食页数:', pageFoodParams.page.toString());
  } else {
    finish2.value = true
  }
}
// 重置数据
const resetSeceneData = () => {
  pageSceneParams.page = 1
  SceneList.value = []
  finish1.value = false
}
const resetFoodData = () => {
  pageFoodParams.page = 1
  FoodList.value = []
  finish2.value = false
}
// 下拉刷新状态
const isTriggered1 = ref(false)
const isTriggered2 = ref(false)
// 自定义下拉刷新被触发
const onSceneRefresherrefresh = async () => {
  // 开启动画
  isTriggered1.value = true
  // 重置猜你喜欢组件数据
  resetSeceneData()
  await Promise.all([getSceneListData()]) // 关闭动画
  isTriggered1.value = false
}
const onFoodRefresherrefresh = async () => {
  // 开启动画
  isTriggered2.value = true
  // 重置猜你喜欢组件数据
  resetFoodData()
  await Promise.all([getFoodListData()]) // 关闭动画
  isTriggered2.value = false
}

// 组件挂载完毕
onMounted(() => {
  getSceneListData()
  getFoodListData()
})
//加载下一页数据
const SceneScrolltolower = () => {
  getSceneListData();
}
const FoodScrolltolower = () => {
  getFoodListData();
}

//其他
const showFirstContainer = ref(true);

function goToSearchPage() {
  uni.navigateTo({
    url: `/pages/storesearch/storesearch`,
  })
}
function goToSearchPage1() {
  uni.navigateTo({
    url: `/pages/storesearch1/storesearch1`,
  })
}
</script>
<template>
  <!-- 搜索条 -->
  <view class="search-bar">
    <view class="GreenBar1">
      <view class="whitebar">
        <view>
          <view @tap="goToSearchPage" class="icon-search" v-if="showFirstContainer">搜索您收藏的景点</view>
          <view @tap="goToSearchPage1" class="icon-search" v-else>搜索您收藏的美食</view>
        </view>
      </view>
    </view>
  </view>

  <!--景点与美食分栏-->
  <!--景点与美食分栏-->
  <div class="Bar3">
    <div class="section" :class="{ 'active': !showFirstContainer }">
      <image class="logo1" @click="showFirstContainer = true" src="@/static/images/simple1.png" v-if="showFirstContainer"></image>
      <image class="logo1" @click="showFirstContainer = true" src="@/static/images/scene_grey.png" v-else></image>
      <view class="logo1-text" @click="showFirstContainer = true">景点</view>
    </div>
    <div class="section" :class="{ 'active': showFirstContainer }">
      <image class="logo1" @click="showFirstContainer = false" src="@/static/images/food_grey.png" v-if="showFirstContainer"></image>
      <image class="logo1" @click="showFirstContainer = false" src="@/static/images/simple2.png" v-else></image>
      <view class="logo1-text" @click="showFirstContainer = false">美食</view>
    </div>
  </div>

  <!-- 滚动容器 -->
  <scroll-view
    @scrolltolower="SceneScrolltolower" 
    scroll-y
    class="barscroll"
    refresher-enabled
    @refresherrefresh="onSceneRefresherrefresh"
    :refresher-triggered="isTriggered1"
    v-if="showFirstContainer"
  >
    <view v-for="item in SceneList" :key="item.name">
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
  <scroll-view
    @scrolltolower="FoodScrolltolower"
    scroll-y
    class="barscroll"
    refresher-enabled
    @refresherrefresh="onFoodRefresherrefresh"
    :refresher-triggered="isTriggered2"
    v-else
  >
    <view v-for="item in FoodList" :key="item.name">
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

<style lang="scss">
//搜索条
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
  height: 5vh;
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
//美食、景点分栏
.Bar3 {
  background-color: rgba(175, 225, 175, 1);
  display: flex;
  height: 4vh;
  width: 100%;
  left: 0px;
  justify-content: space-around;
  align-items: center;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  font-family: Roboto;
  .section {
    display: flex;
    align-items: center;
    .logo1 {
      width: 24px;
      height: 24px;
    }
    .logo1-text {
      background-color: rgba(175, 225, 175, 1);
      line-height: 20px;
      font-size: 14px;
      text-align: left;
      font-family: PingFangSC-semiBold;
    }
  }
}
.active {
  // font-weight: bold;
  color: #716D71;
}
// 滚动容器组件
.barscroll {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  background-color: rgba(239, 239, 245, 1);
  height: 89vh;
  overflow-y: auto;
}
</style>
