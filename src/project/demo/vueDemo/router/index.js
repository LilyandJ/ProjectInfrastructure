import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: '../',
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/Demo.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 访问不存在的路由
  if (!to.name) {
    let to = { path: from.path }
    return next(to)
  }
  next()
})

export default router
