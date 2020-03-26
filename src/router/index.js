import Vue from 'vue'
import Router from 'vue-router'
import Update from '@/components/Update'
import Error from '@/components/Error'
import LarkPage from '@/components/LarkPage'
import Login from '@/components/Login'
import Layout from '@/components/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Layout,
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/larkPage',
          name: 'LarkPage',
          component: LarkPage
        },
        {
          path: '/update',
          name: 'Update',
          component: Update
        },
        {
          path: '/error',
          name: 'Error',
          component: Error
        }
      ]
    }
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login
    // },
    // {
    //   path: '/larkPage',
    //   name: 'LarkPage',
    //   component: LarkPage
    // },
    // {
    //   path: '/update',
    //   name: 'Update',
    //   component: Update
    // },
    // {
    //   path: '/error',
    //   name: 'Error',
    //   component: Error
    // }
  ]
})
