let area = parseInt(prompt("Размер поля"));

let arr = [];
for (let i = 1; i <= area*area; i++){
	arr.push(i);
}

arr.sort(()=>random(-1,1));

let div = document.createElement('div');
div.style.width = "100vw";
div.style.height = "100vh";
div.style.display = "grid";
div.style.justifyContent = "center";
div.style.alignItems = "center";

div.innerHTML = "<table></table>";

let table = div.querySelector('table');
table.style.width = (area * 20) + "px";
table.style.height = (area * 20) + "px";

for(let i = 0; i < area; i++){
	let tr = document.createElement('tr');
	tr.style.border = "1px solid black";
	tr.style.width = "20px";
	tr.style.height = "20px";
	for(let j = 0; j < area; j++){
		let td = document.createElement('td');
		td.style.border = "1px solid black";
		td.style.width = "20px";
		td.style.height = "20px";
		td.innerText = arr[i*area + j];
		td.style.color = "rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) + ")";
		tr.appendChild(td);
	}
	table.appendChild(tr);
}

div.appendChild(table);
document.body.appendChild(div);

function random(min, max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

let num = 1;

function game_handler(e){
	if (e.target.tagName === "TD" && e.target.innerText === num.toString()){
		e.target.style.backgroundColor = "lightblue";
		if (num === area*area) {
			alert("Вы выйграли!");
			location.reload();
		}
		num += 1;
	}
}

table.onclick = game_handler;