import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login'
import index from '@/views/index'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/isLogin',
    //   name: 'isLogin',
    //   component: isLogin
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
  ]
})
