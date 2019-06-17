import Layout from '@/view/layout'
const Default = { template: "<router-view></router-view>"}
//需要权限的路由
const router = [
    {
        path: '/article',
        name: '文章模块',
        component: Default,
        meta: {
            notCache: true,
            title: '文章模块',
        },
        children: [
            {
                path: '/article_index',
                name: 'article_index',
                meta: {
                    title: 'markdown编辑器',
                    icon: 'md-article'
                },
                component: () => import('@/view/article/edit')
            },
            {
                path: '/article_tinymce',
                name: 'article_tinymce',
                meta: {
                    title: '富文本编辑器',
                    icon: 'md-article'
                },
                component: () => import('@/view/article/tinymce')
            }
        ]
    },
    {
        path: '/permession',
        name: 'permession',
        component: Default,
        meta: {
            notCache: true,
            title: '权限模块',
        },
        children: [
            {
                path: '/permession_user_permession',
                name: 'permession_user_permession',
                meta: {
                    title: '用户权限管理',
                    icon: 'md-article'
                },
                component: () => import('@/view/permession/user_permession')
            },
            {
                path: '/permession_user_role',
                name: 'permession_user_role',
                meta: {
                    title: '用户角色管理',
                    icon: 'md-article'
                },
                component: () => import('@/view/permession/user_role')
            },
            {
                path: '/permession_permession_role',
                name: 'permession_permession_role',
                meta: {
                    title: '角色权限管理',
                    icon: 'md-article'
                },
                component: () => import('@/view/permession/permession_role')
            },
            {
                path: '/permession_permession',
                name: 'permession_permession',
                meta: {
                    title: '权限管理',
                    icon: 'md-article'
                },
                component: () => import('@/view/permession/permession')
            },
            {
                path: '/permession_role',
                name: 'permession_role',
                meta: {
                    title: '角色管理',
                    icon: 'md-article'
                },
                component: () => import('@/view/permession/role')
            },
            {
                path: '/permession_zone',
                name: 'permession_zone',
                meta: {
                    title: '角色作用域管理',
                    icon: 'md-article'
                },
                component: () => import('@/view/permession/zone')
            }
        ]
    }

];

export default [{
    path:'/',
    type:'layout',
    component: Layout,
    props: {
        userAvator:"图像"
    },
    children: router
}];






