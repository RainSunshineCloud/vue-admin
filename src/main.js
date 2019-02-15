import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import {getToken} from '@/libs/util.js'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueRouter)
Vue.use(VueClipboard)

const router = new VueRouter({
    routes 
})

router.beforeEach( (to,from,next) => {

	if (to.path != '/login' && !getToken()) {
		next({path:'/login'})
	}
	next()
});

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})


Vue.prototype.$message = iView.Message;
Vue.config.productionTip = false
Vue.prototype.$config = config
importDirective(Vue)

new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: h => h(App),
})
