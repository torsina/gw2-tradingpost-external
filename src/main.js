import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './plugins/vuex';
import router from './plugins/router'

Vue.config.productionTip = false;


var app = new Vue({ // eslint-disable-line
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
