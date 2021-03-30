<!--
 * @Author: 张鹏
 * @Date: 2021-02-23 10:25:12
 * @LastEditTime: 2021-03-25 15:52:49
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /eqp-module/src/components/alert/dtc.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <a-modal
    v-model="visible"
    :title="form.id ? '编辑故障代码' : '新建故障代码'"
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
      <a-form-model-item label="故障分类代码" prop="faultTypeCode">
        <a-input v-model="form.faultTypeCode" placeholder="" />
      </a-form-model-item>
      <a-form-model-item label="故障分类名称" prop="faultTypeName">
        <a-input v-model="form.faultTypeName" placeholder="" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { add_post, modify_post } from '../../api/problemClass.js';
import mixins from '../../mixins/editor';
export default {
  data() {
    return {
      form: {
        faultTypeCode: '',
        faultTypeName: ''
      },
      rules: {
        faultTypeCode: [
          {
            required: true,
            message: '请输入故障代码',
            trigger: 'blur'
          }
        ],
        faultTypeName: [
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
          faultTypeName: this.form.faultTypeName,
          faultTypeCode: this.form.faultTypeCode
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
          faultTypeName: this.form.faultTypeName,
          faultTypeCode: this.form.faultTypeCode,
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
