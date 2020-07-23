import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login'
import index from '@/views/index'
import WaterFollowPage from '@/views/WaterFollowPage'
import InfiniteLoading from '@/views/InfiniteLoading'
import indexDrawer from '@/views/drawer/indexDrawer'
import Order from '@/views/order/Order'
import DramaSeries from '@/Views/DramaSeries'

Vue.use(Router)
export const loadView = (view) => {
    return (resolve) => require([`@/views/${view}`], resolve)
};
export default new Router({
    routes: [
        // {
        //   path: '/',
        //   name: 'index',
        //   component: index
        // },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/WaterFollowPage',
            name: 'WaterFollowPage',
            component: WaterFollowPage
        },
        {
            path: '/InfiniteLoading',
            name: 'InfiniteLoading',
            component: InfiniteLoading
        },
        {
            path: '/indexDrawer',
            name: 'indexDrawer',
            component: indexDrawer
        },
        {
            path: '/Order',
            name: 'Order',
            component: Order
        },
        {
            path: '/DramaSeries',
            name: 'DramaSeries',
            component: DramaSeries
        },
    ]
})
