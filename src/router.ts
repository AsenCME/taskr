import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/profile",
			name: "profile",
			component: () => import(/* webpackChunkName: "about" */ "./views/Profile.vue"),
		},
		{
			path: "/schedule",
			name: "schedule",
			component: () => import(/* webpackChunkName: "about" */ "./views/Schedule.vue"),
		},
		{
			path: "/tasks",
			name: "tasks",
			component: () => import(/* webpackChunkName: "about" */ "./views/Tasks.vue"),
		},
	],
});
