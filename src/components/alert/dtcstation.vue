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
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="产线编号" prop="lineCode">
        <a-select
          v-model="form.lineCode"
          placeholder="请选择"
          :filter-option="filterOption"
          :show-search="true"
        >
          <a-select-option
            v-for="(item, idx) in lineList"
            :key="idx"
            :value="item.code"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="工位编号" prop="stationCode">
        <a-select
          v-model="form.stationCode"
          placeholder="请选择"
          @change="selecStation"
          :filter-option="filterOption"
          :show-search="true"
        >
          <a-select-option
            v-for="(item, idx) in stationList"
            :key="idx"
            :value="item.stationCode"
            >{{ item.stationCode }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="工位名称">
        <a-input v-model="form.stationName" placeholder="" disabled />
      </a-form-model-item>
      <a-form-model-item label="故障代码" prop="faultCode">
        <a-select
          v-model="form.faultCode"
          placeholder="请选择"
          @change="selecFaultCode"
          :filter-option="filterOption"
          :show-search="true"
        >
          <a-select-option
            v-for="(item, idx) in faultcodeList"
            :key="idx"
            :value="item.faultCode"
            >{{ item.faultCode }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="故障名称">
        <a-input v-model="form.faultName" placeholder="" disabled />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import {
  add_post,
  modify_post,
  page_comStationController_list,
  page_faultcode_list,
  page_comLineController_list
} from '../../api/dtcstations';
import mixins from '../../mixins/editor';

export default {
  data() {
    return {
      lineList: [],
      faultcodeList: [],
      stationList: [],
      form: {},
      rules: {
        lineCode: [
          {
            required: true,
            message: '请选择产线编号',
            trigger: 'blur'
          }
        ],
        stationCode: [
          {
            required: true,
            message: '请选择工位编号',
            trigger: 'blur'
          }
        ],
        faultCode: [
          {
            required: true,
            message: '请选择故障代码',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  mixins: [mixins],
  mounted() {
    this.page_comStationController_list();
    this.page_faultcode_list();
    this.page_comLineController_list();
  },
  methods: {
    page_faultcode_list() {
      page_faultcode_list().then((res) => {
        this.faultcodeList = res;
      });
    },
    page_comStationController_list() {
      page_comStationController_list().then((res) => {
        this.stationList = res;
      });
    },
    page_comLineController_list() {
      page_comLineController_list().then((res) => {
        this.lineList = res;
      });
    },
    selecFaultCode(e) {
      this.faultcodeList.forEach((el) => {
        if (el.faultCode === e) {
          this.form.faultName = el.faultName;
        }
      });
    },
    selecStation(e) {
      this.stationList.forEach((el) => {
        if (el.stationCode === e) {
          this.form.stationName = el.stationName;
        }
      });
    },
    add() {
      this.loading = true;
      add_post({
        data: {
          faultCode: this.form.faultCode,
          faultName: this.form.faultName,
          lineCode: this.form.lineCode,
          stationCode: this.form.stationCode,
          stationName: this.form.stationName
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
          faultCode: this.form.faultCode,
          faultName: this.form.faultName,
          lineCode: this.form.lineCode,
          stationCode: this.form.stationCode,
          stationName: this.form.stationName
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
