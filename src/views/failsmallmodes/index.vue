<template>
  <div>
    <IMain
      :infoData="infoData"
      permission="mainData.baseData.failsmallmodes.add"
      @operation="operation"
    >
      <template slot="table">
        <a-table
          
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
                v-permission="'mainData.baseData.failsmallmodes.edit'"
                @click="
                  editor({
                    ...record,
                    maintenanceCode: JSON.parse($route.query.data)
                      .maintenanceCode,
                    maintenanceName: JSON.parse($route.query.data)
                      .maintenanceName
                  })
                "
              >
                编辑</a
              >
              <a
                v-permission="'mainData.baseData.failsmallmodes.delete'"
                @click="delEvent(record.id)"
              >
                删除</a
              >
            </a-space>
          </template>
        </a-table>
      </template>
    </IMain>
    <failsmallmodes ref="alert" :data="current" @freash="freash" />
  </div>
</template>
<script>
import { page_get, remove_get } from '../../api/failsmallmodes';
import failsmallmodes from '../../components/alert/failsmallmodes';
import mixins from '../../mixins/list';
const columns = [
  {
    dataIndex: 'faultCauseCode',
    title: '故障原因代码  '
  },
  {
    dataIndex: 'faultCauseName',
    title: '故障原因名称 '
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' }
  }
];
export default {
  data() {
    return {
      info: '',
      columns,
      current: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      infoData: [
        {
          type: 'input',
          title: '当前维修类型编号：',
          value: JSON.parse(this.$route.query.data).maintenanceCode,
          key: 'name'
        },
        {
          type: 'input',
          title: '当前维修类型名称：',
          value: JSON.parse(this.$route.query.data).maintenanceName,
          key: 'code'
        }
      ]
    };
  },
  components: { failsmallmodes },
  mixins: [mixins],
  created() {
    this.info = JSON.parse(this.$route.query.data);
  },
  methods: {
    operation({ type, data }) {
      switch (type) {
        case 'add':
          this.current = {
            faultId: JSON.parse(this.$route.query.data).id,
            maintenanceCode: JSON.parse(this.$route.query.data).maintenanceCode,
            maintenanceName: JSON.parse(this.$route.query.data).maintenanceName
          };
          this.$refs.alert.show();
          break;
        case 'search':
          this.getList(data);
          break;
      }
    },
    tableChange(e) {
      this.pagination = e;
      this.getList();
    },
    delEvent(id) {
      this.delModel('确认删除选中的故障小类', () => {
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
    getList() {
      this.loading = true;
      page_get({
        data: {
          maintenanceCode: JSON.parse(this.$route.query.data).maintenanceCode,
          size: this.pagination.pageSize,
          current: this.pagination.current
        }
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
