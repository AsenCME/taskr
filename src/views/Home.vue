<template>
	<div class="home">
		<div class="time-container">
			<div class="day">{{actualDayOfWeek}}</div>
			<div class="time">{{time}}</div>
		</div>

		<div class="subjects" v-if="!noSchool">
			<div class="label">Schedule for {{label}}:</div>
			<div v-if="!subjects" class="loading">LOADING...</div>
			<div v-for="(subject,index) of subjects" :key="index" class="subject" :class="{over: subject.isOver}">

				<div class="left">{{subject.displayFrom}}</div>
				<div class="text">{{subject.name}}</div>
				<div class="right">{{subject.displayTo}}</div>

				<div class="progress" :style="{width: subject.progress + '%'}"></div>
			</div>
		</div>

		<div v-else class="no-school">
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
	computed: mapGetters(["schedule", "holidays"]),
})
export default class Home extends Vue {
	schedule: any;
	holidays: any;
	dayOfWeek: any = moment().format("dddd");
	date: any = this.getDate(true);
	actualDayOfWeek = moment().format("dddd");
	time: any = moment().format("HH:mm:ss");
	subjects: any = null;
	label: string = "today";
	noSchool: boolean = false;
	shouldUpdateSubjects: boolean = true;

	mounted() {
		this.checkTime();

		if (!this.isDayOff(this.dayOfWeek, this.actualDayOfWeek, this.date)) {
			this.makeSubjects(this.dayOfWeek);
			this.updateTime();
			this.updateSubjects();
		}
		this.startUpdating(this.shouldUpdateSubjects);
	}

	makeSubjects(day: string): any {
		this.subjects = this.schedule[day].map((s: any, index: number) => {
			let from = this.getFrom(index);
			let to = this.getTo(index);
			return {
				name: s,
				progress: 0,
				isOver: false,
				from: from.value,
				to: to.value,
				displayFrom: from.displayValue,
				displayTo: to.displayValue,
			};
		});
	}

	updateSubjects(): void {
		this.subjects.filter((x: any) => !x.isOver).forEach((s: any) => {
			let currentTime = this.getCurrentTimeCode();
			if (s.to <= currentTime) {
				s.isOver = true;
				s.progress = 100;
				if (currentTime >= 810) {
					s.isOver = false;
					s.progress = 0;
				}
			} else if (s.from >= currentTime) return;
			else {
				let totalRunTime = s.to - s.from;
				let elapsedTime = currentTime - s.from + Number(moment().format("ss")) / 60;

				s.progress = (elapsedTime / totalRunTime) * 100;
			}
		});
	}

	updateTime(): void {
		this.time = moment().format("HH:mm:ss");
	}

	startUpdating(shouldUpdateSubjects: boolean): void {
		if (shouldUpdateSubjects) {
			setInterval(() => {
				this.updateTime();
				this.updateSubjects();
			}, 1000);
		} else {
			setInterval(() => {
				this.updateTime();
			}, 1000);
		}
	}

	isDayOff(dayOfWeek: string, actualDayOfWeek: string, date: string): boolean {
		if (!this.schedule[dayOfWeek]) {
			this.noSchool = true;
			return true;
		} else if (this.holidays.includes(date)) return true;
		return false;
	}

	checkTime(): void {
		if (this.getCurrentTimeCode() >= 810) {
			this.dayOfWeek = moment()
				.add(1, "days")
				.format("dddd");
			this.label = "tommorow";
			this.date = this.getDate(false);
			this.shouldUpdateSubjects = false;
		}
	}

	getCurrentTimeCode(): number {
		let hour = Number(moment().format("HH")) * 60;
		let min = Number(moment().format("mm"));
		return hour + min;
	}

	getDate(today: boolean): string {
		if (today) return moment().format("DD/MM/YYYY");
		return moment()
			.add(1, "day")
			.format("DD/MM/YYYY");
	}

	getFrom(index: number): any {
		switch (index) {
			case 0:
				return { value: 7 * 60 + 30, displayValue: "7:30" };
			case 1:
				return { value: 8 * 60 + 20, displayValue: "8:20" };
			case 2:
				return { value: 9 * 60 + 10, displayValue: "9:10" };
			case 3:
				return { value: 10 * 60 + 10, displayValue: "10:10" };
			case 4:
				return { value: 11 * 60 + 0, displayValue: "11:00" };
			case 5:
				return { value: 11 * 60 + 50, displayValue: "11:50" };

			default:
				return { value: 12 * 60 + 35, displayValue: "12:35" };
		}
	}
	getTo(index: number): any {
		switch (index) {
			case 0:
				return { value: 8 * 60 + 10, displayValue: "8:10" };
			case 1:
				return { value: 9 * 60 + 0, displayValue: "9:00" };
			case 2:
				return { value: 9 * 60 + 50, displayValue: "9:50" };
			case 3:
				return { value: 10 * 60 + 50, displayValue: "10:50" };
			case 4:
				return { value: 11 * 60 + 40, displayValue: "11:40" };
			case 5:
				return { value: 12 * 60 + 30, displayValue: "12:30" };

			default:
				return { value: 19 * 60 + 15, displayValue: "13:15" };
		}
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
	padding-top: 40px;
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

