/* Copyright (C) Jang Haemin(@jhaemin) - All Rights Reserved
 * Written by Jang Haemin <io@jhaemin.com>, 2019
 */

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