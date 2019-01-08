;!function() {
	
	function encode(str, shift){
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
				encoded += alph_encoded[alph.indexOf(str[i])];
			}
			return encoded;
        }

    function decode(str, shift){
			str = str.toLowerCase();
			let alph = "abcdefghijklmnopqrstuvwxyz";
			let alph_decoded = "";
			for (let i = shift; i < alph.length; i++){
				alph_decoded += alph[i];
			}
			for (let i = 0; i < shift; i++) {
				alph_decoded += alph[i];
			}
			decoded = "";
			for (let i = 0; i < str.length; i++) {
				decoded += alph[alph_decoded.indexOf(str[i])];
			}
			return decoded;
    	}

    window.caesarLib = {
    	encode:encode,
    	decode:decode
    }
}();