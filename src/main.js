import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from './plugins/axios.js'
import VueAxios from 'vue-axios'
import VueScrollLock from 'vue-scroll-lock'

import 'https://webusstatic.yo-star.com/ark_jp_web/pc/css/app.690139fa.css'
import utils from './plugins/utils.js'

Vue.use(VueScrollLock)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.prototype.$utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
