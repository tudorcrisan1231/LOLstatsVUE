//window.Vue = require('vue');
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

let app = createApp(App);
app.config.globalProperties.lol_version = "12.1.1"; ///variabila globala cu versiunea jocului
app.use(router).mount("#app");
