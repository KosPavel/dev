;!function(){
	function Iterator(start, end){
		this._start = start;
		this._end = end;
		
		let currentValue = start;
		
		this.step = function(){
			if(currentValue === this._end){
				return currentValue;
			} else if(this._start > this._end){
				return currentValue--;
			} else {
				return currentValue++;
			}
		};		
	}
	
	function Iterator2(start, end){
		Iterator.call(this, start, end);
		
		this.step_cicle = function(){
			let curr = this.step();
			if(curr === this._end){
				let temp = this._end;
				this._end = this._start;
				this._start = temp;
				curr = this.step();
			}
			return curr;
		}
	}
	
	window.iteratorLib = {
		Iterator:Iterator,
		Iterator2:Iterator2
	};
}();
