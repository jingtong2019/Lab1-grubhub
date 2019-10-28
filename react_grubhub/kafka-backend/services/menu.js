var MongoClient = require('mongodb').MongoClient;
var mydb;
var config = require('../config/settings');

// Initialize connection once
MongoClient.connect(config.mongodb, function(err, database) {
  if(err) throw err;
  mydb = database;
});


function handle_request(msg, callback){
    var response = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    let collection = mydb.collection('restaurants');

    var query = {'oid' : msg.userid};
    collection.find(query).toArray(function(err,result){
        if (err) {
            response.code = "202";
            response.value = "Can not find this restaurant";
            callback(err,response);
        }
        else {
            response.code = "200";
            response.value = "Successfully find this restaurant";
            response.rid = result[0]._id;
            callback(null,response);
        }
    });

}

exports.handle_request = handle_request;




