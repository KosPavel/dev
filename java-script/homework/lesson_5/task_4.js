function timeBeforeNY() {
	let date = new Date();
	let dateNY = new Date(2019, 0, 1, 0, 0, 0, 0);
	let delta = dateNY - date;
	let days = Math.floor(delta/1000/60/60/24);
	delta -= days*24*60*60*1000;
	let hours = Math.floor(delta/1000/60/60);
	delta -= hours*60*60*1000;
	let mins = Math.floor(delta/1000/60);
	answer = "";
	daysToStr(days.toString());
	hoursToStr(hours.toString());
	minsToStr(mins.toString());
	console.log("До Нового Года осталось ");
	console.log(answer);
}

function daysToStr(x){
	answer += x + " ";
	if (x.length === 2){
		if (x[1] === "1") {
			answer += "день ";
		} else if (x[1] === "2" || x[1] === "3" || x[1] === "4") {
			answer += "дня ";
		} else {
			answer += "дней ";
		}
	} else {
		if (x[0] === "1") {
			answer += "день ";
		} else if (x[0] === "2" || x[0] === "3" || x[0] === "4") {
			answer += "дня ";
		} else {
			answer += "дней ";
		}
	}
}

function hoursToStr(x){
	answer += x + " ";
	if (x.length === 2){
		if (x[1] === "1" && x !== "11") {
			answer += "час ";
		} else if (x[1] === "2" || x[1] === "3" || x[1] === "4") {
			answer += "часа ";
		} else {
			answer += "часов ";
		}
	} else {
		if (x[0] === "1" && x !== "11") {
			answer += "час ";
		} else if (x[0] === "2" || x[0] === "3" || x[0] === "4") {
			answer += "часа ";
		} else {
			answer += "часов ";
		}
	}
}

function minsToStr(x){
	answer += x + " ";
	if (x.length === 2){
		if (x[1] === "1") {
			answer += "минута!";
		} else if (x[1] === "2" || x[1] === "3" || x[1] === "4") {
			answer += "минуты!";
		} else {
			answer += "минут!";
		}
	} else {
		if (x[0] === "1") {
			answer += "минута!";
		} else if (x[0] === "2" || x[0] === "3" || x[0] === "4") {
			answer += "минуты!";
		} else {
			answer += "минут!";
		}
	}
}

timeBeforeNY();