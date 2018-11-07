/**
 * 该封装可以和vuex联合使用，通过vuex管理数据，通过该封装获取vuex的数据
 */
import {getToken} from '@/libs/util';
import Message from '@/components/notification';
export default function () {
return [
    {
        transformResponseSuc: function (res){
            Message.config({styles:{right:'10px',marginBottom:'10px'}});
            Message.info({content:'sdfksdjk'})
            return res;
        },
        transformRequestSuc:function(res) {
            return res;
        },
        header:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        path: '/passport',
        method:'get',
        group:[
            {  
                path: '/login',
                method: 'post',
            },
            {
                path: 'register',
                method: 'get',
            }
        ]
    }
]}


