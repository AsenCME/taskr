import Vue from "vue";
import Vuex from "vuex";
import schedule from "./schedule";
import holidays from "./holidays";

Vue.use(Vuex);

export default new Vuex.Store({
	getters: {
		isAuthenticated: state => state.authenticated,
		currentUser: state => state.user,
		schedule: state => state.schedule,
		holidays: state => state.holidays,
	},

	state: {
		authenticated: false,
		user: {},
		schedule: schedule,
		holidays: holidays,
	},

	mutations: {
		login(state, user) {
			state.user = user;
			state.authenticated = true;
		},
		logout(state) {
			state.user = {};
			state.authenticated = false;
		},
		updateUser(state, user) {
			state.user = {};
			state.user = user;
		},
	},

	actions: {
		login(context, user) {
			context.commit("login", user);
		},
		logout(context) {
			context.commit("logout");
		},
	},
});
