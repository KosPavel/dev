let arr_style = document.getElementsByTagName("td"); 
         for(i=0;i<arr_style.length;i++) { 
         arr_style[i].style.border = "1px solid black"; 
         arr_style[i].style.margin = "0px"; 
         } 

let axis_x = ["n0", "n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9",];
let axis_y = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",];

function random(){
	a = Math.floor(Math.random()*9);
	console.log(a);
	return a;
}

function paint(x,y){
	i = axis_x[x];
	j = axis_y[y];
	document.getElementsByClassName(j)[0].getElementsByClassName(i)[0].style.background = "red";
}

function fill(num){
	let x = random();
	let y = random();
	if (x + num >= 9){
		fill(num);
	} else {
	paint(x,y);
    for (let k = 1; k<num; k++){
    	paint(x+k, y);
    }
}
}

fill(3);

// function superFill(){
// 	fill(1);
// 	fill(1);
// 	fill(1);
// 	fill(1);
// 	fill(2);
// 	fill(2);
// 	fill(2);
// 	fill(3);
// 	fill(3);
// 	fill(4);
// }

// superFill();

// document.addEventListener("click", )