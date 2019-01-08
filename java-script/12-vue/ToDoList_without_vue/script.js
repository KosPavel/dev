var mainUl = document.querySelector('#myUl');
var taskManager = new TaskManager(mainUl);

taskManager.addTask("Первая задача!");
taskManager.addTask("Вторая задача!");
taskManager.addTask("Третья задача!");

function newElement(){
	if(myInput.value !== "")
		taskManager.addTask(myInput.value);
}

function deleteElement(){
	taskManager.deleteToServer();
}