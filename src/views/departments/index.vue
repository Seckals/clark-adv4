<template>
	<div>
		<IMain
			:searchs="[]"
			:hasSelected="selected"
			delTip="确认删除选中的部门?"
			@operation="operation"
		>
			<a-button
				slot="add"
				@click="operation({ type: 'add' })"
				v-permission="'mainData.mg-departments.add'"
				>新 增</a-button
			>
			<a-button
				slot="delete"
				:disabled="!selected"
				v-permission="'mainData.mg-departments.delete'"
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
						v-permission="'mainData.mg-departments.edit'"
						@click="editor(record)"
					>
						编辑</a
					>
				</a-table>
			</template>
		</IMain>
		<Department ref="alert" :data="current" @freash="freash" />
	</div>
</template>
<script>
import { page_get, remove_post } from "../../api/hrDeptController";
import Department from "../../components/alert/department";
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
		title: "部门编号",
	},
	{
		dataIndex: "name",
		title: "部门名称",
	},
	{
		dataIndex: "parentName",
		title: "父部门",
	},
	{
		dataIndex: "deptManagerValue",
		title: "部门经理",
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
		};
	},
	components: { Department },
	mixins: [mixins],
	methods: {
		operation({ type }) {
			switch (type) {
				case "add":
					this.$refs.alert.show();
					break;
				case "del":
					this.del(this.selected);
					break;
			}
		},
		tableChange(e) {
			this.pagination = e;
			this.getList();
		},
		del(id) {
			this.loading = true;
			remove_post({
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
		getList() {
			this.loading = true;
			page_get({
				data: {
					limit: this.pagination.pageSize,
					page: this.pagination.current,
				}
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
	},
};
</script>