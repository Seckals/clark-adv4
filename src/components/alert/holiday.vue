<!--
 * @Author: 张鹏
 * @Date: 2021-03-11 20:19:40
 * @LastEditTime: 2021-03-12 09:39:06
 * @LastEditors: your name
 * @Description: 
 * @FilePath: /clark-adv4/src/components/alert/holiday.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <a-modal
    v-model="visible"
    :title="form.id ? '编辑职位' : '新增职位'"
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
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="模块" prop="moduleName">
           <a-select v-model="form.moduleName"
                  placeholder="请选择模块"
                 >
          <a-select-option v-for="(item, idx) in moduleNames"
                           :key="idx"
                           :value="item.moduleName">{{ item.moduleName }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="日期" prop="dateInfo">
         <a-date-picker
               placeholder="请选择日期"
          v-model="form.dateInfo"
          valueFormat="YYYY-MM-DD"
        />
      </a-form-model-item>
      <a-form-model-item label="说明" prop="dateDesc">
        <a-input v-model="form.dateDesc" placeholder="请输入说明" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import { add_post, modify_post } from '../../api/holiday'
import mixins from '../../mixins/editor'
export default {
  data() {
    return {
       moduleNames:[
          {moduleName:'MES'},  {moduleName:'SCM'},  {moduleName:'LPA'},
       ],
      form: {
        dateDesc: '',
        dateInfo: '',
        moduleName:''
      },
      rules: {
        dateDesc: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
        ],
        dateInfo: [
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ], moduleName: [
          {
            required: true,
            message: '请选择',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mixins: [mixins],
  methods: {
    add() {
      this.loading = true
      add_post({
        data: this.form,
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
        data: this.form,
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
  },
}
</script>
