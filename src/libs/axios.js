import axios from 'axios'
import store from '@/store'
import api from '@/interceptor/api/index.js'
import qs from 'qs'
import {getAxiosParams,hasKey} from '@/libs/tools.js'

class HttpRequest {
    constructor (baseUrl = baseURL) {
        this.baseUrl = baseUrl
    }

    interceptors (instance, url ,other_params,method) {
        // 请求拦截
        var tmp_config = getAxiosParams(api(),url) || {};
        instance.interceptors.request.use(config => {
            let params = tmp_config;
            config.data = config.data || {};
            other_params = other_params || {};
            if (method) {
                config.method = method
            } else if (hasKey(params,'method')) {
                config.method = params.method
            }

            if (hasKey(params,'header')) {
                config.headers = Object.assign(params.header,config.headers)
            }

            config.data = config.data || {};
            other_params = other_params || {};
            params.data = params.data || {};
            if (config.method == 'get') {  
                config.params = Object.assign(params.data,config.data,other_params)
            } else {
                config.data = Object.assign(params.data,config.data,other_params) 
            }

            if (hasKey(params,'transformRequestSuc') && typeof params.transformRequestSuc === 'function') {
               config = params.transformRequestSuc(config);
            }

            if (config.data && config.headers && config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1) {
                config.data = qs.stringify(config.data)
            }

            return config;
        }, error => {
            if (hasKey(params,'transformRequestErr') && typeof params.transformRequestErr === 'function') {
                error = params.transformRequestErr(error);
            }
                
            return Promise.reject(error)
            
        })

        // 响应拦截
        instance.interceptors.response.use(res => {
             let params = tmp_config;
            if (hasKey(params,'transformResponseSuc') && typeof params.transformResponseSuc === 'function') {
               config = params.transformResponseSuc(res);
            }

            this.destroy(url)
            const { data, status } = res
            return { data, status }
        }, error => {
            this.destroy(url)
            if (hasKey(params,'transformResponseErr') && typeof params.transformResponseErr === 'function') {
                error = params.transformResponseErr(error);
            }

            return Promise.reject(error)
        })
    }

    req (url,params,method,headers) {
        params = params || {};
        headers = headers || {};
        let options = {};
        options.url = url;
        options.headers = headers;
        options.baseURL = this.baseUrl
        let instance = axios.create()
        this.interceptors(instance,url,params,method)
        return instance(options);
    }

    get(url,params,headers) {
        return this.req(url,params,'get',headers)
    }

    post(url,params,headers) {
        return this.req(url,params,'post',headers)
    }
}

export default HttpRequest
