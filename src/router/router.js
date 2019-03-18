const Default = { template: "<router-view></router-view>"}

export default [
	{
		path: '/',
		name: '接口管理',
		meta: {
		    hideInMenu: false,
		    title: '接口管理',
		    notCache: true,
		    icon: 'md-people'
		},
		component: Default,
		children:[
		    {
		        path: '/',
		        name: 'api_index',
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
		        name: 'api_user',
		        meta: {
		            hideInMenu: false,
		            title: '计划人员',
		            notCache: true,
		            icon: 'md-people'
		        },
		        component: () => import('@/view/api/user.vue')
		    }
		],

	},
	{
        path: '/user',
        name: '用户模块',
        component: Default,
        meta: {
            hideInMenu: false,
            notCache: true,
        },
        children: [
            {
                path: '/user_index',
                name: '管理员',
                meta: {
                    hideInMenu: false,
                    title: '管理员',
                    notCache: true,
                    icon: 'md-people'
                },
                component: () => import('@/view/user/index')
            }
        ]
    },
        {
        path: '/data',
        name: '数据管理',
        component: Default,
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
            },
            {
                path: '/data_plan_res',
                name: '计划结果数据',
                meta: {
                    hideInMenu: false,
                    title: '计划结果数据',
                    notCache: true,
                    icon: 'md-people'
                },
                component: () => import('@/view/data/plan_res.vue')
            }
        ]
    },
    {
        path: '/sql',
        name: '数据库',
        component: Default,
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






