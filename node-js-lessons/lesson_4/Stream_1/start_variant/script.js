$(function(){
	myFile.addEventListener('change', takeFile, false);
	
	function takeFile(e){
		var file = e.target.files[0];
		$.ajax({
			type:'POST',
			url: file.name,
			data: file,
			processData: false,
			success: function(response) { //ответ от сервера в переменной response
				alert(response);
			}			
		});		
	}
});