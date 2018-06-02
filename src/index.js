import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Ads from 'vue-google-adsense';

import App from './App.vue';
import ModeTab from './ModeTab.vue';

Vue.use(VueRouter);
Vue.use(Buefy);
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)

const router = new VueRouter({
  routes: [ {
    path: '/',
    name: 'home',
    component: ModeTab,
  } ]
});

new Vue({
  router,
  el: '#app',
  render: h => h(App),
  mounted: function() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  },
});
