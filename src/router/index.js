import Vue from 'vue'
import Router from 'vue-router'
import Update from '@/components/Update'
import Error from '@/components/Error'
import LarkPage from '@/components/LarkPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
})
