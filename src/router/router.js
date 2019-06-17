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
    }
];






