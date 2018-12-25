function count(){
	for (let x = -4.99; x < 5; x += 0.01){
		if (x < 1) {
			let y = x**2 - 4*x;
			line_x.push(x);
			line_y.push(y);
		} else {
			let y = 5/x;
			line_x.push(x);
			line_y.push(y);
		}
	}
}

graph = document.getElementById('graph');
line_x = [];
line_y = [];

count();

Plotly.plot(graph, [{
                    x: line_x,
                    y: line_y }], 
                    {margin: { t: 0 } } );