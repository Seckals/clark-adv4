<template>
  <div>
    <IMain>
      <div slot="detail">
        <div style="margin-bottom: 12px">
          模块:{{ $route.query.moduleName }}
        </div>
        <div style="margin-bottom: 12px">角色名:{{ $route.query.name }}</div>
      </div>
      <div slot="btns-right">
        <a-button
          slot="btns-right"
          @click="save"
          :disabled="!checkedKeys || checkedKeys.length === 0"
          >保存</a-button
        >
        <a-button slot="btns-right" @click="$router.back()">返回</a-button>
      </div>
      <div slot="table">
        <a-tree
          v-model="checkedKeys"
          checkable
          :auto-expand-parent="false"
          :tree-data="treeData"
          :replace-fields="replaceFields"
        />
      </div>
    </IMain>
  </div>
</template>
<script>
import {
  preLinkSysFunction,
  linkSysFunction,
  pageLinkSysFunction,
} from '../../api/myrole'

export default {
  data() {
    return {
      checkedKeys: [],
      treeData: [],
      replaceFields: {
        children: 'children',
        title: 'description',
        key: 'id',
      },
    }
  },
  mounted() {
    this.getSelects()
    this.getSelects1()
  },
  methods: {
    save() {
      if (!this.checkedKeys || this.checkedKeys.length === 0) return
      linkSysFunction({
        data: {
          functionIds: this.checkedKeys,
          roleId: Number(this.$route.query.id),
        },
      }).then(() => {
        this.$message.success('操作成功')
      })
    },
    getId(data) {
      data.forEach((element) => {
        this.checkedKeys.push(element.id)
        if (element.children) {
          this.getId(element.children)
        }
      })
    },
    getSelects() {
      preLinkSysFunction({
        data: { roleId: this.$route.query.id },
      }).then((res) => {
        this.treeData = res.allCategory
      })
    },
    getSelects1() {
      pageLinkSysFunction({
        data: { roleId: this.$route.query.id, limit: 999 },
      }).then((res) => {
        // this.treeData = res.allCategory
        this.getId(res.result)
      })
    },
  },
}
</script>
