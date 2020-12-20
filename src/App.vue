<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import data from './mock/userinfo'
export default {
  name: 'app',
  data() {
    return {
      locale: zhCN,
    }
  },
  created() {
    if (process.env.NODE_ENV == 'development') {
      window.localStorage.setItem('auth-info', JSON.stringify(data))
    } else {
      const detail = localStorage.getItem('auth-info')
      if (!detail) {
        this.toLogin()
        return
      }
    }
    this.$store.commit('SET_DETAIL')
  },
  methods: {
    toLogin() {
      const loginURL = `http://${
        window.location.hostname !== '172.23.2.17'
          ? '49.235.30.187'
          : '172.23.2.17'
      }:8088/auth/#/login?from=${encodeURIComponent(location.href)}`
      window.location.href = loginURL
    },
  },
}
</script>
<style lang="less">
// @import '~ant-design-vue/es/style/themes/default.less';

html,
body,
#app,
#root {
  height: 100%;
}
#app {
  position: relative;
}

.colorWeak {
  filter: invert(80%);
}

.ant-layout.layout-basic {
  height: 100vh;
  min-height: 100vh;
}

canvas {
  display: block;
}

body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

ul,
ol {
  list-style: none;
}

// 数据列表 样式
.table-alert {
  margin-bottom: 16px;
}
// 数据列表 操作
.table-operator {
  margin-bottom: 18px;

  button {
    margin-right: 8px;
  }
}
// 数据列表 搜索条件
.table-page-search-wrapper {
  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 24px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
}

.x-space {
  margin-right: 10px;
}

.x-blank {
  margin-bottom: 10px;
}

.x-clear:after {
  content: '.';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.x-left {
  float: left;
}
.x-right {
  float: right;
}

.pointer {
  cursor: pointer;
}

.ant-input-number-disabled {
  color: rgba(0, 0, 0, 1);
}

.ant-select-disabled {
  color: rgba(0, 0, 0, 1);
}

.ant-input[disabled] {
  color: rgba(0, 0, 0, 1);
}

.performance .title {
  height: 88px;
  padding: 0 50px 0 90px;
  background: #090f25;
  border-radius: 0px 0px 30px 30px;
  opacity: 0.96;
  border: 1px solid #3e56a0;
  text-align: center;
  line-height: 88px;
  font-size: 32px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #a9cbeb;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  // border-top: none;
  &.errorBox {
    box-shadow: inset 0px 0px 50px 2px rgba(255, 60, 87, 0.4);
    border: 1px solid #ff3c56;
    color: #fb3b55;
    cursor: pointer;
    pointer-events: all;
    &::before {
      border: 1px solid #fb3b55;
    }
    &::after {
      background: #fb3b55;
    }
  }

  &.warnBox {
    box-shadow: inset 0px 0px 50px 2px rgba(255, 235, 60, 0.4);
    border: 1px solid #ceb93b;
    color: #ceb93b;
    cursor: pointer;
    pointer-events: all;
    &::before {
      border: 1px solid #ceb93b;
    }
    &::after {
      background: #ceb93b;
    }
  }
  &::before {
    position: absolute;
    content: '';
    width: 28px;
    height: 28px;
    border: 1px solid #a9cbeb;
    border-radius: 50%;
    left: 45px;
    top: 30px;
  }
  &::after {
    position: absolute;
    content: '';
    width: 18px;
    height: 18px;
    background: #a9cbeb;
    border-radius: 50%;
    left: 50px;
    top: 35px;
  }
}

.performance {
  width: 1830px;
  height: 820px;
  background: rgba(6, 14, 40, 0.9);
  border: 1px solid #3e56a0;
  margin: 60px auto 0;
  box-sizing: border-box;
  position: relative;

  .question {
    width: 1770px;
    margin: 116px auto 0;
    table {
      max-height: 660px;
      border: 2px solid #384a83;
      empty-cells: show;
      border-spacing: 0;
      border-collapse: separate;
      border-spacing: 0;
      &.padding {
        td {
          padding: 16px;
        }
      }
      thead,
      tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
      }
      .overData {
        width: calc(100% - 6px) !important;
      }
      th {
        height: 110px;
        box-sizing: border-box;
        background: #1f3885;
        text-align: center;
        font-size: 24px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #cce4ff;
        border-right: 2px solid #384a83;
        &:last-child {
          border-right: none;
        }
      }
      tbody {
        max-height: 565px;
        overflow-y: auto;
        display: block;
        /deep/.ant-empty {
          height: 565px;
          box-sizing: border-box;
          padding-top: 150px;
          font-size: 40px;
          .ant-empty-description {
            margin-top: 40px;
            color: #cce4ff;
          }
        }
        &.repairTbody {
          tr {
            border-bottom: none;
          }
        }
        tr {
          background: #132558;
          &:nth-child(odd) {
            background: #08122c;
          }
          // &:last-child {
          //   border-bottom: 2px solid #384a83;
          // }
        }
      }
      td {
        height: 64px;
        font-size: 20px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #7aa5d6;
        text-align: center;
        border-right: 2px solid #384a83;
        &:last-child {
          border-right: none;
        }
      }
    }
  }

  .lineCode {
    width: 110px;
  }
  .date {
    width: 140px;
  }
  .cndate {
    width: 160px;
  }

  .border {
    width: 100px;
    height: 100px;
    position: absolute;
    border: 2px solid #2c4490;
    border-image: -webkit-linear-gradient(#2c4490, #8da6f5) 30 30;
    border-image: -moz-linear-gradient(#2c4490, #8da6f5) 30 30;
    border-image: linear-gradient(#2c4490, #8da6f5) 30 30;
    &.topLeft {
      border-bottom: none;
      border-right: none;
      left: 0;
      top: 0;
    }
    &.topRight {
      right: 0;
      top: 0;
      border-bottom: none;
      border-left: none;
    }
    &.BottomRight {
      right: 0;
      bottom: 0;
      border-top: none;
      border-left: none;
    }
    &.BottomLeft {
      left: 0;
      bottom: 0;
      border-top: none;
      border-right: none;
    }
  }
}

/* @import url(global.less); */
</style>
