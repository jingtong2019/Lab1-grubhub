//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var login = require('./routes/login');
var csignup = require('./routes/csignup');
var osignup = require('./routes/osignup');
var osignup2 = require('./routes/osignup2');
var menu = require('./routes/menu');
var addSection = require('./routes/addSection');
var oaccount1 = require('./routes/oaccount1');
var oaccount3 = require('./routes/oaccount3');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });




app.use("/", login);
app.use("/csignup", csignup);
app.use("/osignup", osignup);
app.use("/osignup2", osignup2);
app.use("/menu", menu);
app.use("/addSection", addSection);
app.use("/oaccount1", oaccount1);
app.use("/oaccount3", oaccount3);

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");