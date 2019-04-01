<template>
  <div class="wechat-read-my">
    <div class="my-header"></div>
    <div class="my-content"></div>
  </div>
</template>

<script>
export default {
  name: 'wechatReadMy',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

 <style lang="scss">
@import "../../assets/styles/global";
.wechat-read-my {
  position: relative;
  width: 100%;
  height: 100%;
  .my-header {
    position: relative;
    height: 30%;
    width: 100%;
  }
  .my-content {
    position: relative;
    height: 70%;
    width: 100%;
  }
}
</style>