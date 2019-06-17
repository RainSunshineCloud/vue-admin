export default {
    data () {
        return {
            initData: {}
        }
    },
    methods: {
        reset(modal_name) {
            this[modal_name].data = Object.assign({},this.initData[modal_name]);
        },
        open (modal_name,form_data = [],data_name = []) {
            this[modal_name].open = true;
            this.initData[modal_name] = {};
            data_name.forEach((v) => {
                form_data[v] = form_data[v] || '';
                this[modal_name].data[v] = form_data[v] + '';
                this.initData[modal_name][v] = form_data[v] + '';
            });
        },
        close (modal_name) {
            this[modal_name].open = false;
            for (let v in this.initData[modal_name]) {
                this[modal_name].data[v] = ''
            }
        }
    }
}