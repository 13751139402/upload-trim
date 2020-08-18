import Vue from 'vue'
import App from './App.vue'
import "./assets/iconfont"
import svgIcon from "./components/svgIcon.vue"
Vue.config.productionTip = false
Vue.component("svg-icon",svgIcon)
new Vue({
  render: h => h(App),
}).$mount('#app')