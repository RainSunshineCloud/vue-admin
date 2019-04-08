const Default = { template: "<router-view></router-view>"}

export default [
    {
        path: '/sql',
        name: '/sql',
        component: Default,
        meta: {
            hideInMenu: false,
            title: '数据库',
            notCache: true,
        },
        children: [
            {
                path: '/sql_index',
                name: '/sql_index',
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
    {
        path: '/user',
        name: '/user',
        component: Default,
        meta: {
            hideInMenu: false,
            title: '用户管理',
            notCache: true,
        },
        children: [
            {
                path: '/user_list',
                name: 'user_list',
                meta: {
                    hideInMenu: false,
                    title: '用户列表',
                    notCache: true,
                    icon: 'md-people'
                },
                component: () => import('@/view/user/list.vue')
            }
        ]
    },
    {
        path: '/config',
        name: '其他配置',
        component: Default,
        meta: {
            hideInMenu: false,
            title: '数据库',
            notCache: true,
        },
        children: [
            {
                path: '/config_index',
                name: '参数配置',
                meta: {
                    hideInMenu: false,
                    title: '参数配置',
                    notCache: true,
                    icon: 'md-people'
                },
                component: () => import('@/view/config/index.vue')
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
    // },
	// {
	//     path: '/',
 //        name: 'layouts',
 //        component: Default,
 //        meta: {
 //            hideInMenu: false,
 //            notCache: true,
 //        },
 //        children: [
 //            {
 //                path: '/',
 //                name: 'home',
 //                meta: {
 //                    hideInMenu: false,
 //                    title: '首页',
 //                    notCache: true,
 //                    icon: 'md-home'
 //                },
 //                component: () => import('@/view/home')
 //            }
 //        ]
 //    },

];






