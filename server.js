var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require ('passport');
var LocalStrategy = require ('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var index = require('./routes/index');
var fundos = require('./routes/fundos');


var app = express();

// view engine
app.set('views', path.join(__dirname,'views'));
app.set('views engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());



 // set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// express validator - tirado do github

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars

app.use(function (req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});




// route
app.use('/', index);
app.use('/fundos', fundos);

app.set ('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log("Server started on port"+app.get('port'));
});