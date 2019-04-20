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
import {getToken,delToken,getHomeRoute,setTagNavList} from '@/libs/util.js'
import VueClipboard from 'vue-clipboard2'
import Layout from '@/view/layout'
import Main from '@/router/router.js'
import api from '@/api/api.js'

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

//登录及权限控制
router.beforeEach( (to,from,next) => {
    const that = Vue.prototype;
    switch (getToken()) {
        case false:
            if (to.path != '/login') {
                next({path:'/login'});
                return;
            } 
            break;
        default:
            if (that.$DynamicRoutes.unRegister) {
                api.post('user/list').then((data) => {
                    that.$DynamicRoutes = {
                        unRegister:false,
                        routes: [{
                            path:'/',
                            type:'layout',
                            component: Layout,
                            props: {
                                userAvator:"图像"
                            },
                            children: Main,
                        }]
                    };
                    router.addRoutes(that.$DynamicRoutes.routes);
                    router.options.routes.push(...that.$DynamicRoutes.routes);
                    that.$homeRoute = getHomeRoute(router.options.routes, that.$config.homeName)
                    that.$tagNavList = setTagNavList(that.$homeRoute);
                    next({name:config.homeName});
                }).catch((data) => {
                    next({name:'page401'});
                });
                that.$DynamicRoutes.unRegister = false;
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


Vue.use(iView, {
    // i18n: (key, value) => i18n.t(key, value)
})




Vue.config.productionTip = false
importDirective(Vue)

new Vue({
    el: '#app',
    router,
    // i18n,
    render: h => h(App),
})


