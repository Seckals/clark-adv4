<template>
  <div class="boxWrapper">
    <div class="title">确认邮件</div>
    <div class="desc">
      <div class="descTitle">感谢您使用英纳法数字工厂系统!</div>
      <div class="descContent">还剩最后一步就可以使用您的账号了。一封注册成功邮件已经发到您的邮箱地址{{email}}，请进入您的邮箱打开这封邮件，点击邮件里面的链接，激活您的账号。</div>
    </div>
    <div class="mainWrapper">
      <a-button type="primary"
                block
                size="large"
                @click="() => {$router.push('/user/login');}">
        确认
      </a-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'resetpwd' }),
      isSent: false,
      email: this.$route.query.email.replace(/%40/g, "@"),
    }
  }

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