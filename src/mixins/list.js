/*
 * @Author: your name
 * @Date: 2021-02-19 16:55:27
 * @LastEditTime: 2021-03-07 18:22:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /clark-adv4/src/mixins/list.js
 */
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
    delModel(content, onOk) {
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