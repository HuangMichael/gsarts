import Login from '../components/index/views/Login.vue'
import Work from '../components/index/views/workPlatform/index.vue'
import NotFound from '../components/index/views/404.vue'
import Home from '../components/index/views/Home.vue'
import Table from '../components/index/views/nav1/Table.vue'
import Role from '../components/index/views/role/index.vue'
import User from '../components/index/views/user/index.vue'
import ECharts from '../components/index/views/charts/echarts.vue'
import Person from '../components/index/views/person/index.vue'
import Unit from '../components/index/views/unit/index.vue'

import Columns from '../components/index/views/columns/index.vue'
import RegAudit from '../components/index/views/regAudit/index.vue'
import Member from '../components/index/views/member/index.vue'
import MemberWorks from '../components/index/views/memberWorks/index.vue'
import PavilionAuthor from '../components/index/views/pavilionAuthor/index.vue'
import PavilionWorks from '../components/index/views/pavilionWorks/index.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routers = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login,
            name: '',
            hidden: true
        },
        {
            path: '/404',
            component: NotFound,
            name: '',
            hidden: true
        },


        {
            path: '/',
            component: Home,
            name: '工作台',
            iconCls: 'fa fa-bar-chart',
            children: [
                {path: '/work', component: Work, name: '工作管理'}
            ]
        },

        {
            path: '/',
            component: Home,
            name: '系统管理',
            iconCls: 'fa fa-bar-chart',
            children: [
                {path: '/unit', component: Unit, name: '单位管理'},
                {path: '/user', component: User, name: '用户管理'},
                {path: '/role', component: Role, name: '角色管理'},
                {path: '/regAudit', component: RegAudit, name: '注册审核'}
            ]
        },
        {
            path: '/',
            component: Home,
            name: '站点管理',
            iconCls: 'fa fa-bar-chart',
            children: [
                {path: '/columns', component: Columns, name: '栏目管理'},
                {path: '/content', component: Columns, name: '内容管理'},
                {path: '/user', component: User, name: '弹窗飘窗管理'},
                {path: '/role', component: Role, name: '回收站'},
                {path: '/auth', component: User, name: '建言信息管理'},
                {path: '/portal', component: ECharts, name: '发稿统计'}
            ]
        },
        {
            path: '/member',
            component: Home,
            name: '会员中心',
            iconCls: 'el-icon-message',//图标样式class
            children: [
                {path: '/profile', component: Member, name: '会员简介'},
                {path: '/works', component: MemberWorks, name: '会员作品'}
            ]
        },
        {
            path: '/baseData',
            component: Home,
            name: '网上展馆',
            iconCls: 'fa fa-id-card-o',
            children: [
                {path: '/pavilionAuthor', component: PavilionAuthor, name: '展馆作者'},
                {path: '/pavilionWorks', component: PavilionWorks, name: '展馆作品'}
            ]
        },

        {
            path: '/dispatch',
            component: Home,
            name: '审核发布',
            iconCls: 'fa fa-id-card-o',
            children: [
                {path: '/firstAudit', component: Table, name: '初审列表'},
                {path: '/secondAudit', component: Table, name: '复审列表'},
                {path: '/dispatchList', component: Table, name: '发布列表'},
            ]
        },
        {
            path: '/setting',
            component: Home,
            name: '系统配置',
            iconCls: 'fa fa-address-card',
            children: [
                {path: '/ftp', component: Table, name: 'FTP设置'},
                {path: '/interface', component: Table, name: '接口设置'},
                {path: '/media', component: Table, name: '多媒体设置'}
            ]
        }
    ]
})

export default routers;