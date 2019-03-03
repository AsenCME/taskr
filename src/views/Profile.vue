<template>
  <div class="profile">

    <Header title="Profile" />

    <!-- Profile Display -->
    <div class="profile-display">
      <div class="name">What up, {{username}}!</div>
      <div class="className">
        Class: {{className}}
        <span
          class="changeClass"
          @click="toggleModal"
        ><i class="fas fa-exchange-alt"></i></span>
      </div>
      <div
        class="logout"
        @click="toggleNameModal"
      >Change name</div>
    </div>

    <!-- Tasks display -->
    <div class="tasks">
      <div class="title">
        <span class="title-text">Tasks</span>
        <div class="line"></div>
        <span
          class="button"
          @click="gotoTasks"
        ><i class="fas fa-paper-plane"></i></span>
      </div>

      <div class="completed">Completed: <span>{{$store.getters.completedTodos.length}}</span> </div>
      <div class="uncompleted">Not completed: <span>{{$store.getters.uncompletedTodos.length}}</span> </div>
    </div>

    <!-- Select Class Modal -->
    <div
      class="class-modal modal"
      @click.stop="toggleModal"
    >
      <div class="card">
        <div class="title">Select Class</div>
        <div class="list">
          <div
            class="item"
            @click.stop="selectClass('12E')"
          >Class E</div>
          <div
            class="item"
            @click.stop="selectClass('12B')"
          >Class B</div>
        </div>
      </div>
    </div>

    <!-- Change Name Modal -->
    <div class="name-modal modal">
      <div class="card">
        <span
          class="close"
          @click="toggleNameModal"
        >
          <i class="fas fa-times"></i>
        </span>
        <div class="title">Change username</div>
        <form @submit.prevent="changeUsername">
          <input
            type="text"
            v-model="newUsername"
            placeholder="Username"
          >
          <button type="submit">Change</button>
        </form>
      </div>
    </div>

  </div>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Header from "./../components/Header.vue";

@Component({
  computed: mapGetters(["username", "className"]),
  components: { Header: Header },
  mounted() {
    this.newUsername = this.username;
  }
})
export default class Profile extends Vue {
  username: string;
  newUsername: string = "";
  $toast: any;

  selectClass(classLetter: string): void {
    this.$store.dispatch("changeSchedule", classLetter);
    this.toggleModal();
    this.$toast.show("Class changed!");
  }

  changeUsername(): void {
    this.$store.dispatch("changeUsername", this.newUsername);
    this.newUsername = "";
    this.toggleNameModal();
    this.$toast.show("Username changed!");
  }

  toggleModal(): void {
    document.querySelector(".class-modal").classList.toggle("opened");
  }
  toggleNameModal(): void {
    document.querySelector(".name-modal").classList.toggle("opened");
  }

  gotoTasks(): void {
    this.$router.push("/tasks");
  }
}
</script>

<style scoped>
.profile {
  padding-top: 100px;
}
/* INFO: Profile Modal */
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  z-index: 5;

  display: none;
}

.modal.opened {
  display: flex !important;
}

.modal > .card {
  position: relative;
  width: 80%;
  background-color: white;
  padding: 30px;
  padding-bottom: 15px;
  box-shadow: 0px 10px 50px -10px black;
  border-radius: 10px;
}
.modal .card > .title {
  font-weight: 700;
  text-align: center;
  font-size: 22px;
  margin-bottom: 20px;
  margin-top: 15px;
}
.modal .card > .list {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.list > .item {
  width: 90%;
  border: 1px solid #757575;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 15px;
  text-align: center;
  transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
.list > .item:hover {
  background: #757575;
  color: white;
  grid-row-end: 500;
}

.modal form input {
  width: 100%;
  outline: none;
  border: none;
  margin-bottom: 7px;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  padding: 8px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
}
.modal form button {
  outline: none;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #000;
  color: white;
  font-weight: 500;
  font-size: 16px;
  padding: 12px 20px;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 10px;
}
.modal .card .close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
}

/* INFO: Logged In State */
.profile-display {
  padding: 0px 30px;
}
.profile-display .name {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 15px;
}
.profile-display .className {
  font-weight: 400;
  font-size: 18px;
}
.profile-display .changeClass {
  border-radius: 6px;
  padding: 5px 10px;
  background: #000;
  margin-left: 5px;
  margin-top: 10px;
  font-size: 16px;
  color: white;
  font-weight: 700;
}
.profile-display .logout {
  width: 100%;
  padding: 10px 0px;
  font-weight: 500;
  text-align: center;
  background: #000;
  color: #fff;
  margin: 0px 0px;
  margin-top: 20px;
  border-radius: 30px;
}

/* INFO: Tasks */
.tasks {
  width: 100%;
  margin-top: 30px;
  padding: 0px 30px;
  position: relative;
}
.tasks .title {
  font-size: 25px;
  font-weight: 600;
  position: relative;
  margin-bottom: 15px;
}
.tasks .title .title-text {
  padding-right: 10px;
  background: white;
}
.tasks .title .line {
  width: 100%;
  background: #000;
  border-radius: 20px;
  height: 3px;
  position: absolute;
  top: 50%;
  transform: translateY(calc(-50%));
  z-index: -1;
}
.tasks .completed,
.tasks .uncompleted {
  font-size: 16px;
  font-weight: 400;
}
.tasks .completed span,
.tasks .uncompleted span {
  font-size: 18px;
  font-weight: 500;
  margin-left: 10px;
}
.tasks .completed {
  margin-bottom: 10px;
}
.tasks .title .button {
  background: #fff;
  padding: 5px 15px;
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tasks .title .button i {
  color: black;
}
</style>


