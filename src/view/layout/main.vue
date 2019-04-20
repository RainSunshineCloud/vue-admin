<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
            <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
                <div class="logo-con">
                    <!-- <img v-show="!collapsed" :src="maxLogo" key="max-logo" /> -->
                    <!-- <img v-show="collapsed" :src="minLogo" key="min-logo" /> -->
                    <h1 class="main_title" v-show="!collapsed">管理端</h1>
                    <h3 class="main_title" v-show="collapsed" >管理端</h3>
                 
                </div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <header-bar :collapsed="collapsed" :breadCrumbList="breadCrumbList" @on-coll-change="handleCollapsedChange">
                    <user :user-avator="userAvator"/>
                    <language v-if="$config.useI18n" @on-lang-change="setLocals" style="margin-right: 10px;" :lang="local"/>
                    <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
                </header-bar>
            </Header>
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <div class="tag-nav-wrapper">
                        <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
                    </div>
                    <Content class="content-wrapper">
                        <keep-alive :include="cacheList">
                            <router-view/>
                        </keep-alive>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import { getNewTagList, addTag,setTagNavList,setLocal,getNextRoute,delTagNavList, routeEqual,getMenuByRouter,getBreadCrumbList,getHomeRoute} from '@/libs/util'
import routers from '@/router/index'
// import minLogo from '@/assets/images/logo-min.jpg'
// import maxLogo from '@/assets/images/logo.jpg'
import './main.less'
export default {
    name: 'Main',
    components: {
        SideMenu,
        HeaderBar,
        Language,
        TagsNav,
        Fullscreen,
        User
    },
    props:{
        userAvator : {
            type:String,
            default:""
        },
        local:{
            type:String,
            default:"中文简体"
        }

    },

    data () {
        return {
            collapsed: false,
            // minLogo,
            // maxLogo,
            breadCrumbList:[],
            tagNavList:[],
            isFullscreen: false
        }
    },
    computed: {
        cacheList () {
            return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
        },
        menuList () {
            return getMenuByRouter(routers,"");
        }
    },
    methods: {
        turnToPage (route) {
            let { name, params, query } = {}
            if (typeof route === 'string') name = route
            else {
                name = route.name
                params = route.params
                query = route.query
            }
            if (name.indexOf('isTurnByHref_') > -1) {
                window.open(name.split('_')[1])
                return
            }
            this.$router.push({
                name,
                params,
                query
            })
        },
        handleCollapsedChange (state) {
            this.collapsed = state
        },
        handleCloseTag (res, type, route) {
            if (type === 'all') {
                this.turnToPage(this.$config.homeName)
                this.tagNavList = [this.$homeRoute];
                this.tagNavList = delTagNavList(route.name,this.tagNavList,3)
            } else if (routeEqual(this.$route, route)) {
                if (type !== 'others') {
                  const nextRoute = getNextRoute(this.tagNavList, route,this.$config.homeName)
                  this.$router.push(nextRoute)
                  this.tagNavList = delTagNavList(route.name,this.tagNavList,1)
                } else {
                    this.tagNavList = delTagNavList(route.name,this.tagNavList,2)
                }
            }
        },
        handleClick (item) {
            this.turnToPage(item)
        },
        setLocals (item) {
            setLocal(item)
        }
    },
    watch: {
        '$route' (newRoute) {
            console.log(newRoute);
            const { name, query, params, meta } = newRoute
            this.tagNavList = addTag(this.tagNavList,newRoute,{
                route: { name, query, params, meta },
                type: 'push'
            })

            this.breadCrumbList = getBreadCrumbList(newRoute,this.homeRoute)
            this.$refs.sideMenu.updateOpenName(newRoute.name)
        },
        tagNavList (new_data) {
            this.$tagNavList = new_data;
        }
    },
    mounted () {
        this.homeRoute = this.$homeRoute;
        this.tagNavList = this.$tagNavList;
        this.tagNavList = addTag(this.tagNavList,this.$config.homeName,{
            route: this.homeRoute
        })

        this.breadCrumbList = getBreadCrumbList(this.$route, this.homeRoute)
        // 如果当前打开页面不在标签栏中，跳到homeName页
        if (!this.tagNavList.find(item => item.name === this.$route.name)) {
            this.$router.push({
                name: this.$config.homeName
            })
        }
    }
}
</script>
<style>
.main_title {
    line-height: 44px;
    /*color:white;*/
    color: transparent;
    background-image: -webkit-gradient(linear,1 0, 0 bottom, from(#ff9f6a), to(#ffe57f));
    -webkit-background-clip: text;
    -webkit-text-stroke: 1px green;
    overflow-x: hidden;
    white-space:nowrap;
    text-align: center;
}
</style>
