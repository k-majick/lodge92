export { default as Calendar } from '../../components/calendar.vue'
export { default as Footer } from '../../components/footer.vue'
export { default as Header } from '../../components/header.vue'
export { default as Loading } from '../../components/loading.vue'
export { default as Nav } from '../../components/nav.vue'
export { default as Slider } from '../../components/slider.vue'

export const LazyCalendar = import('../../components/calendar.vue' /* webpackChunkName: "components/calendar" */).then(c => c.default || c)
export const LazyFooter = import('../../components/footer.vue' /* webpackChunkName: "components/footer" */).then(c => c.default || c)
export const LazyHeader = import('../../components/header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c)
export const LazyLoading = import('../../components/loading.vue' /* webpackChunkName: "components/loading" */).then(c => c.default || c)
export const LazyNav = import('../../components/nav.vue' /* webpackChunkName: "components/nav" */).then(c => c.default || c)
export const LazySlider = import('../../components/slider.vue' /* webpackChunkName: "components/slider" */).then(c => c.default || c)
