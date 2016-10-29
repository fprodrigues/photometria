var express = require ('express');
var router = express.Router();

//set home page
router .get('/fundos', ensureAuthenticated, function (req,  res,  next){
	res.render('dashboard.html');
});

function ensureAuthenticated(req,res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}

}

module.exports = router;