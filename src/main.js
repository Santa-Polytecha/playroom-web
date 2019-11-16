import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import VueSocketIO from "vue-socket.io";

import App from "./App.vue";
import { state, getters, actions, mutations } from "./store";
import { routes } from "./router";

// Install Vuex in the webapp
Vue.use(Vuex);

// Install Vue-Router
Vue.use(VueRouter);

Vue.config.productionTip = false;
const store = new Vuex.Store({ state, getters, actions, mutations });

const router =  new VueRouter({ routes, mode: "history", hash: false });
router.beforeEach((to, from, next) => {
	const authRequired = to.matched.some((route) => route.meta.auth);
	const authed = store.state.isAuthorized;
	const userAuth = store.state.username.length > 0;
	const roomAuth = store.state.roomName.length > 0;
	if (authRequired && !authed && !userAuth && !roomAuth) {
		next('/')
	} else {
		next()
	}
});

Vue.use(new VueSocketIO({
	debug: true,
	connection: "http://localhost:3001",
	vuex: {
		store,
		actionPrefix: "SOCKET_",
		mutationPrefix: "SOCKET_",
	}}));

new Vue({
	store: store,
	router: router,
	render: h => h(App),
}).$mount("#app");
