<template>
  <div class="boxWrapper">
    <div class="title">
      {{
        isActive
          ? `您的账号已经激活成功，${second}秒后将跳转到登录页`
          : '正在激活...'
      }}
    </div>
    <div class="mainWrapper">
      <a-button
        type="primary"
        block
        size="large"
        @click="
          () => {
            $router.push('/user/login')
          }
        "
      >
        确认
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      second: 5,
      timmer: null,
    }
  },

  watch: {},

  created() {
    // const { accountP, empNo } = this.$router.query;
    this.$api.userC
      .active({})
      .then((code) => {
        if (code !== 200) return
        this.timmer = setInterval(() => {
          if (this.second > 0) {
            this.second -= 1
          } else {
            clearTimeout(this.timmer)
            this.$router.push('/user/login')
          }
        }, 1000)
      })
      .finally(() => {
        this.isActive = true
      })
  },
  destroyed() {
    clearTimeout(this.timmer)
  },
}
</script>

<style lang="less" scoped>
.boxWrapper {
  transform: translateY(-60px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 18px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    padding: 5px 0;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }

  .desc {
    font-size: 14px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    padding: 5px 0;
    color: rgba(153, 153, 153, 1);
    max-width: 490px;

    .descTitle {
      margin-bottom: 20px;
    }

    .descTitle {
      margin-bottom: 20px;
    }

    .descContent {
      text-indent: 2em;
    }
  }

  .mainWrapper {
    width: 320px;
    margin-top: 30px;
  }
}
</style>
