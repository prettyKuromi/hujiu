<script>
export default {
  //页面跳转
  methods: {
    goToSearchPage() {
      uni.navigateTo({
        url: `/pages/search/search`,
      })
    },
  },
}
</script>

<template>
  <view class="search-bar">
    <view class="GreenBar1">
      <view class="whitebar">
        <view>
          <view @tap="goToSearchPage" class="icon-search">搜索感兴趣的景点、美食</view>
        </view>
      </view>
    </view>
  </view>
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
</style>
