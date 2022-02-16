//window.Vue = require('vue');
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

let app = createApp(App);
app.config.globalProperties.lol_version = "12.4.1"; ///variabila globala cu versiunea jocului
app.config.globalProperties.nr_meciuri = 10; ///la cate meciuri se face request la sv
app.use(router).use(VueChartkick).mount("#app");
