import HttpRequest from '@/libs/axios'
import config from '@/config'
import {setToken} from '@/libs/util'
import {Message} from 'iview'

class Login
{
    constructor () {
        let config_all = Object.assign({},config.apiConf,this.configs());
        return new HttpRequest(config_all,this.commonThen,this.commonCatch,this.middles());
    }

    configs () {
        return {
        }
    }
    commonThen (req) {
        if (parseInt(req.status) == 200 && parseInt(req.data.code) == 200) {
            Message.success("登录成功");
            return Promise.resolve({status:200,req});
        } else {
            Message.error(req.data.msg);
            return Promise.reject(req);
        }   
    }

    commonCatch (error) {
        return {
            then: () => {
                if (error.message) {
                    Message.error(error.message);
                }
            }
        }
    }

    middles () {
        return {
            req:{success:[],error:[]},
            res:{success:[this.cookieMiddle],error:[]},
        }
    }
    cookieMiddle (intstance,url,res){
        if (!!res.headers.token) {
            setToken(res.headers.token);
        }
    }
}
let login = new Login();
export default login;