export default {
  data() {
    return {
      data: [],
      loading: false,
    }
  },
  mounted() {
    this.getList(this.$route.query);
  },
  methods: {
    freash(e) {
      this.current = {};
      if (!e) {
        this.getList();
        if (this.getPreList) this.getPreList()
      }
    },
    delModel(content,onOk){
      this.$warning({
        title: '删除警告',
        content,
        centered:true,
        closable:true,
        okText:'确定',
        okType:'primary',
        cancelText:'取消',
        onOk
      });
    },
    editor(data) {
      this.current = Object.assign({}, data);
      this.$refs.alert.show();
    },
  },
}