<script setup lang="ts">
import {ref,defineProps} from 'vue'
import {http} from '@/utils/http'
import type {CommentParams} from '@/services/writecomment';
import {postCommentAPI} from '@/services/writecomment';


//接收页面参数
const query = defineProps<{
  id: string
  sid:string
  name:string
}>()

//数据
const score=ref()
const content=ref('')
const picture=ref('')

console.log(score.value);


//用户发表评论的图片
const img=ref('../../static/upload.png')

//点击提交按钮
const OnUpload=async function(){
  //传参
  const CommentParams:CommentParams={
    rating:Number(score.value),
    content:content.value,
    id:query.id,
    sid:query.sid,
  }
  //判断用户是否提交评论图片
  if(picture.value!==''){
    CommentParams.picture1=picture.value
  }
  //一系列逻辑判断
  if(!score.value){
    return uni.showToast({icon: 'none', title: '请填写评分~'});
  }else if(score.value<0 || score.value>5){
    return uni.showToast({icon: 'none', title: '评分需0~5分'});
  }else if(Number.isNaN(CommentParams.rating)){
    return uni.showToast({icon: 'none', title: '评分请填写数字哦~'});
  }else if(!content.value){
    return uni.showToast({icon: 'none', title: '请填写评价内容~'});
  }
  console.log(CommentParams);
  
  const res=await postCommentAPI(CommentParams)
  if(res.code=="0"){
    uni.showToast({icon:'none',title:'评论提交成功~'})
    setTimeout(function(){
      uni.navigateBack()
    },500) 
  }else{
    uni.showToast({icon:'none',title:res.msg})
  }
  
}
//上传图片
const onUploadImg=async function(){
  uni.chooseMedia({
    count:3,  //文件个数
    mediaType:['image'], //文件类型
    success:async function(res){
      //本地路径
      const {tempFilePath}=res.tempFiles[0]
      console.log(tempFilePath)
      img.value=tempFilePath
      picture.value=tempFilePath
    }
  })
}

</script>

<template> 
  <view class="title">
    {{ query.name }}
  </view>
  <view class="score">
    <view class="content">
      评分：
    </view>
    <input type="text" placeholder="请输入评分（0~5分,例：4.7）" v-model="score">
  </view>
  <!-- <input type="text" placeholder="评价内容" class="commentContent"> -->
  <textarea class="commentContent" placeholder="评价内容" v-model="content" placeholder-class="textarea-placeholder"/>
  <view class="uploadImg" @tap="onUploadImg">
    <img :src="img" alt="" class="img" mode="aspectFill">
  </view>
  <view class="upload" @tap="OnUpload">提交评论</view>
</template>


<style lang="scss">
page{
  background-color: #EFEFEF;
}

.title{
  color:#101010;
  font-size: 26px;
  float: left;
  margin-top: 12px;
  margin-left: 10px;
}

.score{
  float: left;
  margin-top: 30px;
  position: relative;
  width: 100%;
  .content{
    color:#3E4248;
    font-size: 16px;
    position: absolute;
    left: 5%;
  }
  input{
    border: 1px solid rgba(187, 187, 187, 1);
    position: absolute;
    width: 70%;
    right: 5%
  }
}
.commentContent{
  border: 1px solid rgba(187, 187, 187, 1);
  width: 90%;
  height: 300px;
  float: left;
  margin-top: 15%;
  margin-left: 5%;
  resize: none;
  word-wrap: break-word; 
  contenteditable:"true";
}

.upload{
  float: left;
  background-color: #FFA500 ;
  font-family: Roboto;
  border: 1px solid rgba(255, 255, 255, 1);
  width: 90%;
  margin-left: 5%;
  border-radius:10px ;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: white;
  margin-top: 10px;
}

.uploadImg {
  float: left;  
  width: 180px;
  height: 180px;
  left: 0;
  right: 0;
  margin-top: 10px;
  margin-left: 25%;
  .img{
    width: 180px;
    height: 180px;
    outline: 1px dashed #BBBBBB;
  }
}
</style>