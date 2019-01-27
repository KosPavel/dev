let express = require('express');
let router = express.Router();

router.post('/', (req,res,next)=>{
	res.render('registrated', req.body);
});

module.exports = router;