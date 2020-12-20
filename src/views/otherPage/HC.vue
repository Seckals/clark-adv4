<template>
  <div>
    <IMain :ifshowData="false" />
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="年份">
                <a-select
                  show-search
                  option-filter-prop="children"
                  v-model="queryParam.year"
                  placeholder="请选择年份"
                >
                  <a-select-option
                    v-for="year in allYears"
                    :value="year"
                    :key="year"
                    >{{ year }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="人头类型">
                <a-select
                  show-search
                  option-filter-prop="children"
                  v-model="queryParam.hcType"
                  placeholder="请选择人头类型"
                >
                  <a-select-option
                    v-for="hcTypes in allHcType"
                    :value="hcTypes === '' ? ' ' : hcTypes"
                    :key="hcTypes === '' ? ' ' : hcTypes"
                    >{{ hcTypes === '' ? '全部' : hcTypes }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="queryDataSubmit"
                  >查询</a-button
                >
                <a-button
                  style="margin-left: 8px"
                  @click="
                    queryParam = { hcType: '', year: new Date().getFullYear() }
                  "
                  >重置</a-button
                >
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div
        class="table-operator"
        v-permission="'mainData.production.mg-hc.add'"
      >
        <a-button type="primary" icon="plus" @click="add">新建</a-button>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="code"
        bordered
        :columns="columns"
        :data="loadData"
        :rowSelection="rowSelection"
        showPagination="auto"
        type="radio"
        :scroll="{ x: 2000 }"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a
              v-permission="'mainData.production.mg-hc.edit'"
              v-if="queryParam.hcType && queryParam.hcType === record.hcType"
              @click="handleEdit(record.origin)"
              >编辑</a
            >
          </template>
        </span>
      </s-table>
    </a-card>
    <a-modal
      title="编辑人头数据"
      :width="1000"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        class="editHeadData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        :form="form"
        layout="vertical"
      >
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="年份">
              <a-input-number
                :min="2000"
                :max="9999"
                :step="1"
                style="width:100%"
                placeholder="请选择年份"
                @blur="changeType"
                v-decorator="[
                  `year`,
                  {
                    initialValue: new Date().getFullYear(),
                    rules: [
                      {
                        required: true,
                        message: '必选',
                      },
                    ],
                  },
                ]"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目">
              <a-select
                @change="changeType"
                v-decorator="[
                  `projectCode`,
                  {
                    rules: [
                      {
                        required: true,
                        message: '必选',
                      },
                    ],
                  },
                ]"
                show-search
                option-filter-prop="children"
                placeholder="请选择项目"
              >
                <!-- <a-select-option value=" " key="">全部</a-select-option> -->
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
            <a-form-item label="人头类型">
              <a-select
                @change="changeType"
                v-decorator="[
                  `hcType`,
                  {
                    rules: [
                      {
                        required: true,
                        message: '必选',
                      },
                    ],
                  },
                ]"
                show-search
                option-filter-prop="children"
                placeholder="请选择人头类型"
              >
                <a-select-option
                  v-for="hcType in allHcType"
                  :value="hcType"
                  :key="hcType"
                  >{{ hcType }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="x-blank" :gutter="48">
          <a-col :sm="3">
            <div class="editTitle">
              <span style="color:#0079FE">标准</span>白晚班
            </div>
          </a-col>
          <a-col :sm="20">
            <div
              class="ant-table ant-table-scroll-position-left ant-table-default ant-table-bordered"
            >
              <div class="ant-table-content">
                <div class="ant-table-body">
                  <table>
                    <thead class="ant-table-thead">
                      <tr>
                        <th>一月</th>
                        <th>二月</th>
                        <th>三月</th>
                        <th>四月</th>
                        <th>五月</th>
                        <th>六月</th>
                      </tr>
                    </thead>
                    <tbody class="ant-table-tbody">
                      <tr class="ant-table-row">
                        <td
                          v-for="(k, index) in [1, 2, 3, 4, 5, 6]"
                          :key="index"
                        >
                          <a-form-item :key="k" :required="true">
                            <a-input-number
                              :min="0"
                              :precision="2"
                              v-decorator="[
                                `dataStanderUp[${index}]`,
                                {
                                  rules: [
                                    {
                                      required: true,
                                      message: '必填',
                                    },
                                  ],
                                },
                              ]"
                            ></a-input-number>
                          </a-form-item>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="ant-table ant-table-scroll-position-left ant-table-default ant-table-bordered"
            >
              <div class="ant-table-content">
                <div class="ant-table-body">
                  <table>
                    <thead class="ant-table-thead">
                      <tr>
                        <th>七月</th>
                        <th>八月</th>
                        <th>九月</th>
                        <th>十月</th>
                        <th>十一月</th>
                        <th>十二月</th>
                      </tr>
                    </thead>
                    <tbody class="ant-table-tbody">
                      <tr class="ant-table-row">
                        <td
                          v-for="(k, index) in [1, 2, 3, 4, 5, 6]"
                          :key="index"
                        >
                          <a-form-item :key="k" :required="true">
                            <a-input-number
                              :min="0"
                              :precision="2"
                              v-decorator="[
                                `dataStanderDown[${index}]`,
                                {
                                  rules: [
                                    {
                                      required: true,
                                      message: '必填',
                                    },
                                  ],
                                },
                              ]"
                            ></a-input-number>
                          </a-form-item>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :sm="3">
            <div class="editTitle">
              <span style="color:#FE6500">超级</span>白晚班
            </div>
          </a-col>
          <a-col :sm="20">
            <div
              class="ant-table ant-table-scroll-position-left ant-table-default ant-table-bordered"
            >
              <div class="ant-table-content">
                <div class="ant-table-body">
                  <table>
                    <thead class="ant-table-thead">
                      <tr>
                        <th>一月</th>
                        <th>二月</th>
                        <th>三月</th>
                        <th>四月</th>
                        <th>五月</th>
                        <th>六月</th>
                      </tr>
                    </thead>
                    <tbody class="ant-table-tbody">
                      <tr class="ant-table-row">
                        <td
                          v-for="(k, index) in [1, 2, 3, 4, 5, 6]"
                          :key="index"
                        >
                          <a-form-item :key="k" :required="true">
                            <a-input-number
                              :min="0"
                              :precision="2"
                              v-decorator="[
                                `dataSuperUp[${index}]`,
                                {
                                  rules: [
                                    {
                                      required: true,
                                      message: '必填',
                                    },
                                  ],
                                },
                              ]"
                            ></a-input-number>
                          </a-form-item>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="ant-table ant-table-scroll-position-left ant-table-default ant-table-bordered"
            >
              <div class="ant-table-content">
                <div class="ant-table-body">
                  <table>
                    <thead class="ant-table-thead">
                      <tr>
                        <th>七月</th>
                        <th>八月</th>
                        <th>九月</th>
                        <th>十月</th>
                        <th>十一月</th>
                        <th>十二月</th>
                      </tr>
                    </thead>
                    <tbody class="ant-table-tbody">
                      <tr class="ant-table-row">
                        <td
                          v-for="(k, index) in [1, 2, 3, 4, 5, 6]"
                          :key="index"
                        >
                          <a-form-item :key="k" :required="true">
                            <a-input-number
                              :min="0"
                              :precision="2"
                              v-decorator="[
                                `dataSuperDown[${index}]`,
                                {
                                  rules: [
                                    {
                                      required: true,
                                      message: '必填',
                                    },
                                  ],
                                },
                              ]"
                            ></a-input-number>
                          </a-form-item>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import STable from '@/components/Table'
