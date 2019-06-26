import Vue from 'vue'
import App from './App.vue'
import VueMoment from 'vue-moment';
import VueClipboard from 'vue-clipboard2'
import VueYoutubeEmbded from 'vue-youtube-embed'
Vue.config.productionTip = false


Vue.use(VueYoutubeEmbded)
Vue.use(VueMoment)
Vue.use(VueClipboard)

new Vue({
  render: h => h(App),
}).$mount('#app')
