let bd = document.getElementsByTagName("body")[0];
bd.innerHTML = "<table><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>"

let table = document.getElementsByTagName("table");
table[0].style.width = "500px";
table[0].style.height = "200px";
let blackRows = document.getElementsByTagName("tr");
for (let i = 1; i < blackRows.length; i+=2) {
	blackRows[i].style.background = 'black';
}

console.log(blackRows.length);