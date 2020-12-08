<template>
	<div>
		<IMain
			:searchs="[]"
			:hasSelected="selected"
			delTip="确认删除选中的班次?"
			@operation="operation"
		>
			<a-button
				slot="add"
				@click="operation({ type: 'add' })"
				v-permission="'mainData.mg-classes.add'"
				>新 增</a-button
			>
			<a-button
				slot="delete"
				:disabled="!selected"
				v-permission="'mainData.mg-classes.delete'"
				>删 除</a-button
			>
			<template slot="table">
				<a-table
					:loading="loading"
					:row-key="(record) => record.id"
					:columns="columns"
					:data-source="data"
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
						v-permission="'mainData.mg-classes.edit'"
						@click="editor(record)"
					>
						编辑</a
					>
				</a-table>
			</template>
		</IMain>
		<Classes ref="alert" :data="current" @freash="freash" />
	</div>
</template>
<script>
import { list_get, remove_get } from "../../api/comShiftController";
import Classes from "../../components/alert/classes";
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
		title: "班次编号",
	},
	{
		dataIndex: "name",
		title: "班次名称",
	},
	{
		dataIndex: "shiftStartTime",
		title: "开始时间",
	},
	{
		dataIndex: "shiftEndTime",
		title: "结束时间",
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
			current: {}
		};
	},
	components: { Classes },
	mixins:[mixins],
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
		getList() {
			this.loading = true;
			list_get()
				.then((res) => {
					this.loading = false;
					this.data = res || [];
				})
				.catch(() => {
					this.loading = false;
				});
		},
	},
};
</script>