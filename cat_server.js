var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:50000/cats');


app.use(bodyParser.json()); // if application-type is json or have a form submit , just parse the body and attach it to the req. object
app.use(bodyParser.urlencoded({
    extended:true
}))

var cats = require('./routes/cat.js')(app);

var server = app.listen(3000, function(){
    console.log('server running at http://127.0.0.1:3000/');
})