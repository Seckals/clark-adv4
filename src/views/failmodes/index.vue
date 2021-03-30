<template>
  <div>
    <IMain
      permission="mainData.baseData.failmodes.add"
      @operation="operation"
      ref="IMain"
    >
      <template slot="table">
        <a-table
          bordered
          :loading="loading"
          :row-key="(record) => record.id"
          :pagination="pagination"
          :columns="columns"
          :data-source="data"
          @change="tableChange"
        >
          <template slot="operation" slot-scope="record">
            <a-space size="small">
              <a
                v-permission="'mainData.baseData.failmodes.edit'"
                @click="editor(record)"
              >
                编辑</a
              >
              <a
                v-permission="'mainData.baseData.failmodes.delete'"
                @click="delEvent(record.id)"
              >
                删除</a
              >
            </a-space>
          </template>
          <a slot="linkUserCount" slot-scope="data" @click="showLink(data)">{{
            data.faultCauseNum
          }}</a>
        </a-table>
      </template>
    </IMain>
    <failsmodes ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, remove_get } from '../../api/failmodes';
import failsmodes from '../../components/alert/failmodes';
import mixins from '../../mixins/list';
const columns = [
  {
    dataIndex: 'maintenanceCode',
    title: '维修分类编号 '
  },
  {
    dataIndex: 'maintenanceName',
    title: '维修类型名称'
  },
  {
    title: '故障原因类型',
    scopedSlots: { customRender: 'linkUserCount' }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' }
  }
];
export default {
  data() {
    return {
      columns,
      current: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  components: { failsmodes },
  mixins: [mixins],
  methods: {
    operation({ type, data }) {
      switch (type) {
        case 'add':
          this.$refs.alert.show();
          break;
        case 'search':
          this.getList(data);
          break;
      }
    },
    showLink(data) {
      this.$router.push({
        path: '/failsmallmodes',
        query: {
          data: JSON.stringify(data)
        }
      });
    },
    tableChange(e) {
      this.pagination = e;
      this.getList(this.$refs.IMain.searchData);
    },
    delEvent(id) {
      this.delModel('确认删除选中的维修类型', () => {
        this.del(id);
      });
    },
    del(id) {
      this.loading = true;
      remove_get({
        data: { id }
      })
        .then(() => {
          this.loading = false;
          this.$message.success('删除成功');
          this.selected = '';
          this.getList();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getList(data = {}) {
      this.loading = true;
      page_get({
        data: Object.assign(
          {
            pageSize: this.pagination.pageSize,
            pageNum: this.pagination.current
          },
          data
        )
      })
        .then((res) => {
          this.loading = false;
          this.data = res.records || [];
          this.pagination.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
