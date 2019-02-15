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
            'Token': 1,
        }
    }
    commonThen (req) {
        if (req.data.code) {
             Message.success(req.data.msg);
            return Promise.resolve({status:1,req});
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
        setToken(res.data.data.token);
    }
}
let login = new Login();
export default login;