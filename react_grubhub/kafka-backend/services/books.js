//var mongo = require('../mongodb');
//var mongo = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var mydb;

// Initialize connection once
MongoClient.connect('mongodb://localhost/mydb', function(err, database) {
  if(err) throw err;
  mydb = database;
});

function handle_request(msg, callback){
  var res = {};
  console.log("In handle request:"+ JSON.stringify(msg));
  // Connect to the db
  
  customers = mydb.collection('customers');
  var query = {email : msg.email};
  console.log("email", msg.email);
  customers.find(query).toArray(function(err,result){
      if(err){
          //throw err;
          callback(err,"Error");
      }
      if(result.length > 0){
          console.log(result);
          var pd = result[0].password;
          console.log("password:-----------", pd);
          callback(null,result);
      }
      else{
          callback(null,[]);
      }
  });

}

//var bcrypt = require('bcrypt');

// function handle_request(msg, callback){
//   res = {};
//   if(msg.email == "tongjing2014@gmail.com" && msg.password =="1234"){
//     res.code = "200";
//     res.value = "Success Login";

//   }
//   else{
//       res.code = "401";
//       res.value = "Failed Login";
//   }
//   callback(null, res);
// };

// function handle_request(msg, callback){
//     var res = {};
//     console.log("In handle request:"+ JSON.stringify(msg));
//     // Connect to the db
//     MongoClient.connect('mongodb://localhost/mydb', function(err, db) {
//       if(err) {
//         callback(null,"Cannot connect to db");
//       }
//       else {
//         console.log('Connected to mongodb');
//         customers = db.collection('customers');
//         var query = {email : msg.email};
//         console.log("email", msg.email);
//         customers.find(query).toArray(function(err,result){
//             if(err){
//                 //throw err;
//                 callback(err,"Error");
//             }
//             if(result.length > 0){
//                 console.log(result);
//                 var pd = result[0].password;
//                 console.log("password:-----------", pd);
//                 callback(null,result);
//             }
//             else{
//                 callback(null,[]);
//             }
//         });
//       }
//     });

// }

exports.handle_request = handle_request;


