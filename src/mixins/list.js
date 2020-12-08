export default{
    data() {
        return {
            data: [],
			loading: false,
            
        }
    },
    mounted() {
		this.getList();
    },
    methods: {
        freash(e) {
			this.current = {};
			if(!e)this.getList();
        },
        editor(data) {
			this.current = Object.assign({},data);
			this.$refs.alert.show();
		},
    },
}