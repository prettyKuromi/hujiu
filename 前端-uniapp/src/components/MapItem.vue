<template>
  <map class="map-item" :latitude="latitude" :longitude="longitude" :markers="markers" @markertap="markerTap"></map>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
  props: {
    SceneList: {
      type: Array,
      required: true,
    },
    FoodList: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      latitude: 0,
      longitude: 0,
      markers: [],
    };
  },
  mounted() {
    uni.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.latitude = res.latitude;
        this.longitude = res.longitude;

        // 在地图上添加标记
        this.SceneList.forEach((item) => {
          console.log(item.Latitude, item.Longitude, item.id)
          const marker = {
            id: item.id,
            latitude: parseFloat(item.Latitude),
            longitude: parseFloat(item.Longitude),
            title: item.name,
            width: 28,
            height: 28,
          };
          this.markers.push(marker);
        });
        const marker = {
          id: '0',
          latitude: res.latitude,
          longitude: res.longitude,
          title: '我的位置',
          width: 25,
          height: 25,
          iconPath: '/static/images/dingwei-logo.png',
        };
        this.markers.push(marker);
        this.FoodList.forEach((item) => {
          const marker = {
            id: item.id,
            latitude: parseFloat(item.Latitude),
            longitude: parseFloat(item.Longitude),
            title: item.name,
            width: 28,
            height: 28,
          };
          this.markers.push(marker);
        });
      },
      fail: (error) => {
        console.error('定位失败', error);
      },
    });
  },
  methods: {
    markerTap(e) {
      // 点击标记点事件处理
      console.log('Marker tapped:', e.markerId);

      if (e.markerId != '0') {
        uni.navigateTo({ url: '/pages/detail/detail?id=' + e.markerId });
      }
    }
  },
};
</script>


<style>
.map-item {
  width: 100vw;
  height: 50vh;
}
</style>