import Vue from 'vue'
import Router from 'vue-router'
import Ebook from '@/Ebook'
import Book from '@/Book'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Book'
    },
    {
      path: '/ebook/:id',
      component: Ebook
    },
    {
      path: '/Book',
      component: Book
    }
  ]
})
