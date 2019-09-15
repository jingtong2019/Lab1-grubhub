const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set('view engine','ejs');
app.set('views','./views');

//specify the path of static directory
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//use cookie parser to parse request headers
app.use(cookieParser());

var first;
var second;
var result;

app.get('/', function(req, res) {
    res.render('home', {result:result, first:first, second:second});
 });


app.post('/', function(req, res) {
    first = parseFloat(req.body.first);
    second = parseFloat(req.body.second);
    let operator = req.body.operator;
    switch(operator) {
        case "+": result = (first*10000 + second*10000)/10000; break;
        case "-": result = first - second; break;
        case "*": result = first * second; break;
        case "/": result = first / second; break;
    }
    
    res.render('home', {result:result, first:first, second:second});
    //console.log(`result is ${result}`);
    console.log(req.body.operator);
});


const port = 3000;
app.listen(port, function(){
  console.log(`Node js Express is listening to port ${port}`);
});
