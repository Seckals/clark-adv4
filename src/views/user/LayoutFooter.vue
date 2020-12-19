<template>
  <a-layout-footer class="layout-footer">
    @2020 QinDing Tech Inc. All Rights Reserved.<br />
    Inalfa Proprietary and Confidential. For Authorized Use Only.
  </a-layout-footer>
</template>

<script>
export default {
  name: 'LayoutFooter',
}
</script>

<style lang="less" scoped>
.layout-footer {
  // text-align: center;
  // user-select: none;
  padding: 0;
  background-color: transparent;
  width: 70%;
  position: absolute;
  bottom: 60px;
  right: 0px;
  text-align: center;
  color: rgb(204, 204, 204);
  font-size: 12px;
}
</style>
