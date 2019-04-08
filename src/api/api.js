import HttpRequest from '@/libs/axios'
import config from '@/config'
import {getToken,setToken,delToken} from '@/libs/util'
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
        if (parseInt(req.status) == 200 && parseInt(req.data.code) == 200) {
            return Promise.resolve(req.data);
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
        if (getToken() != res.headers.token) {
            if (res.headers.token && res.headers.token != '') {
                setToken(res.headers.token);
            } else if (process.env.NODE_ENV !== 'development') {
                delToken();
                window.location.href = "/#/login"
            }
        }
    }
}
let api = new Api();
export default api;