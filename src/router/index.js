import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/navBar'
    },
    {
      path: '/ebook/:id',
      component: r =>
        require.ensure(
          [],
          () => r(require('@/components/ebook/Ebook')),
          'ebook'
        )
    },
    {
      path: '/navBar',
      component: r =>
        require.ensure([], () => r(require('@/components/NavBar')), 'navbar'),
      children: [
        {
          path: '',
          component: r =>
            require.ensure(
              [],
              () => r(require('@/components/shelf/index')),
              'shelf'
            )
        },
        {
          path: '/shelf',
          component: r =>
            require.ensure(
              [],
              () => r(require('@/components/shelf/index')),
              'shelf'
            )
        },
        {
          path: '/find',
          component: r =>
            require.ensure(
              [],
              () => r(require('@/components/find/index')),
              'find'
            )
        },
        {
          path: '/idea',
          component: r =>
            require.ensure(
              [],
              () => r(require('@/components/idea/index')),
              'idea'
            )
        },
        {
          path: '/my',
          component: r =>
            require.ensure([], () => r(require('@/components/my/index')), 'my')
        }
      ]
    }
  ]
})
