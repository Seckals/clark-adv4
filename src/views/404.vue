<template>
  <a-result status="404"
            title="404"
            sub-title="对不起，你访问的页面丢了。">
    <template #extra>
      <a-button type="primary"
                @click="go"> 返回首页 </a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  methods: {
    go () {
      const loginURL = `http://${window.location.hostname == '49.235.30.187'
        ? '49.235.30.187'
        : process.env.VUE_APP_FLAG == 'bj'
          ? '192.168.51.52'
          : '172.23.2.17'
        }:8088/auth/#/user/login?from=${encodeURIComponent(location.href)}`
      window.location.href = loginURL
    },
  },
}
</script>
