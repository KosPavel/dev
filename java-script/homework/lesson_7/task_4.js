;window.encodeCes = function() {
	return {
		encode : function (str, shift){
			str = str.toLowerCase();
			let alph = "abcdefghijklmnopqrstuvwxyz";
			let alph_encoded = "";
			for (let i = shift; i < alph.length; i++){
				alph_encoded += alph[i];
			}
			for (let i = 0; i < shift; i++) {
				alph_encoded += alph[i];
			}
			encoded = "";
			for (let i = 0; i < str.length; i++) {
				try {
					encoded += alph_encoded.indexOf()
				}
			}
			return encoded;
        },

        decode : function (str, shift){
			str = str.toLowerCase();
        	let alph = "abcdefghijklmnopqrstuvwxyz";
        	decoded = "";
			for (let i = 0; i < str.length; i++){
				try {
					decoded += alph[alph.indexOf(str[i]) - shift];
				} catch(err) {
					decoded += str[i];
				}
			}
			return decoded;
        },
    };
}();