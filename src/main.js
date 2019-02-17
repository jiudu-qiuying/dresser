import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import VueTouch from 'vue-touch'
import './assets/iconfont/iconfont.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueTouch,{name:'v-touch'})
new Vue({
  render: h => h(App),
}).$mount('#app')
