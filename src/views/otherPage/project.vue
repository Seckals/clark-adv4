<template>
  <div>
    <IMain :ifshowData="false" />
    <a-card class="board" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="项目">
                <a-select
                  show-search
                  option-filter-prop="children"
                  v-model="queryParam.projectCode"
                  placeholder="请选择项目"
                >
                  <a-select-option
                    v-for="project in allProject"
                    :value="project"
                    :key="project"
                    >{{ project }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="成品物料">
                <a-input
                  v-model="queryParam.projectItemCode"
                  placeholder="请输入成品物料编码"
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
          icon="plus"
          @click="add"
          v-permission="'mainData.production.project-item.add'"
          >新建</a-button
        >
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        bordered
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a
              class="x-space"
              v-permission="'mainData.production.project-item.edit'"
              @click="handleEdit(record)"
              >编辑</a
            >
            <a
              v-permission="'mainData.production.project-item.delete'"
              @click="handleDel(record)"
              >删除</a
            >
          </template>
        </span>
      </s-table>
    </a-card>
    <a-modal
      :title="`${mdl.id ? '编辑' : '新建'}项目成品物料对应关系`"
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
        <a-form-item label="项目">
          <a-select
            show-search
            option-filter-prop="children"
            placeholder="请选择项目"
            v-decorator="[
              'projectCode',
              { rules: [{ required: true, message: '请选择项目' }] },
            ]"
          >
            <a-select-option
              v-for="project in allProject"
              :value="project"
              :key="project"
              >{{ project }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="成品天窗物料编码">
          <a-input
            placeholder="请输入物料编码"
            v-decorator="[
              'projectItemCode',
              { rules: [{ required: true, message: '成品天窗物料编码必填' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="物料说明">
          <a-input
            placeholder="请输入物料说明"
            v-decorator="[
              'projectItemDesc',
              { rules: [{ required: true, message: '物料说明必填' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="料架容量">
          <a-input-number
            style="width:100%"
            :min="0"
            :step="1"
            :precision="0"
            placeholder="请输入料架容量"
            v-decorator="[
              'binSize',
              { rules: [{ required: true, message: '料架容量必填' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="颜色">
          <a-input
            placeholder="请输入颜色"
            v-decorator="[
              'colorDesc',
              { rules: [{ required: true, message: '颜色必填' }] },
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
  queryAllProject_get,
} from '@/api/projectItemDo'
// 表单值
const fields = [
  'projectCode',
  'projectItemCode',
  'projectItemDesc',
  'binSize',
  'colorDesc',
]

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
        console.log('loadData request parameters:', requestParameters)
        return queryList_get({ data: requestParameters }).then((res) => {
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
      allProject: [],
      sortedInfo: null, // 排序信息
    }
  },
  components: {
    STable,
  },
  created() {
    queryAllProject_get().then((data) => {
      this.allProject = data
    })
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
          title: '项目',
          dataIndex: 'projectCode',
          sorter: true,
        },
        {
          title: '成品物料编码',
          dataIndex: 'projectItemCode',
          sorter: true,
        },
        {
          title: '物料说明',
          dataIndex: 'projectItemDesc',
        },
        {
          title: '料架容量',
          dataIndex: 'binSize',
        },
        {
          title: '颜色',
          dataIndex: 'colorDesc',
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
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
  methods: {
    // 新增
    add() {
      this.visible = true
      this.canEdit = false
    },
    // 弹窗ok
    handleOk(record) {
      const request = this.mdl.id ? update_post : save_post
      this.form.validateFields((err, values) => {
        console.log(err, values)
        if (!err) {
          request({
            data: { ...record, ...values, id: this.mdl.id },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(() => {
            this.$refs.table.refresh()
            this.handleCancel()
            this.$success({
              title: `${this.id ? '修改成功' : '保存成功'}`,
              content: `您所维护的成品物料对应关系已经${
                this.id ? '修改成功！' : '保存成功！'
              }`,
              onOk: () => {
                this.visible = false
              },
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
        content: `您正在尝试删除成品物料对应关系${record.projectItemCode}，您确定还要继续吗？`,
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
              content: `您所选择的成品物料对应关系成功删除!`,
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
