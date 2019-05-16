import Vue from 'vue'
import App from 'Components/App'
import 'Styles/globalstyle'

window.onload = () => {
  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
  })
}