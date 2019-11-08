import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

import App from "./App.vue";
import { state, getters, actions, mutations } from "./store";
import { routes } from "./router";

// Install Vuex in the webapp
Vue.use(Vuex);

// Install Vue-Router
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
	store: new Vuex.Store({ state, getters, actions, mutations }),
	router: new VueRouter({ routes, mode: "history", hash: false }),
	render: h => h(App),
}).$mount("#app");
