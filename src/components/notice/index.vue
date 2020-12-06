<template>
	<a-dropdown :trigger="['click']" placement='bottomRight' :visible='visible' @visibleChange="visibleChange"  overlayClassName="popover___3CK4c container___1Rq3A">
		<div class="notice-icon">
			<a-badge
				count="0"
				class="notice-badge"
				:style="{ boxShadow: 'none' }"
			>
				<span>
					<a-icon type="bell" />
				</span>
			</a-badge>
		</div>
		<a-spin :spinning="loading" :delay="300" slot="overlay">
            <div class="drop-shadow"></div>
			<a-tabs @change="callback" :animated="false" class="tabs">
				<a-tab-pane key="1" tab="Tab 1">
					<NoticeList/>
				</a-tab-pane>
				<a-tab-pane key="2" tab="Tab 2">
					Content of Tab Pane 2
				</a-tab-pane>
				<a-tab-pane key="3" tab="Tab 3">
					<NoticeList/>
				</a-tab-pane>
			</a-tabs>
		</a-spin>
	</a-dropdown>
</template>
<script>
import NoticeList from './list'
export default {
    data(){
        return {
            loading:false,
            visible:false
        }
    },
    components:{NoticeList},
	methods: {
        callback() {},
        visibleChange(){
            this.visible = !this.visible
        }
	},
};
</script>
<style lang="less" scoped>
.notice-icon {
	display: flex;
	align-items: center;
	height: 100%;
	padding: 0 12px;
	cursor: pointer;
	transition: all 0.3s;
	.notice-badge {
		font-size: 16px;
		& > span {
			padding: 4px;
			vertical-align: middle;
		}
	}
}
.drop-shadow{
    position: relative;
    margin: 0;
    padding: 4px 0;
    text-align: left;
    list-style-type: none;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 2px;
    outline: none;
    box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
}
</style>
<style lang="less">
.notice-icon.ant-dropdown-open {
	background: rgba(0, 0, 0, 0.025);
}
.popover___3CK4c{
    position: relative;
    width: 336px;
}
.tabs {
  .ant-tabs-nav-list {
      margin: auto;
    }

    .ant-tabs-nav-scroll {
      text-align: center;
    }
    .ant-tabs-bar {
      margin-bottom: 0;
    }
}
.container___1Rq3A>div{
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 6px 16px -8px rgba(0,0,0,.08), 0 9px 28px 0 rgba(0,0,0,.05), 0 12px 48px 16px rgba(0,0,0,.03);
}
.ant-tabs-tab{
    padding:12px 0 !important;
}
</style>