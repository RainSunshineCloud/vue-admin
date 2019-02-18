
import api from '@/api/api.js'
//移除文件
export const removeFiles = function (flag,self){
    switch (flag) {
        case 1:
            self.modifyModal.formData.header = '';
            break;
        case 2:
            self.addModal.formData.header = '';
            break;
    }   
}
//文件上传
export const uploadFiles = function (param,flag,self) {
    param.append('type','header');
    api.post('api/uploadImg',param).then((data) => {
        switch (flag) {
            case 1:
                self.modifyModal.formData.header = data.req.data.data;
                break;
            case 2:
                self.addModal.formData.header = data.req.data.data;
                break;
        }
        
    });
}

//重置模态框
export const resets = function (flag,self) {
                switch (flag) {
                    case 1:
                        self.modifyModal.open = false;
                        self.modifyModal.formData = {};
                        break;
                    case 2:
                        self.addModal.open = false;
                        self.addModal.formData = {};
                        break;
                }   
            }

//修改
export const modifys = function (url,self) {
                api.post(url,self.modifyModal.formData).then((data) => {
                   self.modifyModal.open = false;
                   self.getSearchData({pageSize:self.pageSize,page:1});
                });
           }

//添加
export const adds = function (url,self) {
                api.post(url,self.addModal.formData).then((data) => {
                   self.addModal.open = false;
                   self.getSearchData({pageSize:self.pageSize,page:1});
                });
            }