import pick from 'lodash.pick'
import { debounce } from 'lodash'
import {
  hcList_get,
  queryAllYear_get,
  saveHc_post,
  updateHc_post,
  queryHcType_get,
  queryOne_get,
  queryAllProject_get,
} from '@/api/hcDo'
const fields = [
  'dataStanderUp',
  'dataStanderDown',
  'dataSuperUp',
  'dataSuperDown',
  'projectCode',
  'year',
  'hcType',
]
export default {
  name: 'Standbook',
  components: {
    STable,
  },
  data() {
    this.firstQuery = true
    return {
      // 弹窗数据
      visible: false,
      form: this.$form.createForm(this, { first: true }),
      // 查询参数
      queryParam: {
        year: new Date().getFullYear(),
        hcType: ' ',
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
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
        if (this.firstQuery) {
          requestParameters.ascs = 'project_code'
          this.firstQuery = false
        }
        console.log(requestParameters)
        return hcList_get({ data: requestParameters }).then((res) => {
          this.selectedRowKeys = []
          const newRecords = []
          if (res.records && res.records.length) {
            res.records.forEach((item) => {
              newRecords.push({
                hcType: item.hcType,
                ...item.normalMap,
                projectCode: item.projectCode,
                year: item.year,
                classes: '标准白晚班',
                code: item.projectCode + '0',
                origin: item,
              })
              newRecords.push({
                hcType: item.hcType,
                ...item.superMap,
                projectCode: item.projectCode,
                year: item.year,
                classes: '超级白晚班',
                code: item.projectCode + '1',
                origin: item,
              })
            })
          }
          return {
            data: newRecords,
            totalCount: res.total,
            totalPage: res.pages,
            pageSize: res.size,
            pageNo: res.current,
          }
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      sortedInfo: {}, // 排序信息
      allYears: [],
      allHcType: [],
      allProject: [],
      mdl: null, // 编辑id
    }
  },
  async created() {
    queryAllYear_get().then((data) => {
      this.allYears = data
    })
    queryAllProject_get().then((data) => {
      this.allProject = data
    })
    queryHcType_get().then((data) => {
      if (Array.isArray(data)) {
        this.allHcType = data.reverse()
        debugger
      }
    })
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
    columns() {
      let { sortedInfo } = this
      sortedInfo = sortedInfo || {}
      return [
        {
          title: '项目',
          dataIndex: 'projectCode',
          sorter: true,
          width: 100,
          fixed: 'left',
          sortOrder: sortedInfo.columnKey === 'projectCode' && sortedInfo.order,
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            }
            if (index % 2 === 0) {
              obj.attrs.rowSpan = 2
            } else {
              obj.attrs.rowSpan = 0
            }
            return obj
          },
        },
        {
          title: '班次类型',
          width: 110,
          fixed: 'left',
          dataIndex: 'classes',
        },
        {
          title: '一月',
          dataIndex: '1',
        },
        {
          title: '二月',
          dataIndex: '2',
        },
        {
          title: '三月',
          dataIndex: '3',
        },
        {
          title: '四月',
          dataIndex: '4',
        },
        {
          title: '五月',
          dataIndex: '5',
        },
        {
          title: '六月',
          dataIndex: '6',
        },
        {
          title: '七月',
          dataIndex: '7',
        },
        {
          title: '八月',
          dataIndex: '8',
        },
        {
          title: '九月',
          dataIndex: '9',
        },
        {
          title: '十月',
          dataIndex: '10',
        },
        {
          title: '十一月',
          dataIndex: '11',
        },
        {
          title: '十二月',
          dataIndex: '12',
        },
        {
          title: '操作',
          width: 150,
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ]
    },
  },
  methods: {
    // 查询操作
    queryDataSubmit() {
      this.$refs.table.refresh(true)
    },
    changeType: debounce(function() {
      this.$nextTick(() => {
        const { projectCode, year, hcType } = this.form.getFieldsValue([
          'projectCode',
          'year',
          'hcType',
        ])
        if (projectCode && year && hcType) {
          queryOne_get({ data: { projectCode, year, hcType } }).then((data) => {
            this.handleEdit(data)
          })
        }
      })
    }, 500),
    // 添加数据
    add() {
      this.visible = true
    },
    // 重置数据
    resetClick(params = {}) {
      console.log(params)
      this.queryParam = { ...params }
      this.$refs.table.refresh()
    },
    // 选择
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 编辑
    handleEdit(origin) {
      this.visible = true
      this.$nextTick(() => {
        const normalMap = origin.normalMap
        const dataStanderUp = ['1', '2', '3', '4', '5', '6'].map(
          (item) => normalMap[item]
        )
        const dataStanderDown = ['7', '8', '9', '10', '11', '12'].map(
          (item) => normalMap[item]
        )
        const dataSuperUp = ['1', '2', '3', '4', '5', '6'].map(
          (item) => normalMap[item]
        )
        const dataSuperDown = ['7', '8', '9', '10', '11', '12'].map(
          (item) => normalMap[item]
        )
        this.mdl = origin
        if (origin.hcType) {
          this.form.setFieldsValue(
            pick(
              {
                ...origin,
                dataStanderUp,
                dataStanderDown,
                dataSuperUp,
                dataSuperDown,
              },
              fields
            )
          ) // loadsh的pick方法
        } else {
          this.form.setFieldsValue(
            pick(
              {
                ...origin,
                dataStanderUp: [],
                dataStanderDown: [],
                dataSuperUp: [],
                dataSuperDown: [],
              },
              fields
            )
          ) // loadsh的pick方法
        }
      })
    },
    // 弹窗成功点击
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const request =
            this.mdl.normalMap && this.mdl.normalMap.length
              ? updateHc_post
              : saveHc_post
          const normalMap = {}
          const superMap = {}
          ;[...values.dataStanderUp, ...values.dataStanderDown].forEach(
            (item, index) => {
              normalMap[index + 1] = item
            }
          )
          ;[...values.dataSuperUp, ...values.dataSuperDown].forEach(
            (item, index) => {
              superMap[index + 1] = item
            }
          )

          const { projectCode, year, hcType } = values
          request({
            data: {
              normalMap,
              superMap,
              projectCode,
              year,
              hcType,
            },
          }).then(() => {
            this.$refs.table.refresh()
            this.visible = false
            this.form.resetFields()
            this.mdl = null
            this.$success({
              title: `${this.mdl ? '修改成功' : '保存成功'}`,
              content: `您所维护的BOL数据已经${
                this.mdl ? '修改成功！' : '保存成功！'
              }`,
              // onOk: () => {
              //   this.visible = false
              // }
            })
          })
        }
      })
    },
    // 弹窗取消
    handleCancel() {
      this.$confirm({
        title: '放弃保存？',
        content: `您确定放弃保存吗？如果放弃保存，您所维护的信息将丢失。`,
        onOk: () => {
          this.visible = false
          this.form.resetFields()
        },
        onCancel() {
          console.log('Cancel')
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.board {
  margin-bottom: 24px;
  .ant-col {
    cursor: pointer;
  }
}
.editHeadData {
  /deep/ .ant-empty {
    display: none;
  }
  .editTitle {
    height: 300px;
    font-size: 20px;
    line-height: 30px;
    padding: 70px 30px;
    margin: 0 auto 0 0;
    background: #fafafa;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #e8e8e8;
  }
}
</style>
