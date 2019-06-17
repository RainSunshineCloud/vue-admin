import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import iView from 'iview'
// import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import {getToken,delToken,getHomeRoute,setTagNavList,getPermession} from '@/libs/util.js'
import VueClipboard from 'vue-clipboard2'
import Layout from '@/view/layout'
import api from '@/api/permession.js'
import Permession from '@/router/permession'
import global from '@/global.js'

Vue.use(VueRouter)
Vue.use(VueClipboard)


const router = new VueRouter({
    routes 
})
Vue.prototype.$DynamicRoutes = {
    unRegister:true,
    routes: []
}

Vue.prototype.$config = config
Vue.prototype.$message = iView.Message;

//全局变量
global.set('homeRoute',getHomeRoute(routes, config.homeName))
global.set('tagNavList',setTagNavList(global.get('homeRoute')))
global.set('dynamicRoutes',{
    unRegister:true,
    routes: []
})




Vue.use(iView, {
    // i18n: (key, value) => i18n.t(key, value)
})




Vue.config.productionTip = false
importDirective(Vue)



router.beforeEach( (to,from,next) => {
    switch (getToken()) {
        case false:
            if (to.path != '/login') {
                next({path:'/login'});
                return;
            }
            break;
        default:
            //权限控制
            if (global.get('dynamicRoutes').unRegister && config.hasPermession) {
                getPermession(api.post('permession/getPage'),router,Permession,(res) => {
                    if (res) {
                        next({path:config.homeName});
                    } else {
                        next({name:'page401'})
                    }
                })
                
                next({name:config.waitPageName});
                return;
            }
            if (to.matched.length == 0 && to.path != '/') { //未有匹配
                next({name:config.homeName});
                return;
            } 
    }

    next();
    
});


new Vue({
    el: '#app',
    router,
    // i18n,
    render: h => h(App),
})




