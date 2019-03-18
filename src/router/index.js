import Layout from '@/view/layout'
import Main from '@/router/router.js'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */
const layouts = [
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'Login - 登录',
                hideInMenu: true,
            },
            component: () => import('@/view/login/login.vue')
        },
        {
            path:'/',
            type:'layout',
            component: Layout,
            props: {
                userAvator:"图像"
            },
            children: Main,
        }
];

export default layouts;
