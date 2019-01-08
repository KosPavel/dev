;(function(){
	window.TaskManager = function(el){
		this.el = el;
		this.id = 0;		
	}
	
	TaskManager.prototype.addTask = function(title) {
		var taskId = this.id++;
		var task = new Task(title, taskId);
		var html = task.template();
		this.el.appendChild(html);
	};
	
	function Task(title, id) {
		this.title = title;
		this.id = id;
		this.completed = false;
	}
	
	Task.prototype.template = function() {
		var htmlTemplate = document.createElement('li');
		htmlTemplate.setAttribute('data-id', this.id);
		htmlTemplate.innerText = this.title;
		htmlTemplate.addEventListener('click', this.complete);
		
		return htmlTemplate;
	};
	
	Task.prototype.complete = function(event) {
		var el = event.target;
		var isChecked = el.classList.contains('checked');
		var dataId = el.getAttribute('data-id');

		if (isChecked) {
			el.classList.remove('checked');
		} else {
			el.classList.add('checked');
		}
	};	
}())