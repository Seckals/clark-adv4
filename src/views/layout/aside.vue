<template>
  <a-layout-sider
    v-model="$store.state.collapsed"
    width="208"
    collapsedWidth="70"
    :trigger="null"
    collapsible
  >
    <div class="logo" @click="tolinkprod">
      <img src="../../assets/img/logo.png" alt="" />
    </div>
    <a-menu
      theme="dark"
      mode="inline"
      :default-selected-keys="[$route.path]"
      @click="go"
    >
      <a-menu-item v-for="item in menu" :key="item.path">
        <a-icon :type="item.img" />
        <span>{{ item.description }}</span>
      </a-menu-item>
      <a-sub-menu v-for="(item, index) in menu1" :key="index">
        <span slot="title"
          ><a-icon :type="item.img" /><span>{{ item.description }}</span></span
        >
        <a-menu-item
          v-for="item1 in item.children.filter((i) => {
            return i.hidden == '1'
          })"
          :key="item1.path"
        >
          <a-icon :type="item1.img" />{{ item1.description }}</a-menu-item
        >
      </a-sub-menu>
    </a-menu>
    <!-- <div class="menu-trigger">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="() => (collapsed = !collapsed)"
      />
    </div> -->
  </a-layout-sider>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    }
  },
  computed: {
    menu() {
      return this.$store.getters.getMenu || []
    },
    menu1() {
      return this.$store.getters.getMenu1 || []
    },
  },
  methods: {
    tolinkprod() {
      if (process.env.NODE_ENV == 'development') {
        this.$router.push('/')
      } else if (process.env.NODE_ENV == 'prod') {
        window.location.href = 'http://49.235.30.187:8088/prod/#/'
      } else if (process.env.NODE_ENV == 'production') {
        window.location.href = 'http://172.23.2.17:8088/prod/#/'
      }
    },
    go(e) {
      if (e.key) {
        this.$router.push(e.key)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.menu-trigger {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  padding: 0 16px;
  line-height: 45px;
  cursor: pointer;
  & > i {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.65);
    &:hover {
      color: #fff;
    }
  }
}
.logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  line-height: 32px;
  cursor: pointer;
  & > img {
    width: auto;
    height: 32px;
    transition: height 0.2s;
  }
}
</style>
