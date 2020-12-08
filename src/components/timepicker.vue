<template>
	<a-time-picker v-model="value" :open="open" @openChange="handleOpenChange" format="HH:mm" valueFormat="HH:mm:ss" :placeholder="placeholder">
		<div class="time-picker-footer" slot="addon">
            <a @click="setNow">此刻</a>
			<a-button size="small" type="primary" @click="ok">确定</a-button>
		</div>
	</a-time-picker>
</template>
<script>
import moment from 'moment';
export default {
	data() {
		return {
            open: false,
            value:""
		};
    },
    props:['data','placeholder'],
    watch:{
        data(e){
            this.value = e
        }
    },
	methods: {
		handleOpenChange(e) {
			this.open = e;
        },
        setNow(){
            this.value = moment().format("HH:mm:ss")
            console.log(this.data)
        },
        ok(){
            this.open = false
            this.$emit('change',this.value)
        }
	},
};
</script>
<style lang="less" scoped>
.time-picker-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>