import Vue from 'vue'
import App from 'Components/App'
import 'Styles/globalstyle'
import 'Styles/spring.styl'

window.onload = () => {
  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
  })
}