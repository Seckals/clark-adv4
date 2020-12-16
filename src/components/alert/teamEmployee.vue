<template>
  <a-modal
    v-model="visible"
    title="按团队列出的员工"
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
      <a-form-model-item label="团队编号">
        <a-input v-model="form.teamCode" placeholder="" :disabled="true" />
      </a-form-model-item>
      <a-form-model-item label="团队名称">
        <a-input v-model="form.teamName" placeholder="" :disabled="true" />
      </a-form-model-item>
      <a-form-model-item label="员工姓名" prop="employeeId">
        <a-select
          show-search
          option-filter-prop="children"
          :filter-option="filterOption"
          v-model="form.employeeId"
          placeholder="请选择"
          @change="selectData"
        >
          <a-select-option
            v-for="(item, idx) in preList"
            :key="idx"
            :value="item.epmId"
            >{{ item.empName }}({{ item.empNo }})</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="员工部门">
        <a-input v-model="form.deptName" placeholder="" :disabled="true" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import {
  add_post,
  modify_post,
  prePage_get,
} from '../../api/comTeamEmployeRefController'
import mixins from '../../mixins/editor'

export default {
  data() {
    return {
      preList: [],
      form: {
        teamId: '',
        teamCode: '',
        teamName: '',
        employeeId: '',
        deptName: '',
      },
      rules: {
        employeeId: [
          {
            required: true,
            message: '请选择员工姓名',
            trigger: 'change',
          },
        ],
      },
    }
  },
  mounted() {
    this.getPreList()
  },
  mixins: [mixins],
  methods: {
    add() {
      console.log(this.form)
      this.loading = true
      add_post({
        data: {
          teamId: this.form.teamId,
          employeeId: this.form.employeeId,
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
          teamId: this.form.teamId,
          employeeId: this.form.employeeId,
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
          console.log(res)
          this.preList = res.employeeList || []
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
        if (item.epmId === e) {
          this.form.deptName = item.deptName
        }
      })
    },
  },
}
</script>
