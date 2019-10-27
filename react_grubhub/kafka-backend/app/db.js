'use strict';
//var mysql = require('mysql');
var crypt = require('./crypt');
//var config = require('../config/settings');
var db = {};
// Creating a connection object for connecting to mysql database
var MongoClient = require('mongodb').MongoClient;
var mydb;

// Initialize connection once
MongoClient.connect('mongodb://localhost/mydb', function(err, database) {
  if(err) throw err;
  mydb = database;
});

// var connection = mysql.createConnection({
//     host: config.database_host,
//     port: config.database_port,
//     user: config.database_user,
//     password: config.database_password,
//     database: config.database_name,
//     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
// });

//Connecting to database
// connection.connect(function (err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('connected as id ' + connection.threadId);
// });


db.createUser = function (user, successCallback, failureCallback) {
    var passwordHash;
    crypt.createHash(user.password, function (res) {
        passwordHash = res;

        let customers = mydb.collection('customers');
        var query = {'email' : user.username, 'password': passwordHash};
        customers.insert(query, {w:1}, function(err, result) {
            if(err){
                console.log(err);
                failureCallback(err);
                return;
            }
            successCallback();
        });
    }, function (err) {
        console.log(err);
        failureCallback();
    });
};

db.findUser = function (user, successCallback, failureCallback) {
    let customers = mydb.collection('customers');
    var query = {'email' : user.username};
    customers.find(query).toArray(function(err,result){
        if (err) {
            failureCallback(err);
            return;
        }
        if (result.length > 0) {
            successCallback(result[0])
        } else {
            failureCallback('User not found.');
        }
    });
};

module.exports = db;