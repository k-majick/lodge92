export { default as Header } from '../../components/header.vue'
export { default as Loading } from '../../components/loading.vue'
export { default as Nav } from '../../components/nav.vue'

export const LazyHeader = import('../../components/header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c)
export const LazyLoading = import('../../components/loading.vue' /* webpackChunkName: "components/loading" */).then(c => c.default || c)
export const LazyNav = import('../../components/nav.vue' /* webpackChunkName: "components/nav" */).then(c => c.default || c)
