import axios from 'axios'

class HttpRequest 
{
  	constructor (config,commonThen,commonCatch,middles) {
	    this.config = config;
	    this.commonThen = commonThen;
	    this.commonCatch = commonCatch;
	    this.middles = middles
  	}

  	getInsideConfig () {
    	return this.config;
  	}

  	interceptors (instance,url) {
    	// 请求拦截
	    instance.interceptors.request.use(config => {
	      	for (let key in this.middles.req.success) {
            
	      		this.middles.req.success[key](instance,url,config);
	      	}
	      
	      	return config
	    }, error => {
	    	for (let key in this.middles.req.error) {
	      		this.middles.req.success[key](instance,url,error);
	      	}
	      	return Promise.reject(error)
	    })
	    // 响应拦截
	    instance.interceptors.response.use(res => {
	      	for (let key in this.middles.res.success) {
	      		this.middles.res.success[key](instance,url,res);
	      	}
	      	const { data, status } = res
	      	return { data, status }
	    }, error => {
	      	let errorInfo = error.response
	      	for (let key in this.middles.res.error) {
	      		this.middles.res.success[key](instance,url,error);
	      	}
	      	return Promise.reject(error)
	    })
  	}
  	
  	req (url,method,options) {
  		options = options || {};
	    const instance = axios.create()
	    options = Object.assign({},this.getInsideConfig(), options,{url:url},{method:method})
	    this.interceptors(instance, url)

	    return instance(options).then(req => {
  			return this.commonThen(req);
  		}).catch((error) => {
  			return this.commonCatch(error);
  		});
  	}

  	post (url,data,options) {
  		options = Object.assign({data:data},options);
  		return this.req(url,'post',options)
  	}
  	get (url,data,options) {
  		options = Object.assign({params:data},options);
  		return this.req(url,'get',options)
  	}
  	delete (url,options) {
  		return this.req(url,'delete',options)
  	}
  	head (url,options) {
  		return this.req(url,'head',options)
  	}
  	put (url,data,options) {
  		options = Object.assign({data:data},options);
  		return this.req(url,'put',options)
  	}
  	patch (url,data,options) {
  		options = Object.assign({data:data},options);
  		return this.req(url,'patch',options);
  	}
}
export default HttpRequest