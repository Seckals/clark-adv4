<template>
  <a-modal
    v-model="visible"
    title="按产线列出的工位"
    :confirmLoading="loading"
    :width="500"
    @ok="ok"
    okText="确定"
    cancelText="取消"
    :destroyOnClose="true"
    :afterClose="close"
  >
    <a-form-model
      :model="form"
      ref="ruleForm"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="产线编号">
        <a-input v-model="form.lineCode" placeholder="" :disabled="true" />
      </a-form-model-item>
      <a-form-model-item label="产线名称">
        <a-input v-model="form.lineName" placeholder="" :disabled="true" />
      </a-form-model-item>
      <a-form-model-item label="工位编号" prop="stationId">
        <a-select
          show-search
          option-filter-prop="children"
          :filter-option="filterOption"
          v-model="form.stationId"
          placeholder="请选择"
          @change="selectData"
        >
          <a-select-option
            v-for="(item, idx) in preList"
            :key="idx"
            :value="item.id"
            >{{ item.stationCode }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="工位名称">
        <a-input v-model="form.stationName" placeholder="" :disabled="true" />
      </a-form-model-item>
      <a-form-model-item label="显示位次">
        <a-input v-model="form.sep" placeholder="请输入显示位次" />
      </a-form-model-item>
      <a-form-model-item label="员工" prop="employes">
        <a-select
          show-search
          option-filter-prop="children"
          :filter-option="filterOption"
          v-model="form.employes"
          placeholder="请选择"
          @change="selectData"
        >
          <a-select-option
            v-for="(item, idx) in employsList"
            :key="idx"
            :value="item.id"
            >{{ item.empName }}({{ item.empNo }})</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="按钮盒ID">
        <a-input v-model="form.stationName" placeholder="" :disabled="true" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import {
  add_post,
  modify_post,
  prePage_get,
} from '../../api/comLineStationRefController'
import { prePage_get1 } from '../../api/hrEmployeController'
import mixins from '../../mixins/editor'

export default {
  data() {
    return {
      employsList: [],
      preList: [],
      form: {
        lineId: '',
        lineCode: '',
        lineName: '',
        sep: '',
        stationId: '',
        stationName: '',
        employes: '',
      },
      rules: {
        employes: [
          {
            required: true,
            message: '请选择员工',
            trigger: 'change',
          },
        ],
        stationId: [
          {
            required: true,
            message: '请选择工位编号',
            trigger: 'change',
          },
        ],
      },
    }
  },
  mounted() {
    this.getPreList()
    this.getSelects()
  },
  mixins: [mixins],
  methods: {
    getSelects() {
      prePage_get1().then((res) => {
        this.employsList = res.employs
        console.log(this.employsList)
      })
    },
    add() {
      this.loading = true
      add_post({
        data: {
          lineId: this.form.lineId,
          sep: this.form.sep,
          stationId: this.form.stationId,
        },
      })
        .then(() => {
          this.loading = false
          this.$emit('freash')
          this.visible = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    editor() {
      this.loading = true
      modify_post({
        data: {
          id: this.form.id,
          lineId: this.form.lineId,
          sep: this.form.sep,
          stationId: this.form.stationId,
        },
      })
        .then(() => {
          this.loading = false
          this.$emit('freash')
          this.visible = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getPreList() {
      this.loading = true
      prePage_get()
        .then((res) => {
          this.loading = false
          this.preList = res.stationList || []
        })
        .catch(() => {
          this.loading = false
        })
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    selectData(e) {
      this.preList.forEach((item) => {
        if (item.id === e) {
          this.form.stationName = item.stationName
        }
      })
    },
  },
}
</script>
