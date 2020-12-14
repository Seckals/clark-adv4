<template>
  <div class="i-content">
    <div class="i-content-title">{{ $route.meta.title }}</div>
    <div class="i-content-wrap">
      <div class="i-content-search">
        <a-form-model
          layout="inline"
          :model="searchData"
          v-if="searchs && searchs.length > 0"
        >
          <template v-for="(item, index) in searchs">
            <a-form-model-item :label="item.title" :key="index">
              <a-input
                v-model="searchData[item.key]"
                :placeholder="item.placeholder"
                v-if="item.type === 'input'"
              />
              <a-select
                :show-search="item.showsearch || false"
                v-model="searchData[item.key]"
                :placeholder="item.placeholder"
                v-if="item.type === 'select'"
                style="width: 170px"
              >
                <a-select-option
                  v-for="(ite, idx) in item.list"
                  :key="idx"
                  :value="ite[item.listvalue]"
                  >{{ ite[item.listkey] }}</a-select-option
                >
              </a-select>
            </a-form-model-item>
          </template>
          <a-form-model-item>
            <a-button type="primary" @click="operation('search', searchData)">
              查询
            </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button @click="reset"> 重置 </a-button>
          </a-form-model-item>
        </a-form-model>
        <a-form-model layout="inline" v-if="infoData && infoData.length > 0">
          <template v-for="(item, index) in infoData">
            <a-form-model-item :label="item.title" :key="index">
              <a-input :value="item.value" disabled />
            </a-form-model-item>
          </template>
        </a-form-model>
        <div class="i-content-btns">
          <a-button @click="operation('add')" v-permission="permission"
            >新 增</a-button
          >
        </div>
      </div>

      <div class="i-content-table">
        <slot name="table" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchData: {},
    }
  },
  props: {
    searchs: {
      type: Array,
      default: () => [],
    },
    infoData: {
      type: Array,
      default: () => [],
    },
    hasReset: {
      default: false,
    },
    permission: {
      type: String,
      default: '',
    },
  },
  methods: {
    operation(type, data) {
      this.$emit('operation', {
        type,
        data,
      })
    },
    reset() {
      for (let i in this.searchData) {
        this.searchData[i] = ''
      }
      this.$emit('operation', {
        type: 'reset',
        data: this.searchData,
      })
    },
  },
}
</script>
<style lang="less" scoped>
.i-content-title {
  padding: 16px 32px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid #e9e9e9;
}
.i-content-wrap {
  padding: 24px;
}
.i-content-search {
  margin-bottom: 24px;
}
.i-content-btns > button {
  margin-right: 20px;
}
.i-content-table {
  width: 100%;
  overflow-x: auto;
}
</style>
<style lang="less">
.i-content-wrap {
  .ant-form-item {
    margin-bottom: 24px;
  }
}
</style>
