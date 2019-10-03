//import the require dependencies
var express = require('express');

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var path = require('path');
var multer = require('multer');

var app = express();
var storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.set('view engine', 'ejs');
app.use(express.static('./public'));
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

var fs = require("fs");
var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 100,
  host: 'localhost',
  user: 'root',
  password: '14371437',
  database : 'grubhub'
});


app.post('/search', function(req,res){
  let sql = "SELECT menus.mid, menus.rid, menus.name, restaurants.rname, restaurants.cuisine FROM menus INNER JOIN \
    restaurants ON menus.rid = restaurants.rid WHERE menus.name LIKE \"%" + req.body.to_search + "%\";";
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
          
    connection.query(sql, function(err, result){
      connection.release();
      if (err) {
        res.writeHead(202,{
          'Content-Type' : 'text/plain'
        })
        res.end("failed");
      }
      else {
        res.writeHead(200,{
          'Content-Type' : 'application/json'
        })
        console.log("result", result);
        res.end(JSON.stringify(result));
      }
    });
  });
})


app.post('/addItem', upload.single('myImage'), (req, res) => {
  console.log("req.file::", req.file.path);
  console.log("type", typeof(fs.readFileSync(req.file.path)));
  let sql = "INSERT INTO menus (rid, name, description, price, sid, menu_image) VALUES (" + req.body.rid
       + ", \"" + req.body.name + "\", \"" + req.body.description + "\", " + req.body.price + ", " + req.body.sid
       + ", " + "?);";
  let values = fs.readFileSync(req.file.path);
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, values, function(err){
        connection.release();
        if (err) throw err;
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("image too large");
        }
        else {
          fs.unlinkSync(req.file.path);
          res.writeHead(200,{
            'Content-Type' : 'application/json'
          })
          res.end("success");
        }
    });
  });
});

app.post('/updateItem', upload.single('myImage'), (req, res) => {
  console.log("req.file::", req.file.path);
  console.log("test", req.body);
  let sql = "UPDATE menus SET name = \"" + req.body.name + "\", description = \"" + req.body.description 
  + "\", price = " + req.body.price + ", menu_image = ? WHERE mid = " + req.body.mid + ";";
  let values = fs.readFileSync(req.file.path);
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, values, function(err){
        connection.release();
        if (err) throw err;
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("image too large");
        }
        else {
          fs.unlinkSync(req.file.path);
          res.writeHead(200,{
            'Content-Type' : 'application/json'
          })
          res.end("success");
        }
    });
  });
});

