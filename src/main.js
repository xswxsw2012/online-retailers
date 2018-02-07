// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import IndexPage from './pages/index'
import DetailPage from './pages/detail'
import DetailAnaPage from './pages/detail/analysis'
import DetailCouPage from './pages/detail/count'
import DetailForPage from './pages/detail/forecast'
import DetailPubPage from './pages/detail/publish'
import OrderListPage from './pages/orderList'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

import Store from './store'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VCalendar)

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/orderList',
      component: OrderListPage
    },
    {
      path:'/detail',
      component: DetailPage,
      redirect: '/detail/count',
      children: [
        {
          path:'analysis',
          component: DetailAnaPage
        },
        {
          path:'count',
          component: DetailCouPage
        },
        {
          path:'forecast',
          component: DetailForPage
        },
        {
          path:'publish',
          component: DetailPubPage
        },
      ]
    }
  ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: Store,
  components: { Layout },
  template: '<Layout/>'
})
