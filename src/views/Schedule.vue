<template>
    <div>
        <div class="title">This is the full schedule</div>
        <div class="schedule">
            <div class="day" v-for="(list, key) of schedule" :key="key">
                <div class="subject" v-for="(subject, index) of list" :key="index" :class="{last: isLast(key, index)}">
                    {{subject}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({ computed: mapGetters(["schedule"]) })
export default class Schedule extends Vue {
	schedule: any;

	mounted() {
		this.$forceUpdate();
	}

	isLast(key: string, index: number): boolean {
		if (index === 6) return true;
		if (index == 5 && key === "Friday") return true;
		return false;
	}
	isCorner(key: string, index: number): boolean {
		return key === "Thursday" && index === 6;
	}
}
</script>

<style scoped lang="stylus">
$border = 1px solid black;

.title {
    text-align: center;
    font-size: 30px;
    padding: 30px 0px;
}

.schedule {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    overflow: auto;
}

.day {
    min-width: 100px;
    border: $border;
    border-right: none;

    &:nth-of-type(4) {
        border-right: $border !important;
    }

    &:nth-of-type(5) {
        border-left: none;
        border-right: $border !important;
    }
}

.subject {
    min-width: 100px;
    padding: 20px 30px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    border-bottom: $border;
}

.last {
    border-bottom: none;
}
</style>
