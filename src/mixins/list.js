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
    editor(data) {
      this.current = Object.assign({}, data);
      this.$refs.alert.show();
    },
  },
}