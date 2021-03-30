<template>
  <a-modal
    v-model="visible"
    :title="!form.id ? '新建故障原因类型' : '编辑故障原因类型'"
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
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item label="维修类型代码：">
        <a-input
          v-model="form.maintenanceCode"
          placeholder=""
          :disabled="true"
        />
      </a-form-model-item>
      <a-form-model-item label="维修类型名称：">
        <a-input
          v-model="form.maintenanceName"
          placeholder=""
          :disabled="true"
        />
      </a-form-model-item>
      <a-form-model-item label="故障原因代码：" prop="faultCauseCode">
        <a-input v-model="form.faultCauseCode" placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="故障原因名称：" prop="faultCauseName">
        <a-input v-model="form.faultCauseName" placeholder="" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { add_post, modify_post } from '../../api/failsmallmodes';
import mixins from '../../mixins/editor';

export default {
  data() {
    return {
      preList: [],
      form: {
        faultId: '',
        id: '',
        maintenanceCode: '',
        faultCauseName: '',
        faultCauseCode: '',
        maintenanceName: ''
      },
      rules: {
        faultCauseCode: [
          {
            required: true,
            message: '请输入',
            trigger: 'change'
          }
        ],
        faultCauseName: [
          {
            required: true,
            message: '请输入',
            trigger: 'change'
          }
        ]
      }
    };
  },
  mounted() {},
  mixins: [mixins],
  methods: {
    add() {
      console.log(this.form);
      this.loading = true;
      add_post({
        data: {
          maintenanceCode: this.form.maintenanceCode,
          maintenanceName: this.form.maintenanceName,
          faultCauseName: this.form.faultCauseName,
          faultCauseCode: this.form.faultCauseCode
        }
      })
        .then(() => {
          this.loading = false;
          this.$emit('freash');
          this.visible = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    editor() {
      this.loading = true;
      modify_post({
        data: {
          id: this.form.id,
          maintenanceCode: this.form.maintenanceCode,
          maintenanceName: this.form.maintenanceName,
          faultCauseName: this.form.faultCauseName,
          faultCauseCode: this.form.faultCauseCode
        }
      })
        .then(() => {
          this.loading = false;
          this.$emit('freash');
          this.visible = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
