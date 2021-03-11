/*
 * @Author: 张鹏
 * @Date: 2021-03-11 19:39:32
 * @LastEditTime: 2021-03-11 20:30:22
 * @LastEditors: your name
 * @Description: 
 * @FilePath: /clark-adv4/src/mixins/editor.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
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
         console.log(value)
         this.$nextTick(() => {
            this.form = value || {};
         })
      },
   },
   methods: {
      filterOption(input, option) {
         return (
            option.componentOptions.children[0].text
               .toLowerCase()
               .indexOf(input.toLowerCase()) >= 0
         )
      },
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