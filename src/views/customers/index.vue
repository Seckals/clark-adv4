<template>
	<div>
		<IMain
			:searchs="searchs"
			:hasSelected="selected"
			delTip="确认删除选中的客户?"
			@operation="operation"
		>
			<a-button
				slot="add"
				@click="operation({ type: 'add' })"
				v-permission="'mainData.mg-customers.add'"
				>新 增</a-button
			>
			<a-button
				slot="delete"
				:disabled="!selected"
				v-permission="'mainData.mg-customers.delete'"
				>删 除</a-button
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
						v-permission="'mainData.mg-customers.edit'"
						@click="editor(record)"
					>
						编辑</a
					>
				</a-table>
			</template>
		</IMain>
		<Customer ref="alert" :data="current" @freash="freash" />
	</div>
</template>
<script>
import {
	page_get,
	remove_get,
	prePage_get,
} from "../../api/comCustomerController";
import Customer from "../../components/alert/customer";
import mixins from "../../mixins/list";
const columns = [
	{
		dataIndex: "id",
		title: "",
		width: 50,
		scopedSlots: { customRender: "id" },
	},
	{
		dataIndex: "code",
		title: "客户编号",
	},
	{
		dataIndex: "name",
		title: "客户名称",
	},
	{
		dataIndex: "manager",
		title: "客户经理",
	},
	{
		dataIndex: "statusValue",
		title: "状态",
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
					type: "input",
					title: "客户编号",
					placeholder: "请输入",
					key: "code",
				},
				{
					type: "input",
					title: "客户名称",
					placeholder: "请输入",
					key: "name",
				},
				{
					type: "select",
					title: "客户经理",
					placeholder: "请选择",
					key: "managerId",
					listDataKey: "managers",
					list: [{ empName: "全部", empId: "" }],
					listkey: "empName",
					listvalue: "empId",
				},
				{
					type: "select",
					title: "状态",
					placeholder: "请选择",
					key: "status",
					listDataKey: "states",
					list: [{ name: "全部", code: "" }],
					listkey: "name",
					listvalue: "code",
				},
			],
		};
	},
	components: { Customer },
	mixins: [mixins],
	mounted() {
		this.getPreList();
	},
	methods: {
		operation({ type, data }) {
			switch (type) {
				case "add":
					this.$refs.alert.show();
					break;
				case "del":
					this.del(this.selected);
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
					this.selected = "";
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
		getPreList() {
			prePage_get().then((res) => {
				this.searchs.map((item) => {
					if (item.listDataKey) {
						item.list =item.list.concat(res[item.listDataKey]);
					}
					return item;
				});
			});
		},
	},
};
</script>