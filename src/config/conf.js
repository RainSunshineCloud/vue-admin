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
    useI18n: false,

    devApiConfig: {
        baseURL: 'http://vm.blog.com/admin',
        timeout: 100000,
        withCredentials: true,
        responseType: 'json',
    },
    proApiConfig : {
        baseURL: 'http://vm.blog.com/admin',
        timeout: 30000,
        withCredentials: true,
        responseType: 'json',
    },
    /**
    * @description 默认打开的首页的路由name值，默认为home
    */
    homeName: 'api_index',
}
