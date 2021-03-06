// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'

import waterfall from 'vue-waterfall2'


/**
 * url地址配置
 */
import url from '@/server'
//引入公共js https://www.cnblogs.com/CinderellaStory/p/11512274.html
import dateFormate from './js/DateFormate'
Vue.prototype.$dateFormate=dateFormate;
Vue.prototype.$url = url;


Vue.use(waterfall);

// import VueMasonryPlugin from 'vue-masonry';

Vue.use(ElementUI);
Vue.use(Vuex);

Vue.config.productionTip = false;

// Vue.use(VueResouse);
// Vue.use(VueMasonryPlugin);


const store = new Vuex.Store({
  state: {
    userId: 0,
    userName: '',
    mutations: {

      setUser(state, obj) {
        state.userId = obj.userId;
        state.userName = obj.userName;
      },
    },
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
// new Vue({
//   el: '#app',
//   router,
//   render: h => h(Navi)
// })

// router.beforeEach((to, from, next) => {
//   // if (to.name === 'login') {
//   //   return next();
//   // }
//   let session = sessionStorage.getItem("session");
//   if (to.meta.requireAuth) {
//     if (!session) {
//       $.ajax({
//         xhrFields: {
//           withCredentials: true
//         },
//         type: 'get',
//         url: process.env.API_BASE_URL + "/admin_user/isLogin",
//         success: function (res) {
//           if (res.code === 0) {
//             if (res.data) {
//               store.commit('setUser', {userId: res.data.id, userName: res.data.name})
//               sessionStorage.setItem("session", '1111111');
//               return next({path: '/Home'});
//             } else {
//               return next({path: '/?path=' + to.path})
//             }
//           }
//           return next({path: '/?path=' + to.path})
//         },
//         error: function () {
//           return next({path: '/?path=' + to.path})
//         }
//       });
//     }
//   } else {
//     if (session && to.name === 'login') {
//       return next({path: `/?path=${to.path}`});
//     } else {
//       return next({path: '/Home'});
//     }
//   }
//   next();
// });
