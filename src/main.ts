import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.min.css";

Vue.config.productionTip = false;

Vue.use(VueIziToast, { timeout: 1500, close: false });
Vue.use(require("vue-moment"));

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
