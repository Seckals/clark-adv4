<template>
  <a-result status="404" title="401" sub-title="对不起，你暂无权限。">
    <template #extra>
      <a-button type="primary" @click="go"> 返回登录 </a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  methods: {
    go() {
      this.$router.push('/user/login')
    },
  },
}
</script>
