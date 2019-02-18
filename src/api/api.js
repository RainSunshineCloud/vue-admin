import HttpRequest from '@/libs/axios'
import config from '@/config'
import {getToken,setToken} from '@/libs/util'
import {Message} from 'iview'

class Api
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
        if (req.data.code) {
            return Promise.resolve({status:1,req});
        } else {
            Message.error(req.data.msg);
            return Promise.reject(req);
        }   
    }

    commonCatch (error) {
        return {
            then: () => {
               
            }
        }
    }

    middles () {
        return {
            req:{success:[this.getCookieMiddle],error:[]},
            res:{success:[this.cookieMiddle],error:[]},
        }
    }
    getCookieMiddle (intstance,url,req) {
        req.headers.token = getToken();
    }
    cookieMiddle (intstance,url,res) {
        if (getToken() != res.headers.token && res.headers.token) {
            setToken(res.headers.token);
        }
    }
}
let api = new Api();
export default api;