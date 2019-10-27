var db = require('../app/db');


function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    if (!msg.email || !msg.password) {
        // res.code = "400";
        // res.value = "Please enter username and password";
        callback(err,"Error");
    } else {
        var newUser = {
            username: msg.email,
            password: msg.password
        };

        // Attempt to save the user
        db.createUser(newUser, function (res) {
            // res.code = "200";
            // res.value = "Successfully created new user";
            callback(null,"Success");
        }, function (err) {
            console.log(err);
            // res.code = "400";
            // res.value = "That username address already exists";
            callback(err,res);
        });
    }

}

exports.handle_request = handle_request;







// var MongoClient = require('mongodb').MongoClient;

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
//         console.log("msg -------------", msg);
//         var query = {'email' : msg.email, 'password': msg.password};
//         customers.insert(query, {w:1}, function(err, result) {
//             if(err){
//                 //throw err;
//                 callback(err,"Error");
//             }
//             else{
//                 callback(null,"Success");
//             }
//         });
//       }
//     });
// }

// exports.handle_request = handle_request;


