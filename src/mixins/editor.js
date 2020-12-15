export default {
  data() {
    return {
      visible: false,
      loading: false,
    }
  },
  props: ['data'],
  watch: {
    data(value) {
      this.$nextTick(() => {
        if(value)this.form = value;
      })
    },
  },
  methods: {
    ok() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.form.id ? this.editor() : this.add();
        }
      });
    },
    show() {
      this.visible = true;
    },
    close() {
      this.form = {}
      this.$emit("freash", 'close');
    },
  },
}