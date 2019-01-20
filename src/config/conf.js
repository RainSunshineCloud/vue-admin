export default {
    /**
    * @description token在Cookie中存储的天数，默认1天
    */
    cookieKey:'token',
    cookieExpires: 1,
    /**
    * @description 是否使用国际化，默认为false
    *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
    *              用来在菜单中显示文字
    */
    useI18n: true,

    devApiConfig: {
        baseURL: 'http://vm.test.com/git',
        timeout: 100000,
        withCredentials: false,
        // adapter: function (config){console.log(config);},
        responseType: 'json',
    },
    proApiConfig : {
        baseURL: 'https://produce.com',
        timeout: 3000,
        withCredentials: false,
        responseType: 'json',
    },
    /**
    * @description 默认打开的首页的路由name值，默认为home
    */
    homeName: 'home',
}
