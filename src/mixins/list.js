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
      this.$confirm({
        title: '删除警告',
        content,
        onOk
      });
    },
    editor(data) {
      this.current = Object.assign({}, data);
      this.$refs.alert.show();
    },
  },
}