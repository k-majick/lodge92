export { default as Calendar } from '../../components/Calendar.vue'
export { default as CalendarDateIndicator } from '../../components/CalendarDateIndicator.vue'
export { default as CalendarDateSelector } from '../../components/CalendarDateSelector.vue'
export { default as Footer } from '../../components/Footer.vue'
export { default as Header } from '../../components/Header.vue'
export { default as Loading } from '../../components/Loading.vue'
export { default as Nav } from '../../components/Nav.vue'
export { default as Slider } from '../../components/Slider.vue'

export const LazyCalendar = import('../../components/Calendar.vue' /* webpackChunkName: "components/Calendar" */).then(c => c.default || c)
export const LazyCalendarDateIndicator = import('../../components/CalendarDateIndicator.vue' /* webpackChunkName: "components/CalendarDateIndicator" */).then(c => c.default || c)
export const LazyCalendarDateSelector = import('../../components/CalendarDateSelector.vue' /* webpackChunkName: "components/CalendarDateSelector" */).then(c => c.default || c)
export const LazyFooter = import('../../components/Footer.vue' /* webpackChunkName: "components/Footer" */).then(c => c.default || c)
export const LazyHeader = import('../../components/Header.vue' /* webpackChunkName: "components/Header" */).then(c => c.default || c)
export const LazyLoading = import('../../components/Loading.vue' /* webpackChunkName: "components/Loading" */).then(c => c.default || c)
export const LazyNav = import('../../components/Nav.vue' /* webpackChunkName: "components/Nav" */).then(c => c.default || c)
export const LazySlider = import('../../components/Slider.vue' /* webpackChunkName: "components/Slider" */).then(c => c.default || c)
