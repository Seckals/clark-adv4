<!--
 * @Author: 张鹏
 * @Date: 2021-02-23 10:25:12
 * @LastEditTime: 2021-03-25 16:10:49
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /eqp-module/src/components/alert/dtc.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <a-modal
    v-model="visible"
    :title="form.id ? '编辑设备类型' : '新建设备类型'"
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
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="设备类型代码" prop="equCode">
        <a-input v-model="form.equCode" placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="设备类型名称" prop="equName">
        <a-input v-model="form.equName" placeholder="" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { add_post, modify_post } from '../../api/eqpType.js';
import mixins from '../../mixins/editor';
export default {
  data() {
    return {
      form: {
        equCode: '',
        equName: ''
      },
      rules: {
        equCode: [
          {
            required: true,
            message: '请输入故障代码',
            trigger: 'blur'
          }
        ],
        equName: [
          {
            required: true,
            message: '请输入故障名称',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  mixins: [mixins],
  methods: {
    add() {
      this.loading = true;
      add_post({
        data: {
          equName: this.form.equName,
          equCode: this.form.equCode
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
          equName: this.form.equName,
          equCode: this.form.equCode,
          id: this.form.id
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
