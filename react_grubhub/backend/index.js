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
var updateSection = require('./routes/updateSection');
var deleteSection = require('./routes/deleteSection');
var addItem = require('./routes/addItem');
var updateItem = require('./routes/updateItem');
var deleteItem = require('./routes/deleteItem');
var oaccount1 = require('./routes/oaccount1');
var oaccount2 = require('./routes/oaccount2');
var oaccount3 = require('./routes/oaccount3');
var oaccount4 = require('./routes/oaccount4');
var account1 = require('./routes/account1');
var account2 = require('./routes/account2');
var account3 = require('./routes/account3');
var search = require('./routes/search');
var detail = require('./routes/detail');
var getCart = require('./routes/getCart');
var place = require('./routes/place');
var order = require('./routes/order');
var ohome = require('./routes/ohome');
var ohomeChange = require('./routes/ohomeChange');
var ohomeCancel = require('./routes/ohomeCancel');
var message = require('./routes/message');
var getOmessage = require('./routes/getOmessage');
var getCmessage = require('./routes/getCmessage');


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
app.use("/updateSection", updateSection);
app.use("/deleteSection", deleteSection);
app.use("/addItem", addItem);
app.use("/updateItem", updateItem);
app.use("/deleteItem", deleteItem);
app.use("/oaccount1", oaccount1);
app.use("/oaccount2", oaccount2);
app.use("/oaccount3", oaccount3);
app.use("/oaccount4", oaccount4);
app.use("/account1", account1);
app.use("/account2", account2);
app.use("/account3", account3);
app.use("/search", search);
app.use("/detail", detail);
app.use("/getCart", getCart);
app.use("/place", place);
app.use("/order", order);
app.use("/ohome", ohome);
app.use("/ohomeChange", ohomeChange);
app.use("/ohomeCancel", ohomeCancel);
app.use("/message", message);
app.use("/getOmessage", getOmessage);
app.use("/getCmessage", getCmessage);

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");