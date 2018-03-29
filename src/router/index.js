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
        },
        {
          path: '/recruit-manager-data',
          component: resolve => require(['../components/pages/recruit-manager/data/recruit-manager.vue'], resolve)
        },
        {
          path: '/recruit-manager-check',
          component: resolve => require(['../components/pages/recruit-manager/check/recruit-check.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/login/login.vue'], resolve)
    }
  ]
})
