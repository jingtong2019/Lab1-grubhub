//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
    extended: true
  }));
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


var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 100,
  host: 'localhost',
  user: 'root',
  password: '14371437',
  database : 'grubhub'
});

app.post('/account', function(req,res){

  console.log("req:", req.body);
  let sql = "INSERT INTO customers (email, password, fname, lname) VALUES ?;";
  let values = [[req.body.email, req.body.password, req.body.fname, req.body.lname]];

  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, [values], function(err){
        connection.release();
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("failed");
        }
        else {
          res.writeHead(200,{
            'Content-Type' : 'text/plain'
          })
          res.end("success");
        }
    });
  });
})



app.post('/csignup', function(req,res){
  let sql = "INSERT INTO customers (email, password, fname, lname) VALUES ?;";
  let values = [[req.body.email, req.body.password, req.body.fname, req.body.lname]];

  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, [values], function(err){
        connection.release();
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("failed");
        }
        else {
          res.writeHead(200,{
            'Content-Type' : 'text/plain'
          })
          res.end("success");
        }
    });
  });
})

app.post('/osignup', function(req,res){
  let sql = "INSERT INTO owners (email, password, fname, lname, rname, zipcode) VALUES ?;";
  let values = [[req.body.email, req.body.password, req.body.fname, req.body.lname, req.body.rname, req.body.zipcode]];

  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, [values], function(err){
        connection.release();
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("failed");
        }
        else {
          res.writeHead(200,{
            'Content-Type' : 'text/plain'
          })
          res.end("success");
        }
    });
  });
})


app.post('/osignup2', function(req,res){
  let get_id = "SELECT oid FROM owners WHERE email = ?;";
  let email_values = req.body.email;
  

  let id_res;
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(get_id, [email_values], function(err, result){
        //connection.release();
        if (err) {
          console.log("cant find oid");
        }
        else {
          id_res = result[0].oid;
          console.log(typeof(id_res), id_res);
        }
    });

    setTimeout( function(){
      let sql = "INSERT INTO restaurants (oid, rname, address, phone) VALUES ?;";
      let values = [[id_res, req.body.rname, req.body.address, req.body.phone]];
      connection.query(sql, [values], function(err){
        connection.release();
        if (err) throw err;
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("failed");
        }
        else {
          res.writeHead(200,{
            'Content-Type' : 'text/plain'
          })
          res.end("success");
        }
      });
    }, 200 );
    
  });
})

app.post('/', function(req,res){
  let usertype = "customers";
  let idtype = "cid";
  if (req.body.usertype === "Restaurant Owner") {
    usertype = "owners";
    idtype = "oid";
  }
  let sql = "SELECT " + idtype + ", password FROM " + usertype + " WHERE email = ?;";
  let values = req.body.email;

  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, [values], function(err,result){
        connection.release();
        if (err) throw err;
        if (result.length == 0) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("This email is not registered.");
        }
        else if (result[0].password === req.body.password) {
          res.writeHead(200,{
            'Content-Type' : 'text/plain'
          })
          if (idtype == "cid") res.end((result[0].cid).toString());
          else res.end((result[0].oid).toString());
        }
        else {
          res.writeHead(203,{
            'Content-Type' : 'text/plain'
          })
          res.end("Wrong password!");
        }
    });

    // connection.on('error', function(err) {      
    //       res.json({"code" : 100, "status" : "Error in connection database"});
    //       return;    
    // });
  });

})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");