import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/menu',
      component: resolve => require(['../components/commons/Home.vue'], resolve),
      children:[
        {
          path: '/homePage',
          component: resolve => require(['../components/pages/homepage.vue'], resolve)
        },
        {
          path: '/fileController',
          component: resolve => require(['../components/pages/filecontroller.vue'], resolve)
        },
        {
          path: '/menu-manager',
          component: resolve => require(['../components/pages/menu-manager/menu-manager.vue'], resolve)
        },
        {
          path: '/role-manager',
          component: resolve => require(['../components/pages/role-manager/role-manager.vue'], resolve)
        },
        {
          path: '/user-manager',
          component: resolve => require(['../components/pages/user-manager/user-manager.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/login/login.vue'], resolve)
    }
  ]
})
