import {getHost} from '@/libs/util'
import api from '@/api/api.js'

export default {
    methods: {
        reset(modal_name) {
            this[modal_name].open = false;
            this[modal_name].formData = {};
            if (this[modal_name].header_url) {
                this[modal_name].header_url = '';
            }
        },
        modify(url,modal_name) {
            api.post(url,this[modal_name].formData).then((data) => {
                this[modal_name].open = false;
                this.$Message.success('修改成功');
                this.getSearchData({pageSize:this.pageSize,page:1});
            });
        },
        add(url,modal_name) {
            api.post(url,this[modal_name].formData).then((data) => {
               this[modal_name].open = false;
               this.$Message.success('添加成功');
               this.getSearchData({pageSize:this.pageSize,page:1});
            });
        },
        del (url,data) {
            api.post(url,data).then((data) => {
                this.$Message.success('删除成功');
                this.getSearchData({pageSize:this.pageSize,page:1});
            });
        },
        open (modal_name,form_data = [],data_name = []) {
            this[modal_name].open = true;
            data_name.forEach((v) => {
                this[modal_name].formData[v] = form_data[v];
                if (v == 'header') {
                    this[modal_name].header_url = getHost() + form_data.header;
                }
            });
        },
        getResetData(data){
        },
    }
}