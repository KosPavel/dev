let vm = new Vue({
	el: "#app",
	data: {
		counter: 0,
		newTask: "",
		list: [],
	},
	methods: {
		addTask: function(){
			let task = {
				id: this.counter++,
				name: this.newTask,
				isDelete: false,
			}
			this.list.push(task);
			this.newTask = "";
			localStorage.setItem("tasks", JSON.stringify(this.list));
		},
		removeTasks: function(){
			for(let i = 0; i < this.list.length; i++){
				if(this.list[i].isDelete){
					this.list.splice(i, 1);
				}
			}
			localStorage.setItem("tasks", JSON.stringify(this.list));
		},
		init: function(){
			let arr = JSON.parse(localStorage.getItem("tasks"));
			for(let i = 0; i < arr.length; i++){
				if(arr[i]>this.counter){
					this.counter = arr[i];
				}
				this.list.push(arr[i]);
			}
		}
	}
});