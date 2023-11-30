<script setup lang="ts">
import { ref,defineProps } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import Comments from '../../components/comments.vue'
import {postFavorAPI} from '@/services/favor'
import type {postFavorParams} from '@/services/favor'
import { useMemberStore } from '@/stores';
import {getDetailAPI} from '@/services/detail'
import { getCurrentInstance } from 'vue';
import type {CommentItem } from '@/services/detail'

const activeIndex = ref(0)

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

//获取屏幕宽度
const systemInfo = uni.getSystemInfoSync();
const screenWidth = systemInfo.windowWidth;

//接收页面参数
//接收页面参数
const query = defineProps<{
  id: string
}>()

//加载数据
const imageSrc=ref("")
const detaildata=ref()
const commentList=ref<CommentItem[]>([])
const isFavor=ref(true)
const name=ref('')
const getDetailData=async function(id,data){
  const res=await getDetailAPI(id,data)
  detaildata.value=res.datas.Main
  imageSrc.value=detaildata.value.picture
  //数据用于导航
  nav_Latitude.value=res.datas.Main.Latitude
  nav_Longitude.value=res.datas.Main.Longitude
  nav_name.value=res.datas.Main.name
  nav_address.value=res.datas.Main.address
  commentList.value=res.datas.comment  
  //判断是否收藏
  if(res.data.isLike==='已收藏'){
    isFavor.value=false
  }else{
    isFavor.value=true
  }
  //获取名字
  name.value=res.datas.Main.name
}

//点击图片时大图预览 
const onTapImage=function(){
  uni.previewImage({
    current:imageSrc.value,
    //图片的链接
    urls:[imageSrc.value]
  })
}

//当前是否被收藏,点击切换（后续实现提交）
const favorChange=async function(){
  //上传服务器
  const post_id=query.id
  //本地存储，用于获取account
  const memberStore=useMemberStore()
  console.log(memberStore.profile.account)
  
  const params: postFavorParams = {
      id: post_id,
      account: memberStore.profile.account
  };
  console.log(params);

  const res=await postFavorAPI(params)
  console.log(res);
  
  //提示
  isFavor.value=!isFavor.value
  const msg=isFavor.value ? '取消收藏成功':'收藏成功'
  uni.showToast({icon:'none',title:msg})
  
}

const id=query.id
const sid='0'
//用户写评论
const writecomment=function(){
  //跳转页面
  uni.navigateTo({ url: `/pages/writecomment/writecomment?id=${id}&sid=${sid}&name=${name.value}` })
}


onLoad(() => {
  getDetailData(query.id,{page:'1',account:'mipha'})
})


//导航去这里
const nav_Latitude=ref('')
const nav_Longitude=ref('')
const nav_name=ref('')
const nav_address=ref('')

const navigation1=function(){
    uni.openLocation({
      latitude: parseFloat(nav_Latitude.value),
      longitude: parseFloat(nav_Longitude.value),
      scale: 15,
      name:nav_name.value,
      address:nav_address.value,
      success: function (res) {
        const instance = getCurrentInstance();
        // instance.proxy.$modal.msgSuccess('打开地图成功！', res);
      },
      fail: function (error) {
        const instance = getCurrentInstance();
        //instance.proxy.$modal.msgError('打开地图失败！', error);
      },
    });
  }
</script>

<template> 
  <!-- 首页大图 -->
  <view class="bigimgcontainer" :style="{ width: screenWidth+'px'}"  @tap="onTapImage">
    <img :src="detaildata.picture" alt="" class="bigimg" mode="aspectFill">
  </view>
  <!-- 简介（包括名字、评分、地址） -->
  <div class="brief clearfix">
    <view class="name">{{detaildata.name  }}</view>
    <view class="score">{{ detaildata.rank }}分</view>
    <view class="position">地点：{{ detaildata.address }}</view>
    <view class="favor" @tap="favorChange">
      <img src="../../static/detail/favor_default.png" alt="" v-if="isFavor" class="img">
      <img src="../../static/detail/favor_selected.png" alt="" v-else class="img">
    </view>
    
  </div>
  <!-- 滚动 -->
  <scroll-view scroll-y>
    <!-- 评论组件 -->
    <Comments :commentdata="item" v-for="(item,index) in commentList" :key="index"></Comments>
  </scroll-view>
  <div class="placehorder">
      placehorder
  </div>
  <!-- 发表评论 -->
  <div class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <img src="../../static/detail/deliver_comment.png" alt="" class="deliverImg"  @tap="writecomment">
    <view class="write" @tap="writecomment">写评价</view>
    <view class="navigation" @tap="navigation1">
      <img src="../../static/detail/navigation.png" alt="" class="img">
      <view class="content">导航去这里</view>
    </view>
  </div>
</template>



<style lang="scss">
page{
  background-color: #EFEFEF;
}

// 首页大图
.bigimgcontainer{
  height: 200px;

  overflow: hidden;
  .bigimg{
    width: 100%;
    object-fit: cover;
  }
}

.brief{
  margin-top:5px ;
  margin-left: 1px;
  margin-right: 1px;
  position: relative;
  background-color:#FFFFFF;
  border: 1px solid rgba(187, 187, 187, 1);

  width: 100%;
  .name{
    float: left;
    margin-top: 1%;
    left: 5%;
    font-size: 26px;
    color: #101010;
    line-height: 36px;
    text-align: center;
    font-family: PingFangSC-semiBold;
    margin-left: 5%;
    margin-right: 5%;
  }
  .score{
    float: left;
    border-radius: 5px;
    border: #101010;
    background-color:#FE726B ;
    color: #FFFFFF;
    font-size:15px ;
    text-align: center;
    line-height: 22px;
    left: 20%;
    height: 22px;
    width: 80px;
    margin-left: 50px;
    margin-top: 5px;
    margin-right: 1000px ;
  }
  .position{
    float: left;
    left: 5%;
    margin-top: 5px;
    color: rgba(170, 168, 170, 1);
    right: 35%;
    width:60%;
    margin-left: 20px;
  }
  .favor .img{
    float:right;
    height: 70px;
    width:70px;
    margin-top:-20px;
    margin-right: 30px;
  }
}
//占位
.placehorder{
  float: left;
  padding-bottom: 15%;
  color: #EFEFEF;
}

// 底部工具栏
.toolbar{
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  border: 1px solid rgba(187, 187, 187, 1);
  bottom: 0;
  background-color:#F7F7F7 ;
  .deliverImg{
    width: 30px;
    height: 30px;
    float: left;
    margin-top: 10px;
    margin-left: 10px;
  }
  .write{
    color:#FE726B;
    font-size: 14px;
    float: left;
    margin-top: 15px;
    margin-left: 10px;
  }
  .navigation{
    background-color: #FFA500;
    border-radius: 10px;
    width: 30%;
    height: 30px;
    float: right;
    margin-top: 10px;
    margin-right: 20px;
    .img{
      width: 20px;
      height: 20px;
      float: left;
      margin-top: 4px;
    }
    .content{
      color:#FFFFFF;
      float: left;
      line-height: 30px;
    }
  }
}
.clearfix::after{
    content: "";
    display: block;
    clear: both;
}
</style>