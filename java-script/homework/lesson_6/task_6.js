let counter = 0;
for(let i = 1; i < 999999; i++){
	let nums = [];
	for(let j = 0; j < i.toString().length; j++){
		nums.push(toString(i)[j].toInt);
	}
	while(nums.length < 6){
		nums.shift(0);
	}
	if(nums[0]+nums[1]+nums[2]===nums[3]+nums[4]+nums[5]){
		counter++;
	}
}

console.log(counter);