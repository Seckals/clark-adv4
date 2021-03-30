<template>
  <div>
    <IMain :ifshowData="false" />
    <a-card class="board" :="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="部门">
                <a-select
                  show-search
                  option-filter-prop="children"
                  v-model="queryParam.deptId"
                  placeholder="请选择部门"
                >
                  <a-select-option
                    v-for="dept in allDept"
                    :value="dept.id"
                    :key="dept.id"
                    >{{ dept.name }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="原因代码">
                <a-input
                  placeholder="请输入原因代码"
                  v-model="queryParam.reasonCode"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)"
                  >查询</a-button
                >
                <a-button
                  style="margin-left: 8px"
                  @click="() => (this.queryParam = {})"
                  >重置</a-button
                >
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-operator">
        <a-button
          type="primary"
          v-permission="'mainData.production.reason-code.add'"
          icon="plus"
          @click="add"
          >新建</a-button
        >
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a
              class="x-space"
              v-permission="'mainData.production.reason-code.edit'"
              @click="handleEdit(record)"
              >编辑</a
            >
            <a
              v-permission="'mainData.production.reason-code.delete'"
              @click="handleDel(record)"
              >删除</a
            >
          </template>
        </span>
      </s-table>
    </a-card>
    <a-modal
      :title="`${mdl.id ? '编辑' : '新建'}部门原因代码对应关系`"
      :width="640"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        :form="form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 15 }"
        layout="vertical"
      >
        <a-form-item label="部门">
          <a-select
            show-search
            option-filter-prop="children"
            placeholder="请选择部门"
            v-decorator="[
              'deptId',
              { rules: [{ required: true, message: '请选择部门' }] },
            ]"
          >
            <a-select-option
              v-for="dept in allDept"
              :value="dept.id"
              :key="dept.id"
              >{{ dept.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="原因代码">
          <a-input
            placeholder="请输入原因代码"
            v-decorator="[
              'reasonCode',
              { rules: [{ required: true, message: '原因代码必填' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="原因说明">
          <a-input
            placeholder="请输入原因说明"
            v-decorator="[
              'reasonDesc',
              { rules: [{ required: true, message: '原因说明必填' }] },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import STable from '@/components/Table'
import pick from 'lodash.pick'
import {
  queryList_get,
  save_post,
  update_post,
  _delete_post,
  queryAllDept_get,
} from '@/api/deptReasonCodeDo'
// 表单值
const fields = ['deptId', 'reasonCode', 'reasonDesc']

export default {
  data() {
    return {
      queryParam: {},
      loadData: (parameter) => {
        if (parameter.sortOrder) {
          this.sortedInfo = {
            columnKey: parameter.sortField,
            order: parameter.sortOrder,
          }
        } else {
          this.sortedInfo = {}
        }
        const requestParameters = Object.assign(
          {},
          { size: parameter.pageSize, current: parameter.pageNo, ...parameter },
          this.queryParam
        )
        return queryList_get({ data: requestParameters }).then((res) => {
          console.log(res.data)
          return {
            data: res.records,
            totalCount: res.total,
            totalPage: res.pages,
            pageSize: res.size,
            pageNo: res.current,
          }
        })
      },
      // 弹窗
      visible: false,
      mdl: {},
      // 表单初始化
      form: this.$form.createForm(this),
      allDept: [],
      sortedInfo: null, // 排序信息
    }
  },
  components: {
    STable,
  },
  computed: {
    columns() {
      let { sortedInfo } = this
      sortedInfo = sortedInfo || {}
      return [
        // {
        //   title: 'ID',
        //   dataIndex: 'id',
        //   sorter: true
        // },
        {
          title: '部门',
          dataIndex: 'deptName',
          sorter: true,
        },
        {
          title: '原因代码',
          dataIndex: 'reasonCode',
          sorter: true,
        },
        {
          title: '原因说明',
          dataIndex: 'reasonDesc',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ].map((item) => {
        if (item.sorter) {
          item.sortOrder =
            sortedInfo.columnKey === item.dataIndex && sortedInfo.order
        }
        return item
      })
    },
  },
  created() {
    queryAllDept_get().then((data) => {
      this.allDept = data
    })
  },
  methods: {
    // 新增
    add() {
      this.visible = true
      this.canEdit = false
    },
    // 弹窗ok
    handleOk() {
      const request = this.mdl.id ? update_post : save_post
      this.form.validateFields((err, values) => {
        console.log(err, values)
        if (!err) {
          request({
            data: { ...values, id: this.mdl.id },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(() => {
            this.$refs.table.refresh()
            this.handleCancel()
            this.$success({
              title: `${this.id ? '修改成功' : '保存成功'}`,
              content: `您所维护的部门原因代码已经${
                this.id ? '修改成功！' : '保存成功！'
              }`,
            })
          })
        }
      })
    },
    // 弹窗取消
    handleCancel() {
      this.form.resetFields()
      this.visible = false
      this.mdl = {}
    },
    // 编辑
    handleEdit(record) {
      this.visible = true
      this.canEdit = !!record.firstFreeNum
      this.mdl = Object.assign({}, record) // 浅拷贝
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, fields)) // loadsh的pick方法
      })
    },
    // 删除
    handleDel(record) {
      this.$confirm({
        title: '删除警告',
        content: `您正在尝试删除部门原因代码${record.reasonCode}，您确定还要继续吗？`,
        onOk: () => {
          _delete_post({
            data: { id: record.id },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(() => {
            this.$refs.table.refresh()
            this.$success({
              title: `删除成功`,
              content: `您所选择的部门原因代码成功删除!`,
            })
          })
        },
        onCancel() {
          console.log('Cancel')
        },
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
