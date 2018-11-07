import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import http from '@/libs/http.js'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'

Vue.use(VueRouter)
const router = new VueRouter({
    routes 
})

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$message = iView.Message;
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.prototype.$config = config
importDirective(Vue)

new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: h => h(App)
})
