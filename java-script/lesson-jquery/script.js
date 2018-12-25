$('#p').on('click', function(){
	print();
}).css({'color': 'green',
        'fontSize': '50px'}); //вывод страницы на печать

$(document).on('contextmenu', function(e){
	e.preventDefault();
}); //запрет вызова меню ПКМ

$('button').one('click', function(){
	$(this).css({'backgroundColor':'green'});
	$(this).text('Нажато');
});

$('input').on('input', function(){
	let len = $(this).val().length;
	$('span').text('Осталось '+(15-len)+' символ(ов)');
}); //не работает

let newDiv = $('<div>').css({'backgroundColor': '#021',
                'padding': '50px',
                'color': 'white'})
                       .html('<p>Текст</p>');
$(document.body).append(newDiv);

$('a').on('click', function(e){
	e.preventDefault();
	$(document).scrollTop(30);
});

$('#a').on('click', function(e){
	e.preventDefault();
	$("html").animate({scrollTop: 0}, 2500)
});

setInterval(function(){
	$('span').animate({opacity:0}); //можно hide(), slideDown(), fadeIn()
	$('span').animate({opacity:1});
	// $('span').slideUp(500); //можно show(), slideUp(), fadeOut()
}, 1000);

$('button').on('click', function(){
	if ($(this).parent('').attr("id") === "first") {
		$(this).appendTo('#second');
	} else {
		$(this).appendTo('#first');
	}
});