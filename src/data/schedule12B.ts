let schedule12B = [
	{
		dayOfWeek: "Monday",
		classes: [
			{ name: "ИТ", displayStart: "13:30", displayEnd: "14:10", startsAt: 0, endsAt: 0 },
			{ name: "ИТ", displayStart: "14:20", displayEnd: "15:00", startsAt: 0, endsAt: 0 },
			{ name: "Математика", displayStart: "15:10", displayEnd: "15:50", startsAt: 0, endsAt: 0 },
			{ name: "Физическо", displayStart: "16:10", displayEnd: "16:50", startsAt: 0, endsAt: 0 },
			{ name: "Физика", displayStart: "17:00", displayEnd: "17:40", startsAt: 0, endsAt: 0 },
			{ name: "Български", displayStart: "17:50", displayEnd: "18:30", startsAt: 0, endsAt: 0 },
			{ name: "Час на класа", displayStart: "18:35", displayEnd: "19:15", startsAt: 0, endsAt: 0 },
		],
	},
	{
		dayOfWeek: "Tuesday",
		classes: [
			{ name: "Немски", displayStart: "13:30", displayEnd: "14:10", startsAt: 0, endsAt: 0 },
			{ name: "Немски", displayStart: "14:20", displayEnd: "15:00", startsAt: 0, endsAt: 0 },
			{ name: "История", displayStart: "15:10", displayEnd: "15:50", startsAt: 0, endsAt: 0 },
			{ name: "Английски", displayStart: "16:10", displayEnd: "16:50", startsAt: 0, endsAt: 0 },
			{ name: "Английски", displayStart: "17:00", displayEnd: "17:40", startsAt: 0, endsAt: 0 },
			{ name: "Георграфия", displayStart: "17:50", displayEnd: "18:30", startsAt: 0, endsAt: 0 },
			{ name: "Български", displayStart: "18:35", displayEnd: "19:15", startsAt: 0, endsAt: 0 },
		],
	},
	{
		dayOfWeek: "Wednesday",
		classes: [
			{ name: "Български", displayStart: "13:30", displayEnd: "14:10", startsAt: 0, endsAt: 0 },
			{ name: "Български", displayStart: "14:20", displayEnd: "15:00", startsAt: 0, endsAt: 0 },
			{ name: "Физическо", displayStart: "15:10", displayEnd: "15:50", startsAt: 0, endsAt: 0 },
			{ name: "Английски", displayStart: "16:10", displayEnd: "16:50", startsAt: 0, endsAt: 0 },
			{ name: "Английски", displayStart: "17:00", displayEnd: "17:40", startsAt: 0, endsAt: 0 },
			{ name: "Математика", displayStart: "17:50", displayEnd: "18:30", startsAt: 0, endsAt: 0 },
			{
				name: "Свят и личност",
				displayStart: "18:35",
				displayEnd: "19:15",
				startsAt: 0,
				endsAt: 0,
			},
		],
	},
	{
		dayOfWeek: "Thursday",
		classes: [
			{ name: "Английски", displayStart: "13:30", displayEnd: "14:10", startsAt: 0, endsAt: 0 },
			{ name: "Английски", displayStart: "14:20", displayEnd: "15:00", startsAt: 0, endsAt: 0 },
			{ name: "ИТ", displayStart: "15:10", displayEnd: "15:50", startsAt: 0, endsAt: 0 },
			{ name: "ИТ", displayStart: "16:10", displayEnd: "16:50", startsAt: 0, endsAt: 0 },
			{ name: "История", displayStart: "17:00", displayEnd: "17:40", startsAt: 0, endsAt: 0 },
			{ name: "Немски", displayStart: "17:50", displayEnd: "18:30", startsAt: 0, endsAt: 0 },
			{ name: "Немски", displayStart: "18:35", displayEnd: "19:15", startsAt: 0, endsAt: 0 },
		],
	},
	{
		dayOfWeek: "Friday",
		classes: [
			{ name: "Немски", displayStart: "13:15", displayEnd: "13:55", startsAt: 0, endsAt: 0 },
			{ name: "Немски", displayStart: "14:05", displayEnd: "14:45", startsAt: 0, endsAt: 0 },
			{ name: "Английски", displayStart: "14:55", displayEnd: "15:35", startsAt: 0, endsAt: 0 },
			{ name: "Английски", displayStart: "15:55", displayEnd: "16:35", startsAt: 0, endsAt: 0 },
			{
				name: "Свят и личност",
				displayStart: "16:40",
				displayEnd: "17:20",
				startsAt: 0,
				endsAt: 0,
			},
			{ name: "Физическо", displayStart: "17:25", displayEnd: "18:05", startsAt: 0, endsAt: 0 },
		],
	},
];

schedule12B.forEach(day => {
	day.classes.forEach(element => {
		let [h1, m1] = element.displayStart.split(":");
		let [h2, m2] = element.displayEnd.split(":");
		element.startsAt = Number(h1) * 60 + Number(m1);
		element.endsAt = Number(h2) * 60 + Number(m2);
	});
});

export default schedule12B;
