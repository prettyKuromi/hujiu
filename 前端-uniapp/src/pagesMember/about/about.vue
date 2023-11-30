<script lang="ts">
  export default{
    data(){
      return{
        title:'虎纠吃游实评\n',
        content:'旨在为游客提供一个便捷的平台，帮助他们发现并了解福州景点和美食的真实面貌，同时也为当地景点和美食业主提供了一个机会来展示他们的优势。\n项目意义\n提供推荐平台:提供一个全面较为准确的福州美食和景点的推荐平台，帮助用户更好的了解福州景点和美食资源。\n促进旅游和美食业:通过虚假评价的判别和综合赋权，提高评论的可信度，使用户能够更加准确评估美食和景点的质量，促进游客的游玩的意愿，从而促进业务增长和质量提高。\n平台信用度及用户的互动性: 平台引用信用积分制，能让用户可以根据其他用户的信用积分判断其评论的可信度，增加用户对平台的可信度，同时通过独特的点，踩等互动功能，能够避免某个用户评论被刷，增加评论的公正性和准确性，同时大大增加用户评论的互动。\n对虚假评论点踩:目前市面上的类似软件大多数都是没有踩的功能，这是我们的独特创新点，同时不基于商业目的，因此可以尽量客观公正，为用户提供真实可靠的美食景点评价。'
      };
    }
  }
</script>

<template>
  <view class="text-box" scroll-y="true">
    <text class="text-wrap" user-select>
      {{ title }}
      {{ content }}
    </text>
  </view>
</template>

<style scoped>
  .text-box{
    height: auto;
    width: 92%;
    margin: 4% 4%;
  }
  .text-wrap{
    font-size: 14px;
    font-family: PingFangSC-regular;
    /* 文本自动换行 */
    word-wrap: break-word;
    /* 首行缩进 */
    text-indent: 2em;
  }
</style>