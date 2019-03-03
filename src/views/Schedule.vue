<template>
  <div>

    <Header title="Full schedule" />

    <div class="schedule">
      <div
        class="day"
        v-for="(day, index) of scheduleData"
        :key="index"
        :ref="day.dayOfWeek"
      >
        <div
          class="dayName"
          @click="select(day.dayOfWeek)"
        >{{day.dayOfWeek}}</div>
        <div class="classes">
          <div
            class="subject"
            v-for="(subject, index) of day.classes"
            :key="index"
            :class="{'last': day.classes.length - 1 === index}"
          >
            {{subject.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

import Header from "./../components/Header.vue";

@Component({
  computed: mapGetters(["scheduleData"]),
  components: { Header: Header }
})
export default class Schedule extends Vue {
  scheduleData: any;

  back(): void {
    this.$router.push("/");
  }

  select(dayOfWeek: string): void {
    let className = "selected";
    let el = this.$refs[dayOfWeek][0];
    let otherEl = document.querySelector(".day.selected");

    if (otherEl && otherEl !== el) otherEl.classList.remove(className);

    if (el.classList.contains(className)) el.classList.remove(className);
    else el.classList.add(className);
  }
}
</script>

<style scoped>
.schedule {
  padding: 20px;
  padding-top: 100px;
}

.day {
  position: relative;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0px -10px 20px -5px transparent;
  transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
.day.selected {
  border-radius: 15px;
  box-shadow: 0px 3px 15px -5px rgba(0, 0, 0, 0.75);
}

.dayName {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  background: transparent;
  color: #000;
  padding: 15px 0px;
  transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
.day.selected .dayName {
  font-weight: 700;
  background: #000;
  color: #fff;
  border-bottom: 2px solid black;
}
.classes {
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  max-height: 0px;

  transition: 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
.day.selected .classes {
  padding: 20px;
  max-height: 400px;
}
.subject {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  padding-bottom: 10px;
  text-align: center;
  font-size: 18px;
  border-bottom: 1px solid black;
}
.last {
  border: none !important;
  padding: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}
</style>
