var emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
              0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
              0x1F431, 0x1F42A, 0x1F439, 0x1F424, 0x1F562];

let emoji_div = document.querySelector(".emojis");
emoji_div.style.display = 'none';

for (let i in emojis) {
	let span = document.createElement('span');
	span.innerHTML = String.fromCodePoint(emojis[i]);
	emoji_div.appendChild(span);
};

let spans = document.getElementsByTagName('span');
for (let i in spans) {
	spans[i].onclick = function(){
		input.value += String.fromCodePoint(emojis[i]);
	};
};

let hide_button = document.getElementsByClassName('hide')[0];

hide_button.onclick = ()=>{
	if (emoji_div.style.display === 'none')
		emoji_div.style.display = 'block';
	else
		emoji_div.style.display = 'none';
};