<template>
  <div class="tasks-page">

    <Header title="Tasks" />

    <div class="tasks-list">
      <div
        class="error"
        v-if="uncompletedTodos.length === 0"
      >
        You have no tasks!
      </div>
      <div
        class="list-wrapper"
        v-else
      >
        <div
          class="list-item"
          v-for="(todo, index) in uncompletedTodos"
          :key="todo.id"
          :ref="`todo-${todo.id}`"
        >
          <div class="data">
            <span
              class="completeBtn"
              @click="completeTask(todo.id)"
            ><i class="fas fa-check"></i></span>
            <div class="name">{{todo.name}}</div>
            <div class="deadline">{{formatDate(todo.timestamp)}}</div>
          </div>
          <div
            class="divider"
            :class="{'last': index === uncompletedTodos.length - 1}"
          ></div>
        </div>
      </div>
    </div>

    <div class="done-tasks">
      <div
        class="header"
        @click="expandCompleted"
      >
        <div class="title">Completed Tasks ({{completedTodos.length}})</div>
        <div class="expandBtn"><i class="fas fa-chevron-down"></i></div>
      </div>
      <div class="tasks-list">
        <div
          class="error"
          v-if="completedTodos.length === 0"
        >
          You have no completed tasks!
        </div>
        <div
          class="list-wrapper"
          v-else
        >
          <div
            class="list-item"
            v-for="(todo, index) in completedTodos"
            :key="todo.id"
            :ref="`todo-${todo.id}`"
          >
            <div class="data">
              <span
                class="completeBtn"
                @click="removeTask(todo.id)"
              ><i class="fas fa-times"></i></span>
              <div class="name">{{todo.name}}</div>
              <div class="deadline">{{formatDate(todo.timestamp)}}</div>
            </div>
            <div
              class="divider"
              :class="{'last': index === completedTodos.length - 1}"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="addBtn"
      @click="toggleAddModal"
    >
      <i class="fas fa-plus"></i>
    </div>

    <div class="add-modal">
      <div class="card">
        <span
          class="close"
          @click="toggleAddModal"
        ><i class="fas fa-times"></i></span>
        <div class="title">Add Task</div>
        <form
          @submit.prevent="addTask"
          class="add-form"
        >
          <label for="#taskName">Task name <span>*</span></label>
          <input
            id="taskName"
            type="text"
            placeholder="feed the dog"
            v-model="newTask.name"
          >
          <label for="#taskDeadline">Task deadline</label>
          <input
            id="taskDeadline"
            type="date"
            placeholder="Task deadline"
            v-model="newTask.deadline"
          >
          <button type="submit">Add task</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import moment from "moment";
import Header from "./../components/Header.vue";
import Todo from "./../models/Todo";

@Component({
  computed: mapGetters(["completedTodos", "uncompletedTodos", "todos"]),
  components: { Header: Header }
})
export default class Tasks extends Vue {
  newTask: any = {};
  completedTodos: Array<Todo>;
  uncompletedTodos: Array<Todo>;
  todos: Array<Todo>;
  $toast: any;

  addTask(): void {
    if (!this.validateName()) return;
    this.toggleAddModal();

    let nextID =
      this.todos.length === 0 ? 0 : this.todos[this.todos.length - 1].id + 1;
    let name = this.newTask.name;
    let timestamp = moment(this.newTask.deadline, "YYYY-MM-DD").valueOf();
    if (!this.newTask.deadline) {
      timestamp = +Infinity;
    }
    let newTodo = new Todo(nextID, name, timestamp);

    this.newTask = {};
    this.$toast.success("Task added!");
    this.$store.dispatch("addTodo", newTodo);
  }

  validateName(): boolean {
    if (!this.newTask.name) {
      this.$toast.error("Name cannot be empty");
      this.newTask = {};
      return false;
    }
    if (this.newTask.name.trim() === "") {
      this.$toast.error("Name cannot be empty");
      this.newTask = {};
      return false;
    }
    return true;
  }

  completeTask(id: number): void {
    this.$refs[`todo-${id}`][0].classList.add("to-delete");
    setTimeout(() => {
      this.$toast.show("Task completed!");
      this.$store.dispatch("completeTodo", id);
    }, 400);
  }

