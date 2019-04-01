import Vue from 'vue'
import Router from 'vue-router'
import Ebook from '@/components/ebook/Ebook'
import Shelf from '@/components/shelf/index'
import Find from '@/components/find/index'
import Idea from '@/components/idea/index'
import My from '@/components/my/index'
import NavBar from '@/components/NavBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/navBar'
    },
    {
      path: '/ebook/:id',
      component: Ebook
    },
    {
      path: '/navBar',
      component: NavBar,
      children: [
        {
          path: '',
          component: Shelf
        },
        {
          path: '/shelf',
          component: Shelf
        },
        {
          path: '/find',
          component: Find
        },
        {
          path: '/idea',
          component: Idea
        },
        {
          path: '/my',
          component: My
        }
      ]
    }
  ]
})
