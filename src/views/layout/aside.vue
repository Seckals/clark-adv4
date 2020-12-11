<template>
  <a-layout-sider
    v-model="collapsed"
    width="208"
    collapsedWidth="48"
    :trigger="null"
    collapsible
  >
    <div class="logo">
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
      <a-sub-menu
        :title="item.description"
        v-for="(item, index) in menu1"
        :key="index"
      >
        <a-menu-item v-for="item1 in item.children" :key="item1.path">
          <a-icon :type="item1.img" />{{ item1.description }}</a-menu-item
        >
      </a-sub-menu>
    </a-menu>
    <div class="menu-trigger">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="() => (collapsed = !collapsed)"
      />
    </div>
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
      console.log(this.$store.getters.getMenu1)
      return this.$store.getters.getMenu1 || []
    },
  },
  methods: {
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
