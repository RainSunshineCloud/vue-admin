import Main from '@/view/layout'

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
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true,
        },
        component: () => import('@/view/login/login.vue')
    },
    // {
    //     path: '/',
    //     name: 'layouts',
    //     component: Main,
    //     meta: {
    //         hideInMenu: false,
    //         notCache: true,
    //     },
    //     children: [
    //         {
    //             path: '/',
    //             name: 'home',
    //             meta: {
    //                 hideInMenu: false,
    //                 title: '首页',
    //                 notCache: true,
    //                 icon: 'md-home'
    //             },
    //             component: () => import('@/view/home')
    //         }
    //     ]
    // },
    // {
    //     path: '/user',
    //     name: '用户模块',
    //     component: Main,
    //     meta: {
    //         hideInMenu: false,
    //         notCache: true,
    //     },
    //     children: [
    //         {
    //             path: '/user_index',
    //             name: '管理员',
    //             meta: {
    //                 hideInMenu: false,
    //                 title: '管理员',
    //                 notCache: true,
    //                 icon: 'md-people'
    //             },
    //             component: () => import('@/view/user/index')
    //         }
    //     ]
    // },
    {
        path: '/api',
        name: '接口管理',
        component: Main,
        meta: {
            hideInMenu: false,
            title: '接口管理',
            notCache: true,
        },
        children: [
            {
                path: '/api_index',
                name: '接口配置',
                meta: {
                    hideInMenu: false,
                    title: '接口配置',
                    notCache: true,
                    icon: 'md-people'
                },
                component: () => import('@/view/api/index.vue')
            },
            {
                path: '/api_user',
                name: '计划人员',
                meta: {
                    hideInMenu: false,
                    title: '计划人员',
                    notCache: true,
                    icon: 'md-people'
                },
                component: () => import('@/view/api/user.vue')
            }
        ]
    },
    {
        path: '/data',
        name: '数据管理',
        component: Main,
        meta: {
            hideInMenu: false,
            title: '数据管理',
            notCache: true,
        },
        children: [
            {
                path: '/data_plan',
                name: '计划管理',
                meta: {
                    hideInMenu: false,
                    title: '计划管理',
                    notCache: true,
                    icon: 'md-people'
                },
                component: () => import('@/view/data/plan.vue')
            },
            {
                path: '/data_res',
                name: '结果数据',
                meta: {
                    hideInMenu: false,
                    title: '结果数据',
                    notCache: true,
                    icon: 'md-people'
                },
                component: () => import('@/view/data/res.vue')
            }
        ]
    },
    {
        path: '/sql',
        name: '数据库',
        component: Main,
        meta: {
            hideInMenu: false,
            title: '数据库',
            notCache: true,
        },
        children: [
            {
                path: '/sql_index',
                name: 'sql执行',
                meta: {
                    hideInMenu: false,
                    title: 'sql执行',
                    notCache: true,
                    icon: 'md-people'
                },
                component: () => import('@/view/sql/index.vue')
            }
        ]
    },
    // {
    //     path: '/article',
    //     name: '文章模块',
    //     component: Main,
    //     meta: {
    //         notCache: true,
    //         title: '文章模块',
    //     },
    //     children: [
    //         {
    //             path: '/article_index',
    //             name: 'markdown编辑器',
    //             meta: {
    //                 title: 'markdown编辑器',
    //                 icon: 'md-article'
    //             },
    //             component: () => import('@/view/article/edit')
    //         },
    //         {
    //             path: '/article_tinymce',
    //             name: '富文本编辑器',
    //             meta: {
    //                 title: '富文本编辑器',
    //                 icon: 'md-article'
    //             },
    //             component: () => import('@/view/article/tinymce')
    //         }
    //     ]
    // }

]
