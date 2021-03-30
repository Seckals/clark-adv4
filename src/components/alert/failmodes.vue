<template>
  <a-modal
    v-model="visible"
    :title="!form.id ? '新建故障代码' : '编辑故障代码'"
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
      <a-form-model-item label="维修类型代码：" prop="maintenanceCode">
        <a-input v-model="form.maintenanceCode" placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="维修类型名称：" prop="maintenanceName">
        <a-input v-model="form.maintenanceName" placeholder="" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { add_post, modify_post } from '../../api/failmodes';
import mixins from '../../mixins/editor';
export default {
  data() {
    return {
      form: {
        maintenanceCode: '',
        maintenanceName: ''
      },
      rules: {
        maintenanceCode: [
          {
            required: true,
            message: '请选择员工姓名',
            trigger: 'change'
          }
        ],
        maintenanceName: [
          {
            required: true,
            message: '请选择员工姓名',
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
          maintenanceName: this.form.maintenanceName
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
          maintenanceName: this.form.maintenanceName
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
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  }
};
</script>
