import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Ads from 'vue-google-adsense';
import VueAnalytics from 'vue-analytics'

import App from './App.vue';
import ModeTab from './ModeTab.vue';

// Buefy's Bulma components CSS will be purged in production!
// Add exceptions to webpack.config.js PurgecssPlugin

Vue.use(VueRouter);
Vue.use(Buefy);
Vue.use(require('vue-script2'));
Vue.use(Ads.Adsense);

const router = new VueRouter({
  routes: [ {
    path: '/',
    name: 'home',
    component: ModeTab,
  } ]
});

Vue.use(VueAnalytics, {
  id: 'UA-118868480-1',
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production',
    enabled: process.env.NODE_ENV !== 'production',
  }
});

new Vue({
  router,
  el: '#app',
  render: h => h(App),
  mounted: function() {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      this.$ga.event('PWA', 'started');
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        if (typeof registration.update == 'function') {
          this.$ga.event('PWA', 'update');
          registration.update();
        }
      });
    }
  },
});
