<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			goto_my() {
        // 返回“我的”方法
				uni.switchTab({
					url: '/pages/my/my'
				});
			}
		}
	}
</script>

<template>
	<view class="viewport">
    <icon class="success-img" type="success" size="60" color="#87EE87" />
		<view class="text-box">
			<text class="text_title">发布成功，等待审核后即可查看！</text>
		</view>
		<button class="back-botton" @tap="goto_my">返回我的</button>
	</view>
</template>

<style>
	page {
		width: 100%;
		height: 95%;
	}

	.viewport {
		width: 100%;
		height: 80%;
		margin-top: 50upx;
	}
/* 文本框 */
	.text-box {
		display: flex;
    margin-left: 6%;
		flex-direction: column;
		width: 88%;
		height: 24%;
		align-items: center;
		justify-content: center;
    border: 1px solid rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(119, 119, 119, 0.4);
	}
  /* 提示词 */
	.text_title{
		font-size: 18px;
    font-family: Roboto;
		font-weight: 600;
    text-align: center;
	}
  /* 提交成功图片 */
  .success-img{
   position: relative;
   display: flex;
   justify-content: center;
   top: 5%;
  }
  /* 底部返回“我的”按钮 */
	.back-botton{
		height: 80rpx;
    width: 80%;
    text-align: center;
    line-height: 80rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    font-family: Roboto;
    background-color: #FE726B;
    display: flex;
		flex-direction: column;
		position: fixed;
    bottom: 5%;
    left: 10%;
	}
</style>

