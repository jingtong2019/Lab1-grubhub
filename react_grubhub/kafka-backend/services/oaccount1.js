var MongoClient = require('mongodb').MongoClient;
var mydb;
var config = require('../config/settings');
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect(config.mongodb, config.dbsetting, function(err, database) {
  if(err) throw err;
  mydb = database;
});



function handle_request(msg, callback){
    var response = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    let collection = mydb.collection('owners');
    let query = {'_id': ObjectId(msg.userid)}
    collection.find(query).toArray(function(err,res){
        if (err) {
            response.code = "202";
            response.value = "Can not find the owner";
            callback(err,response);
        }
        else {
            response.code = "200";
            response.value = "Successfully added this image";
            response.fname = res[0].fname;
            response.lname = res[0].lname;
            response.rname = res[0].rname;
            response.email = res[0].email;
            if ('profile_image' in res[0]) {
                const buf = new Buffer.from(res[0].profile_image.data, "binary");
                response.pimage_result = buf.toString('base64');
            }
            else {
                response.pimage_result = "no image";
            }

            callback(null,response);
        }

    });

}

exports.handle_request = handle_request;




