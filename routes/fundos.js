var express = require ('express');
var router = express.Router();

//set home page
router .get('/', function (req,  res,  next){
	res.send('fundos  PAGE');
	//res.render('index.html');
});

module.exports = router;