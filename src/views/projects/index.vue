<template>
	<div>
		<IMain
			:searchs="searchs"
			:hasSelected="selected"
			delTip="确认删除选中的项目?"
			@operation="operation"
		>
			<a-button slot="add" @click="operation({type:'add'})" v-permission="'mainData.mg-projects.add'">新 增</a-button>
			<a-button slot="delete" :disabled="!selected" v-permission="'mainData.mg-projects.delete'">删 除</a-button>
			<template slot="table">
				<a-table
					:loading="loading"
					:row-key="(record) => record.id"
					:pagination="pagination"
					:columns="columns"
					:data-source="data"
					@change="tableChange"
				>
					<a-radio
						slot="id"
						slot-scope="id"
						:checked="selected == id"
						:value="id"
						@click="selected = id"
					></a-radio>
					<a
						slot="operation"
						slot-scope="record"
						v-permission="'mainData.mg-projects.edit'"
						@click="editor(record)"
					>
						编辑</a
					>
				</a-table>
			</template>
		</IMain>
		<Projects ref="alert" :data="current" @freash="freash" />
	</div>
</template>
<script>
import { page_get, remove_get ,prePage_get} from "../../api/comProjectController";
import Projects from "../../components/alert/projects";
import mixins from '../../mixins/list'
const columns = [
	{
		dataIndex: "id",
		title: "",
		width: 50,
		scopedSlots: { customRender: "id" },
	},
	{
		dataIndex: "code",
		title: "项目编号",
	},
	{
		dataIndex: "name",
		title: "项目名称",
	},
    {   
		dataIndex: "customer",
		title: "客户",
	},
	{
		dataIndex: "sop",
		title: "是否已量产",
	},{
		dataIndex: "sopStartTime",
		title: "量产时间",
	},
	{
		dataIndex: "manager",
		title: "项目经理",
    },
    {
		dataIndex: "peManagerValue",
		title: "PE经理",
	},
	{
		title: "操作",
		scopedSlots: { customRender: "operation" },
	},
];
export default {
	data() {
		return {
			columns,
			selected: "",
			current: {},
			pagination: {
				current: 1,
				pageSize: 10,
				total: 0,
			},
			searchs: [
                {
					type: "select",
					title: "客户",
					placeholder: "请选择",
					key: "customer",
                    list: [{name:'全部',id:''}],
                    listDataKey:'customers',
					listkey: "name",
					listvalue: "id",
				},
                {
					type: "select",
					title: "项目经理",
					placeholder: "请选择",
                    key: "manager",
                    listDataKey:'manegers',
					list: [{name:'全部',id:''}],
					listkey: "name",
					listvalue: "id",
                },
                {
					type: "select",
					title: "PE经理",
					placeholder: "请选择",
                    key: "peManager",
                    listDataKey:'peManegers',
					list: [{name:'全部',id:''}],
					listkey: "name",
					listvalue: "id",
				},
				{
					type: "select",
					title: "是否量产",
					placeholder: "请选择",
                    key: "sop",
                    listDataKey:'sops',
					list: [{name:'全部',code:''}],
					listkey: "name",
					listvalue: "code",
				},
			],
		};
	},
	components: { Projects },
    mixins:[mixins],
    mounted(){
        this.getSelects()
    },
	methods: {
		operation({ type, data }) {
			switch (type) {
				case "add":
					this.$refs.alert.show();
					break;
				case "del":
                    this.del(this.selected)
					break;
				case "search":
					this.getList(data);
					break;
			}
        },
		tableChange(e) {
			this.pagination = e;
			this.getList();
		},		
		del(id) {
			this.loading = true;
			remove_get({
				data: { id },
			})
				.then(() => {
					this.loading = false;
                    this.$message.success("删除成功");
                    this.selected = ''
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
						limit: this.pagination.pageSize,
						page: this.pagination.current,
					},
					data
				),
			})
				.then((res) => {
					this.loading = false;
					this.data = res.result || [];
					this.pagination.total = res.count;
				})
				.catch(() => {
					this.loading = false;
				});
        },
        getSelects(){
			prePage_get()
				.then((res) => {
					this.searchs.map(item=>{
                        item.list = item.list.concat(res[item.listDataKey] || []) 
                        return item
                    })
				})
        }
	},
};
</script>