app.post('/deleteItem', function(req,res){
  let sql1 = "DELETE FROM menus WHERE mid = " + req.body.mid + ";";
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
          
    connection.query(sql1, function(err){
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

app.post('/menu', function(req,res){
  console.log("req.body.userid", req.body.userid);
  let rid;
  let sql1 = "SELECT rid FROM restaurants WHERE oid = " + req.body.userid.toString() + ";";
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql1, function(err, result){
      if (err) {
        res.writeHead(202,{
          'Content-Type' : 'text/plain'
        })
        res.end("failed");
      }
      else {
        rid = (result[0].rid).toString();
        let sql2 = "SELECT sid, sname FROM sections WHERE rid = " + rid + ";";
        connection.query(sql2, function(err, result){
          if (err) {
            res.writeHead(202,{
              'Content-Type' : 'text/plain'
            })
            res.end("failed");
          }
          else {
            let sid_list = [];
            let sname_list = [];
            let info = [];
            let i;
            for (i=0; i< result.length; i++) {
              sid_list.push(result[i].sid);
              sname_list.push(result[i].sname);
              let sql3 = "SELECT mid, name, description, price, menu_image FROM menus WHERE rid = " + 
                    rid + " AND sid = " + result[i].sid.toString() + ";";
              connection.query(sql3, function(err, result){
                if (err) {
                  res.writeHead(202,{
                    'Content-Type' : 'text/plain'
                  })
                  res.end("failed");
                }
                else {
                  
                  if (result.length !== 0) {
                    for (let j=0; j < result.length; j++) {
                      const buf = new Buffer.from(result[j].menu_image, "binary");
                      let image = buf.toString('base64');
                      result[j].menu_image = image;
                    }
                  }
                  info.push(result);
                }
              });
            }
            setTimeout( function(){
              connection.release();
              let final = [];
              final.push(sid_list);
              final.push(sname_list);
              final.push(info);
              final.push(rid);
              final.push(sname_list.length);
              
              res.writeHead(200,{
                'Content-Type' : 'application/json'
              })
              
              res.end(JSON.stringify(final));
            }, 200 );
          }
        });   
      }
    });

  });
})

app.post('/addSection', function(req,res){
  let rid = req.body.rid;
  let sql1 = "SELECT sid FROM sections WHERE rid = " + rid.toString() + " AND sname = \"" + req.body.section_name + "\";";
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
          
    connection.query(sql1, function(err, result){
      if (err) {
        res.writeHead(202,{
          'Content-Type' : 'text/plain'
        })
        res.end("failed");
      }
      if (result.length === 0) {
        let sql2 = "INSERT INTO sections (rid, sname) VALUES (" + rid.toString() + ", \"" + req.body.section_name +"\");";
        connection.query(sql2, function(err, result){
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
      }
      else {
        res.writeHead(203,{
          'Content-Type' : 'text/plain'
        })
        res.end("section name already exist");
      }
    });
  });
})

app.post('/deleteSection', function(req,res){
  let sql1 = "DELETE FROM sections WHERE rid = " + req.body.rid + " AND sid = " + req.body.sid + ";";
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
          
    connection.query(sql1, function(err){
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

app.post('/updateSection', function(req,res){
  let rid = req.body.rid;
  let sql1 = "SELECT sid FROM sections WHERE rid = " + rid.toString() + " AND sname = \"" + req.body.update_section_name + "\";";
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
          
    connection.query(sql1, function(err, result){
      if (err) {
        res.writeHead(202,{
          'Content-Type' : 'text/plain'
        })
        res.end("failed");
      }
      if (result.length === 0) {
        let sql2 = "UPDATE sections SET sname = \"" + req.body.update_section_name + "\" WHERE rid = " + req.body.rid 
            + " AND sid = " + req.body.sid + ";";
        connection.query(sql2, function(err, result){
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
      }
      else {
        res.writeHead(203,{
          'Content-Type' : 'text/plain'
        })
        res.end("section name already exist");
      }
    });
  });
})

app.post('/ohome', function(req,res){
  console.log("req.body.userid", req.body.userid);
  let rid;
  let sql1 = "SELECT rid FROM restaurants WHERE oid = " + req.body.userid.toString() + ";";
  
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql1, function(err, result){
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("failed");
        }
        else {
          //console.log("reuslt: ", result[0]);
          rid = result[0].rid;
          let sql2 = "SELECT order_id, cid, status, items, cname, caddress FROM orders WHERE rid = " + rid.toString() + ";";
          if (req.body.show_no_delivered && !req.body.show_delivered) {
            sql2 = "SELECT order_id, cid, status, items, cname, caddress FROM orders WHERE rid = " + rid.toString() 
              + " AND status != \"delivered\";";
          }
          else if (!req.body.show_no_delivered && req.body.show_delivered) {
            sql2 = "SELECT order_id, cid, status, items, cname, caddress FROM orders WHERE rid = " + rid.toString() 
              + " AND status = \"delivered\";";
          }
          connection.query(sql2, function(err, info){
            connection.release();
            if (err) {
              res.writeHead(202,{
                'Content-Type' : 'text/plain'
              })
              res.end("failed");
            }
            else {
                  res.writeHead(200,{
                    'Content-Type' : 'application/json'
              })
              res.end(JSON.stringify(info));
            }
          });
        }
    });
  });
})

app.post('/ohomeChange', function(req,res){
  console.log("req.body.userid", req.body.userid);
  let sql = "UPDATE orders SET status = \"" + req.body.new_status + "\" WHERE order_id = " + req.body.order_id + ";";
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, function(err){
        connection.release();
        //if (err) throw err;
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

app.post('/ohomeCancel', function(req,res){
  console.log("req.body.userid", req.body.userid);
  let sql = "DELETE FROM orders WHERE order_id = " + req.body.order_id + ";";
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, function(err){
        connection.release();
        //if (err) throw err;
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
});


app.post('/oaccount1', function(req,res){
  console.log("req.body.userid", req.body.userid);
  let info;
  let sql1 = "SELECT fname, lname, email, rname, profile_image FROM owners WHERE oid = " + req.body.userid + ";";
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql1, function(err, result){
        //connection.release();
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("failed");
        }
        else {
          if (result[0].profile_image === null) {
            info = {
              ...result[0],
              pimage_result: "no image"
            }
          }
          else {
            const buf = new Buffer.from(result[0].profile_image, "binary");
            info = {
              ...result[0],
              pimage_result: buf.toString('base64')
            }
          }
        }
    });
    let sql2 = "SELECT phone, cuisine, restaurant_image FROM restaurants WHERE oid = " + req.body.userid.toString() + ";";
    connection.query(sql2, function(err, result){
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
          'Content-Type' : 'application/json'
        })
        if (result[0].restaurant_image === null) {
          info = {
            ...info,
            ...result[0],
            rimage_result: "no image"
          }
        }
        else {
          const buf = new Buffer.from(result[0].restaurant_image, "binary");
          info = {
            ...info,
            ...result[0],
            rimage_result: buf.toString('base64')
          }
        }
        res.end(JSON.stringify(info));
      }
    });

  });
})

