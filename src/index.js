import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import App from './App.vue';
import Home from './Home.vue';

import ReportService from './report-service.js';

Vue.use(VueRouter);
Vue.use(Buefy);

const reportService = new ReportService();

const router = new VueRouter({
  routes: [ {
    path: '/',
    name: 'home',
    component: Home,
    props: (route) => ({
      reportService,
    }),
  } ]
});

new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
