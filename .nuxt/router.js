import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3ccae594 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _fb5db26e = () => interopDefault(import('../pages/index/start.vue' /* webpackChunkName: "pages/index/start" */))
const _397b0072 = () => interopDefault(import('../pages/index/contact.vue' /* webpackChunkName: "pages/index/contact" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/de",
    component: _3ccae594,
    name: "index___de",
    children: [{
      path: "anfang",
      component: _fb5db26e,
      name: "index-start___de"
    }, {
      path: "kontakt",
      component: _397b0072,
      name: "index-contact___de"
    }]
  }, {
    path: "/en",
    component: _3ccae594,
    name: "index___en",
    children: [{
      path: "contact-us",
      component: _397b0072,
      name: "index-contact___en"
    }, {
      path: "start",
      component: _fb5db26e,
      name: "index-start___en"
    }]
  }, {
    path: "/",
    component: _3ccae594,
    name: "index___pl",
    children: [{
      path: "kontakt",
      component: _397b0072,
      name: "index-contact___pl"
    }, {
      path: "wjazd",
      component: _fb5db26e,
      name: "index-start___pl"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
