<script setup lang="ts">
import { ref } from 'vue'
import { toRefs, defineProps } from 'vue'
import type {CommentItem } from '@/services/detail'

const isUp=ref(false) 
const isDown=ref(false)

//点赞时
const upChange=function(){
    isUp.value=!isUp.value
    if(isUp.value && isDown.value){
        isUp.value=!isUp.value
        return uni.showToast({icon:'none',title:'请不要又点又踩哦'})
    }
    //保存弹出层组件ref
    popupName.value = "up"
    if(isUp.value===true){
        popup.value?.open()
    }
    
}

//点踩时
const downChange=function(){
    isDown.value=!isDown.value
    if(isUp.value && isDown.value){
        isDown.value=!isDown.value
        return uni.showToast({icon:'none',title:'请不要又点又踩哦'})
    }
    //弹出层
    popupName.value = "down"
    if(isDown.value===true){
        popup.value?.open()
    }
}

// uni-ui 弹出层组件 ref
const popup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()

// 弹出层条件渲染
const popupName = ref<'up' | 'down'>()


//文本框的内容
const content=ref<string>('')
//点击提交
const submit=function(){
    if(content.value.trim()===""){
        return uni.showToast({icon:'none',title:'内容不能为空哦~'})
    }
    uni.showToast({icon:'none',title:'感谢提交~'})
    popup.value?.close()
    content.value=''
}

//接收父组件的传参
const props = defineProps({
  //子组件接收父组件传递过来的值
  commentdata: {
    type: Object as () => CommentItem,
    required: true
  }
})
//使用父组件传递过来的值
const {commentdata} =toRefs(props)

//根据commentdata
//用户评论图片列表
const imageList=ref<string[]>([])
if(commentdata.value.picture1!=='空'){
    imageList.value.push(commentdata.value.picture1)
}
if(commentdata.value.picture2!=='空'){
    imageList.value.push(commentdata.value.picture2)
}
if(commentdata.value.picture3!=='空'){
    imageList.value.push(commentdata.value.picture3)
}


//点击图片时大图预览 
const onTapImage=function(url:string){
  uni.previewImage({
    current:url,
    //图片的链接
    urls:imageList.value
  })
}

const Onotheruser=function(account){
    uni.navigateTo({
      url: `/pagesMember/profilecard/profilecard2?account=${account}`,
    })
}

</script>
 
<script lang="ts">
// 导出组件
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Comments',
  // 组件属性和方法
})
</script>

<template> 
    <div class="comment clearfix"  >
        <view class="head" @tap="Onotheruser(commentdata.account)">
            <img :src="commentdata.avatar" alt="" class="avatar">
        </view>
        <view class="name">{{ commentdata.nickname }}</view>
        <view class="score">{{commentdata.rating}}分</view>
        <view class="content">{{ commentdata.content }}</view>
        <!-- 用户评论发布的图 -->
        <div class="imgcontainer">
            <div class="commentImgs" v-for="(item,index) in imageList" :key="index" @tap="onTapImage(item)">
                <img :src="item" alt="" class="commentImg"  mode="aspectFill">
            </div>
        </div>
        
        <!-- 点赞区 -->
        <view class="up">
            <view @tap="upChange">
                <img src="../static/detail/up_selected.png" alt="" class="img imgup" v-if="isUp">
                <img src="../static/detail/up_default.png" alt="" class="img imgup" v-else>
            </view>
            <view class="num upnum">点赞</view>
        </view>
        <!-- 点踩区 -->
        <view class="down">
            <view @tap="downChange">
                <img src="../static/detail/down_selected.png" alt="" class="img imgdown" v-if="isDown">
                <img src="../static/detail/down_default.png" alt="" class="img imgdown" v-else>
            </view>
            
            <view class="num downnum">点踩</view>
        </view>
        <!-- uni-ui 弹出层 -->
        <uni-popup ref="popup" type="bottom" background-color="#fff" class="popup">
            <div v-if="popupName === 'up' && isUp" @close="popup?.close()">
                <textarea class="commentContent" placeholder="如果能给出点赞理由最好啦~" v-model="content" placeholder-class="textarea-placeholder"/>
                <div class="btn" @tap="submit">提交</div>
            </div>
            <div v-if="popupName === 'down' && isDown" @close="popup?.close()">
                <textarea class="commentContent" placeholder="如果能给出点踩理由最好啦~" v-model="content" placeholder-class="textarea-placeholder"/>
                <div class="btn" @tap="submit">提交</div>
            </div>
        </uni-popup>
    </div>
</template>



<style lang="scss">
.comment{
    background-color:#FFFFFF  ;
    border-radius:5px ;
    margin: 5px 1px;
    border: 1px solid rgba(187, 187, 187, 1);
    float: left;
    width: 100%;
    position: relative;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    .head .avatar{
        float: left;
        width: 40px;
        height: 40px;
        border-radius:50% ;
        border:0.5px solid rgba(187, 187, 187, 1);
        margin-top: 5px;
        margin-left: 5px;
    }
    .name{
        color:#101010;
        font-size: 12px;
        float: left;
        margin-top: 5px;
        margin-left: 10px;
        width: 100px;
    }
    .score{
        float: left;
        border-radius: 5px;
        border: #101010;
        background-color:#FE726B ;
        color: #FFFFFF;
        font-size:12px ;
        width: 40px;
        text-align: center;
        margin-top: 25px;
        margin-left:-100px ;
        margin-right: 100px;
    }
    .content{
        color:#101010;
        font-size: 14px;
        float: left;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 12px;
    }
    //评论的图片
    .imgcontainer{
        width: 100%;
        .commentImgs{
            float: left;
            width: 110px;
            height: 110px;
            margin-bottom: 30px;
            margin-left: 5px;
            margin-right:5px ;
        } 
        .commentImg{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
    }
    
    .img{
        width: 15px;
        height: 15px;
        position: absolute;
        bottom: 10px;
    }
    .imgup{
        left: 60%;
    }
    .imgdown{
        left: 80%;
    }
    .num{
        position: absolute;
        bottom: 8px;
        color:#101010;
        font-size: 12px;
    }
    .upnum{
        left: 65%;
    }
    .downnum{
        left: 85%;
    }
}

.clearfix::after{
    content: "";
    display: block;
    clear: both;
}

.popup{
    .commentContent{
        padding-left: 10px;
        line-height: 26px;
        background-color: rgba(255,255,255,1);
        color: rgba(136,136,136,1);
        font-size: 18px;
        text-align: left;
        font-family: Microsoft Yahei;
        border: 1px solid rgba(187, 187, 187, 1);
        width: 90%;
        margin-left: 5%;
        border-radius: 10px;
        margin-top:10px ;
    }
    .btn{
        margin-top:10px ;
        background-color: #FFA500;
        font-size: 14px;
        color: #FFFFFF;
        height: 45px;
        line-height: 45px;
        text-align: center;
        width: 80%;
        border-radius: 10px;
        margin-left: 10%;
    }
}
</style>