;!function(){
	function remove(array, index){
		array.splice(index, 1);
		return array;
	}

	function repeat(str, count){
		let result = '';
		for (let i = 0; i < count; i++){
			result += str;
		}
		return result;
	}

    function pluck(array, property_name){
    	let arr = [];
    	for (let i = 0; i < array.length; i++){
    		arr.push(array[i][property_name]);
    	}
    	return arr;
	}

	/* теперь нужно функции сверху перевести в глоб пространство*/
	window.removeLib = {
		remove: remove,
		repeat: repeat,
		pluck: pluck,
	};
}();