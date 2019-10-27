//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var kafka = require('./kafka/client');
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

//Route to get All Books when user visits the Home Page
/*app.get('/books', function(req,res){   
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    res.end(JSON.stringify(books));
    
});
*/

app.post('/', function(req, res){
    console.log("test", req.body);
    kafka.make_request('post_book',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            //console.log(results);
            // res.writeHead(202,{
            //     'Content-Type' : 'application/json'
            // })
            // res.json({
            //     updatedList:results
            // });

            res.end();
        }
        
    });
});

app.post('/csignup', function(req, res){
    console.log("test", req.body);
    kafka.make_request('csignup',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            //console.log(results);
            // res.writeHead(202,{
            //     'Content-Type' : 'application/json'
            // })
            // res.json({
            //     updatedList:results
            // });

            res.end();
        }
        
    });
});





// app.post('/book', function(req, res){

//     kafka.make_request('post_book',req.body, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.json({
//                 status:"error",
//                 msg:"System Error, Try Again."
//             })
//         }else{
//             console.log("Inside else");
//                 res.json({
//                     updatedList:results
//                 });

//                 res.end();
//             }
        
//     });
// });
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");