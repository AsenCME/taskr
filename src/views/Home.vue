<template>
  <div class="home">

    <div
      class="fwdBtn"
      @click="goto('schedule')"
    ><i class="fas fa-calendar-alt"></i></div>

    <div
      class="userBtn"
      @click="goto('profile')"
    ><i class="fas fa-user-alt"></i></div>

    <div class="time-container">
      <div class="day">{{dayOfWeek}}</div>
      <div class="time">{{time}}</div>
    </div>

    <div
      class="subjects"
      v-if="!noSchool"
    >

      <div class="label">Schedule for {{label}}:</div>
      <div
        v-if="!schoolDay"
        class="loading"
      >LOADING...</div>

      <div
        v-else
        v-for="(subject,index) of schoolDay.classes"
        :key="index"
        class="subject"
        :class="{over: subject.isOver}"
      >

        <div class="left">{{subject.displayStart}}</div>
        <div class="text">{{subject.name}}</div>
        <div class="right">{{subject.displayEnd}}</div>

        <div
          class="progress"
          :style="{width: subject.progress + '%'}"
        ></div>

      </div>

    </div>

    <div
      v-else
      class="no-school"
    >
      There is no school {{label}}!
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { setInterval } from "timers";
import moment from "moment";

@Component({
  computed: mapGetters(["scheduleData"]),
  watch: {
    scheduleData() {
      this.getSchoolDay();
    }
  }
})
export default class Home extends Vue {
  scheduleData: any;
  schoolDay: any = {};

  time: any = moment().format("HH:mm:ss");
  dayOfWeek: any = moment().format("dddd");
  label: string = "today";
  noSchool: boolean = false;

  mounted() {
    this.getSchoolDay();
    this.startLoop();
  }

  startLoop(): void {
    this.doCheck();
    setInterval(_ => {
      this.time = moment().format("HH:mm:ss");
      this.doCheck();
    }, 1000);
  }

  getSchoolDay(): void {
    this.noSchool = this.isDayOff(this.dayOfWeek);
    if (this.noSchool) return;

    let schoolDay = this.scheduleData.find(
      (x: any) => x.dayOfWeek === this.dayOfWeek
    );
    this.schoolDay = schoolDay;
  }

  isDayOff(dayOfWeek: string): boolean {
    if (["Saturday", "Sunday"].includes(dayOfWeek)) return true;
    return false;
  }

  doCheck(): void {
    if (this.noSchool) return;

    let dayEnd = 1170;
    let currentTimeCode = this.getCurrentTimeCode();

    this.schoolDay.classes.forEach((classEl: any) => {
      if (classEl.endsAt < currentTimeCode) {
        classEl.isOver = true;
        classEl.progress = 0;
      } else if (classEl.startsAt < currentTimeCode) {
        let currentSeconds =
          (currentTimeCode - classEl.startsAt) * 60 +
          Number(this.time.split(":")[2]);
        classEl.progress = (currentSeconds / 2400) * 100;
      }
    });
  }

  getCurrentTimeCode(): number {
    let hour = Number(moment().format("HH")) * 60;
    let min = Number(moment().format("mm"));
    return hour + min;
  }

  goto(link): void {
    this.$router.push(`/${link}`);
  }
}
</script>

<style scoped>
/* INFO: Loader */
.loading {
  color: lightgray;
  text-align: center;
}

/* INFO: Subjects */
.subjects {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.subject {
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 5px 0px;
  width: 40%;
  text-align: center;
  font-size: 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.subject .left,
.subject .right {
  font-size: 18px;
  font-weight: 400 !important;
  position: absolute;
  background: white;
  color: black !important;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100%;
  background: #eee;
  width: 60px;
}
.subject .left {
  left: 0px;
  border-right: 1px solid lightgray;
}
.text {
  padding: 15px;
}
.subject .right {
  right: 0px;
  border-left: 1px solid lightgray;
}
.label {
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 20px;
}
.over {
  background: black;
  color: white;
  font-weight: 700;
}

/* INFO: Time Container */
.time-container {
  text-align: center;
  padding: 20px;
  padding-top: 60px;
}
.day {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 36px;
}
.time {
  font-weight: 300;
  font-size: 40px;
  margin-top: 5px;
}

/* INFO: Free Day Styles */
.no-school {
  text-align: center;
  font-size: 40px;
  color: #ccc;
  margin-top: 20px;
  font-weight: 100;
  font-style: italic;
}

/* INFO: Progress */
.progress {
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 8px;
  width: 0%;
  background: black;
  z-index: 0;
}

/* INFO: Top Buttons */
.fwdBtn {
  position: absolute;
  top: 20px;
  right: 20px;
}
.fwdBtn i,
.userBtn i {
  font-size: 30px;
}

.userBtn {
  position: absolute;
  top: 20px;
  left: 20px;
}

/* INFO: Media Query */
@media only screen and (max-width: 768px) {
  .subject {
    width: 80%;
    font-size: 20px;
    padding: 10px;
  }
  .text {
    padding: 2px;
  }
  .subject .left,
  .subject .right {
    font-size: 17px;
    width: 55px;
  }
  .day {
    font-size: 30px;
  }
  .time {
    font-size: 40px;
    margin-top: -5px;
  }
}
</style>

