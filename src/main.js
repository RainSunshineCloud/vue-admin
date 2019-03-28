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
Vue.use(VueRouter)
Vue.use(VueClipboard)

const router = new VueRouter({
    routes 
})

// router.beforeEach( (to,from,next) => {
//     if (to.matched.length == 0) { //未有匹配
//         next({name:config.homeName});
//     } else if (to.path != '/login' && !getToken()) { //未登陆
// 		next({path:'/login'})
// 	} else {
//         next()
//     } 
// });



Vue.use(iView, {
    // i18n: (key, value) => i18n.t(key, value)
})


Vue.prototype.$message = iView.Message;
Vue.prototype.$config = config
Vue.prototype.$homeRoute = getHomeRoute(routes, config.homeName)
Vue.prototype.$tagNavList = setTagNavList(Vue.prototype.$homeRoute)

Vue.config.productionTip = false
importDirective(Vue)

new Vue({
    el: '#app',
    router,
    // i18n,
    render: h => h(App),
})


