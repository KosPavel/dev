/*let arr = [1,-2,3,4,-5,6];

console.log(arr.filter(function(num, index, arr){
	return num > 0;
}).map(function(num, index, arr){
	return num ** 0.5;
}));*/

/*'use strict'

var user = {};
Object.defineProperty(user, "name", {
	value: "Саша",
	configurable: true,
	writable: false,
	enumerable: true
});

user.name = "Паша";
console.log(user.name);*/

;!function(){
	function Iterator(start, end){
		this._start = start;
		this._end = end;
		
		this.currentValue = start;	
	}
	
	Iterator.prototype.step = function(){
		if(this.currentValue === this._end){
			return this.currentValue;
		} else if(this._start > this._end){
			return this.currentValue--;
		} else {
			return this.currentValue++;
		}
	};	
	
	
	function Iterator2(start, end){
		Iterator.call(this, start, end);
	}
	
	Iterator2.prototype.step_cicle = function(){
		let curr = this.step();
		if(curr === this._end){
			let temp = this._end;
			this._end = this._start;
			this._start = temp;
			curr = this.step();
		}
		return curr;
	}
	
	Iterator2.prototype.__proto__ = Iterator.prototype;
	
	window.iteratorLib = {
		Iterator:Iterator,
		Iterator2:Iterator2
	};
}();
