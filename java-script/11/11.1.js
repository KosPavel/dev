Array.prototype.remove = function(index){
	//return this.splice(index, 1); - изменение исходного
	let arr = [...this];
	arr.splice(index, 1);
	return arr;
};

function OneNumber(num){
	this.value = num;
}

OneNumber.prototype = {
	increment : function(){
		this.value++;
		return this;   //в шаблоне цепочек так
	},
	add : function(num){
		this.value += num;
		return this;
	},
	outConsole : function(){
		console.log(this.value);
	}
};