app.post('/oaccount2', function(req,res){
  let sql = "UPDATE owners SET fname = ?, lname = ?, email = ?, rname = ? WHERE oid = ?;";
  let values = [req.body.fname, req.body.lname, req.body.email, req.body.rname, req.body.userid];
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, values, function(err, result){
        //connection.release();
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("failed");
        }
        else {
          let sql2 = "UPDATE restaurants SET rname = ?, phone = ?, cuisine = ? WHERE oid = ?;";
          let values2 = [req.body.rname, req.body.phone, req.body.cuisine, req.body.userid];
          connection.query(sql2, values2, function(err, result){
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
        }
    });
  });
})

app.post('/oaccount3', upload.single('myImage'), (req, res) => {
  //console.log("all files", req.body.userid);
  //console.log("req.file::", req.file.path);
  let sql = "UPDATE owners SET profile_image = ? WHERE oid = " + req.body.userid + ";";
  let values = fs.readFileSync(req.file.path);
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, values, function(err, result){
        connection.release();
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("image too large");
        }
        else {
          fs.unlinkSync(req.file.path);
          res.writeHead(200,{
            'Content-Type' : 'application/json'
          })
          res.end("success");
        }
    });
  });
});

app.post('/oaccount4', upload.single('myImage'), (req, res) => {
  console.log("test  all files", req.body.userid);
  console.log("req.file::", req.file.path);
  let sql = "UPDATE restaurants SET restaurant_image = ? WHERE oid = " + req.body.userid + ";";
  let values = fs.readFileSync(req.file.path);
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, values, function(err, result){
        connection.release();
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("image too large");
        }
        else {
          fs.unlinkSync(req.file.path);
          res.writeHead(200,{
            'Content-Type' : 'application/json'
          })
          res.end("success");
        }
    });
  });
});

app.post('/account3', upload.single('myImage'), (req, res) => {
  console.log("all files", req.body.userid);
  console.log("req.file::", req.file.path);
  //console.log("userid: ", req.body.userid);
  let sql = "UPDATE customers SET profile_image = ? WHERE cid = " + req.body.userid + ";";
  let values = fs.readFileSync(req.file.path);
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, values, function(err, result){
        connection.release();
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("image too large");
        }
        else {
          fs.unlinkSync(req.file.path);
          res.writeHead(200,{
            'Content-Type' : 'application/json'
          })
          res.end("success");
        }
    });
  });
});



app.post('/account1', function(req,res){
  console.log("req.body.userid", req.body.userid);
  let sql = "SELECT fname, lname, email, phone, profile_image FROM customers WHERE cid = " + req.body.userid + ";";
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, function(err, result){
        connection.release();
        if (err) {
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("failed");
        }
        else {
          // res.writeHead(200,{
          //   'Content-Type' : 'image/png'
          // })
          // const buf = new Buffer.from(result[0].profile_image, "binary");
          // res.end(buf.toString('base64'));
          res.writeHead(200,{
               'Content-Type' : 'application/json'
          })
          let info;
          if (result[0].profile_image === null) {
            info = {
              ...result[0],
              image_result: "no image"
            }
          }
          else {
            const buf = new Buffer.from(result[0].profile_image, "binary");
            info = {
              ...result[0],
              image_result: buf.toString('base64')
            }
          }
          
          res.end(JSON.stringify(info));
        }
    });
  });
})

app.post('/account2', function(req,res){
  let sql = "UPDATE customers SET fname = ?, lname = ?, email = ?, phone = ? WHERE cid = ?;";
  let values = [req.body.fname, req.body.lname, req.body.email, req.body.phone, req.body.userid];
  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, values, function(err, result){
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
  //let sql = "INSERT INTO customers (email, password, fname, lname) VALUES ?; SELECT cid FROM customers WHERE email = " + req.body.email + ";";
  let sql = "INSERT INTO customers (email, password, fname, lname) VALUES ?;";
  let values = [[req.body.email, req.body.password, req.body.fname, req.body.lname]];

  pool.getConnection(function(err,connection){
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, [values], function(err){
        if (err) {
          connection.release();
          res.writeHead(202,{
            'Content-Type' : 'text/plain'
          })
          res.end("failed");
        }
        else {
          let sql2 = "SELECT cid FROM customers WHERE email = \"" + req.body.email + "\";";
          connection.query(sql2, function(err, result){
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
              res.end((result[0].cid).toString());
            }
          });
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
          res.end(id_res.toString());
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