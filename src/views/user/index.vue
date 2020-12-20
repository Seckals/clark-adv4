<template>
  <div class="authWrapper">
    <div class="kv" />
    <div class="main">
      <div class="logo" />
      <!-- 主要路由 -->
      <router-view />
    </div>
    <layout-footer />
  </div>
</template>

<script>
import LayoutFooter from './LayoutFooter'

export default {
  components: { LayoutFooter },
  created() {
    console.log(111)
  },
}
</script>

<style lang="less" scoped>
// @import './default.less';
@screen-sm: 576px;

.authWrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;

  .kv {
    width: 30%;
    height: 100%;
    position: relative;
    background-image: url('../../images/kv.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .main {
    position: relative;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: @screen-sm) {
      width: 100%;
    }

    .logo {
      width: 166px;
      height: 38px;
      background: url('../../images/logo.png') no-repeat;
      position: absolute;
      background-size: contain;
      left: 30px;
      top: 27px;
    }
  }
}
</style>
