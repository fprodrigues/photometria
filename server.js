var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var fundos = require('./routes/fundos');

var port = 3000;

var app = express();

// view engine
app.set('views', path.join(__dirname,'views'));
app.set('views engine', 'ejs');
app.engine('html', require('ejs').renderFile);

 // set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// body parser mw
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// route
app.use('/', index);
app.use('/fundos', fundos);

app.listen(port, function(){
console.log('Server started on port' + port);
});