import Vue from "vue";
import Vuex from "vuex";
import schedule12E from "@/data/schedule12E";
import schedule12B from "@/data/schedule12B";

import Todo from "./models/Todo";

Vue.use(Vuex);

export default new Vuex.Store({
	getters: {
		username: state => state.username,
		className: state => state.className,
		// Get schedule by className
		scheduleData: state => {
			switch (state.className) {
				case "12E":
					return state.schedule12E;
				case "12B":
					return state.schedule12B;
				default:
					return state.schedule12E;
			}
		},
		// Filter for uncompleted and sort
		uncompletedTodos: state =>
			state.todos
				.filter((x: Todo) => x.completed === false)
				.sort((a: Todo, b: Todo) => a.timestamp - b.timestamp),
		// Filter for completed and sort
		completedTodos: state =>
			state.todos
				.filter((x: Todo) => x.completed == true)
				.sort((a: Todo, b: Todo) => b.timestamp - a.timestamp),
		// Get all todos
		todos: state => state.todos,
	},

	state: {
		username: localStorage.getItem("username") || "Buddy",
		className: localStorage.getItem("className") || "12E",
		schedule12E: schedule12E,
		schedule12B: schedule12B,
		// Get todos from local storage
		todos:
			JSON.parse(localStorage.getItem("todos"), function(key, value) {
				if (!key) return value;
				return value === null ? Infinity : value;
			}) || new Array<Todo>(),
	},

	mutations: {
		changeSchedule(state, classLetter) {
			state.className = classLetter;
		},
		changeUsername(state, username) {
			state.username = username;
		},
		addTodo(state, todo) {
			state.todos.push(todo);
			localStorage.setItem("todos", JSON.stringify(state.todos));
		},
		completeTodo(state, id) {
			state.todos.find((x: Todo) => x.id === id).completed = true;
			state.todos.find((x: Todo) => x.id === id).timestamp = new Date().getTime();
			localStorage.setItem("todos", JSON.stringify(state.todos));
		},
		removeTodo(state, id) {
			if (state.todos.length === 1) {
				state.todos = [];
			}
			state.todos.splice(id, 1);
			localStorage.setItem("todos", JSON.stringify(state.todos));
		},
	},

	actions: {
		changeSchedule(context, className) {
			context.commit("changeSchedule", className);
			localStorage.setItem("className", className);
		},
		changeUsername(context, username) {
			context.commit("changeUsername", username);
		},
		addTodo(context, todo) {
			context.commit("addTodo", todo);
		},
		completeTodo(context, id) {
			context.commit("completeTodo", id);
		},
		removeTodo(context, id) {
			context.commit("removeTodo", id);
		},
	},
});
