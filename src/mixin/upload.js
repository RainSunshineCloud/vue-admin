import api from '@/api/api.js'
import {getHost} from '@/libs/util'

export default {
	methods: {
		//移除文件
		removePic (modal_name) {
			this[modal_name].formData.header = '';
			this[modal_name].header_url = '';
		},
		//文件上传
		uploadPic (param,modal_name,url) {
		    param.append('type','header');
		    return api.post(url,param).then((res) => {
		    	this[modal_name].formData.header = res.data;
				this[modal_name].header_url = getHost() + res.data;
		    });
		}
	}
}