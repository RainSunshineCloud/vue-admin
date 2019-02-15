import HttpRequest from '@/libs/axios'
import config from '@/config'
import {getToken} from '@/libs/util'

class Api
{
    constructor () {
        let config_all = Object.assign({},config.apiConf,this.configs());
        return new HttpRequest(config_all,this.commonThen,this.commonCatch,this.middles());
    }

    configs () {
        return {
            headers: {
                'token': getToken(),
            }
           
        }
    }
    commonThen (req) {
        if (req.data.code) {
            return Promise.resolve({status:1,req});
        } else {
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
            req:{success:[],error:[]},
            res:{success:[this.cookieMiddle],error:[]},
        }
    }
    cookieMiddle (){
    }
}
let api = new Api();
export default api;