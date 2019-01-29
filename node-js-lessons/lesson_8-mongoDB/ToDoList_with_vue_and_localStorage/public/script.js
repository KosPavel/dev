//библиотека для ajax-запросов на сервер
window.requestToServer = {
	newTask: function (data, cb) {
		$.ajax({
			url:'/tasks',
			type:'post',
			data:JSON.stringify(data),
			contentType:'application/json',
			success:function(data){
				//данные вернулись с сервера
				cb(null, data);
			},
			error:function(err){
				cb(err);
			},
		});
	}
}