let widgets = [{
	id:1, name:'Test widget 1', price:1000, desc:'description 1'
},{
	id:2, name:'Test widget 2', price:2000, desc:'description 2'
},{
	id:3, name:'Test widget 3', price:3000, desc:'description 3'
},{
	id:4, name:'Test widget 4', price:4000, desc:'description 4'
},{
	id:5, name:'Test widget 5', price:5000, desc:'description 5'
},{
	id:6, name:'Test widget 6', price:6000, desc:'description 6'
},{
	id:7, name:'Test widget 7', price:7000, desc:'description 7'
}];

exports.find = function (id, callback) {
	for(let i = 0;i<widgets.length;i++){
		if(id === widgets[i].id)
			return callback(null, widgets[i]);
	}
	callback(null, null);
};

exports.findAll = function(callback) {
	callback(null, widgets);
};

exports.add = function(data, callback) {
	if(!(data&&data.name&&data.price))
		return callback(new Error('Error data'));

	let index = widgets.length + 1;
	widgets[widgets.length] = {
		id:index,
		name:data.name,
		price:parseFloat(data.price)||0,
		desc:data.desc||""
	};
	callback(null, widgets[index]);
};

exports.delete = function(id, callback) {
	for (let i = 0; i<widgets.length; i++){
		if(id===widgets[i].id)
			return callback(null, widgets.splice(i, 1));
	}
	callback(null, null);
};