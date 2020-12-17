import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3ccae594 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _60b6e9f9 = () => interopDefault(import('../pages/index/gallery.vue' /* webpackChunkName: "pages/index/gallery" */))
const _397b0072 = () => interopDefault(import('../pages/index/contact.vue' /* webpackChunkName: "pages/index/contact" */))
const _deb5d4e0 = () => interopDefault(import('../pages/index/reservations.vue' /* webpackChunkName: "pages/index/reservations" */))
const _fb5db26e = () => interopDefault(import('../pages/index/start.vue' /* webpackChunkName: "pages/index/start" */))

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
      path: "galerie",
      component: _60b6e9f9,
      name: "index-gallery___de"
    }, {
      path: "kontakt",
      component: _397b0072,
      name: "index-contact___de"
    }, {
      path: "reservieren",
      component: _deb5d4e0,
      name: "index-reservations___de"
    }, {
      path: "start",
      component: _fb5db26e,
      name: "index-start___de"
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
      path: "gallery",
      component: _60b6e9f9,
      name: "index-gallery___en"
    }, {
      path: "reservations",
      component: _deb5d4e0,
      name: "index-reservations___en"
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
      path: "galeria",
      component: _60b6e9f9,
      name: "index-gallery___pl"
    }, {
      path: "kontakt",
      component: _397b0072,
      name: "index-contact___pl"
    }, {
      path: "rezerwacja",
      component: _deb5d4e0,
      name: "index-reservations___pl"
    }, {
      path: "start",
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