  removeTask(id: number): void {
    this.$refs[`todo-${id}`][0].classList.add("to-delete");
    setTimeout(() => {
      this.$toast.show("Task removed!");
      this.$store.dispatch("removeTodo", id);
    }, 300);
  }

  formatDate(timestamp: number): string {
    if (timestamp === Infinity) return "";
    let dateMoment = moment(timestamp);

    let timeDiff = dateMoment.valueOf() - moment().valueOf();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (Math.abs(diffDays) === 0) return "today";
    else if (diffDays === -1) return "yesterday";
    else if (diffDays === 1) return "tomorrow";

    let text = dateMoment.format("ddd, MMM DD, YYYY");
    if (dateMoment.get("year") == moment().get("year")) {
      text = dateMoment.format("ddd, MMM DD");
    }
    return text;
  }

  toggleAddModal(): void {
    document.querySelector(".add-modal").classList.toggle("opened");
  }

  expandCompleted(): void {
    document
      .querySelector(".done-tasks > .tasks-list")
      .classList.toggle("expanded");

    document
      .querySelector(".done-tasks > .header > .expandBtn")
      .classList.toggle("expanded");
  }
}
</script>

<style scoped>
.tasks-page {
  padding-top: 100px;
}

.addBtn {
  width: 50px;
  height: 50px;
  background-color: #000;
  position: fixed;
  border-radius: 50%;
  bottom: 25px;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 25px;
}

/* INFO: Tasks List */
.tasks-list {
  padding: 0px 30px;
  font-size: 18px;
  font-weight: 500;
}
.list-wrapper .list-item {
  margin: 20px 0px;
  position: relative;
  transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.2s;
}
.list-wrapper .list-item.to-delete {
  transform: translateX(150%);
}
.list-wrapper .list-item.to-delete .data .completeBtn {
  background-color: #00c700;
  color: white;
  border: 1px solid #00c700;
}
.list-wrapper .list-item .data {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-left: 45px;
  margin-right: 20px;
}
.list-wrapper .list-item .name {
  font-size: 18px;
  word-wrap: normal;
  font-weight: 600;
}
.list-wrapper .list-item .completeBtn {
  left: 0px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  background-color: white;
  color: #a0a0a0;
  border: 1px solid #a0a0a0;
  width: 30px;
  height: 30px;
  transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
.list-wrapper .list-item .deadline {
  font-size: 14px;
  right: 0px;
  font-weight: 500;
  text-align: center;
}
.list-wrapper .list-item .divider {
  margin: 10px 0px;
  margin-top: 20px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.list-wrapper .list-item .divider.last {
  border: none;
}

/* INFO: Done Todos list */
.done-tasks {
  padding: 0px 30px;
  margin-top: 50px;
  margin-bottom: 90px;
}
.done-tasks .error {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 16px;
}
.done-tasks .header {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 10px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.done-tasks .header .title {
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
}
.done-tasks .header .expandBtn {
  font-size: 20px;
  margin-right: 10px;

  transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  transform: rotate(0deg);
}
.done-tasks .tasks-list {
  display: none;
  padding: 0px;
}
.done-tasks .tasks-list.expanded {
  display: block;
}
.done-tasks .header .expandBtn.expanded {
  transform: rotate(180deg);
}
.done-tasks .list-wrapper .list-item.to-delete .data .completeBtn {
  background-color: #d60000;
  color: white;
  border: 1px solid #d60000;
}

/* INFO: Add Modal */
.add-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 5;
}
.add-modal.opened {
  display: flex !important;
}
.add-modal > .card {
  position: relative;
  width: 80%;
  background-color: white;
  padding: 30px;
  padding-bottom: 15px;
  box-shadow: 0px 10px 50px -10px black;
  border-radius: 10px;
}
.add-modal .card > .title {
  font-weight: 700;
  text-align: center;
  font-size: 22px;
  margin-top: 15px;
  margin-bottom: 25px;
}
.add-modal .add-form label {
  font-weight: 600;
  font-size: 14px;
}
.add-modal .add-form label span {
  color: #880000;
}
.add-modal .add-form input {
  background: transparent;
  width: 100%;
  outline: none;
  border: none;
  margin-bottom: 20px;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  padding: 8px 0px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
}
.add-modal .add-form button {
  outline: none;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #000;
  color: white;
  font-weight: 500;
  font-size: 16px;
  padding: 12px 20px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
}
.add-modal .card .close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
}
</style>
