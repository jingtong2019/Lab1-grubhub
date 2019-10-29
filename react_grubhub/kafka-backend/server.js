'use strict';
// Include our packages in our main server file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var cors = require('cors');
var app = express();


// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});


// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Log requests to console
app.use(morgan('dev'));

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);

var connection =  new require('./kafka/Connection');

//topics files
//var signin = require('./services/signin.js');
var Login = require('./services/login.js');
var Csignup = require('./services/csignup.js');
var Osignup = require('./services/osignup.js');
var Osignup2 = require('./services/osignup2.js');
var Menu = require('./services/menu.js');
var AddSection = require('./services/addSection.js');
var UpdateSection = require('./services/updateSection.js');
var DeleteSection = require('./services/deleteSection.js');
var AddItem = require('./services/addItem.js');
var UpdateItem = require('./services/updateItem.js');
var DeleteItem = require('./services/deleteItem.js');
var Oaccount1 = require('./services/oaccount1.js');
var Oaccount2 = require('./services/oaccount2.js');
var Oaccount3 = require('./services/oaccount3.js');
var Oaccount4 = require('./services/oaccount4.js');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login",Login)
handleTopicRequest("csignup",Csignup)
handleTopicRequest("osignup",Osignup)
handleTopicRequest("osignup2",Osignup2)
handleTopicRequest("menu",Menu)
handleTopicRequest("addSection",AddSection)
handleTopicRequest("updateSection",UpdateSection)
handleTopicRequest("deleteSection",DeleteSection)
handleTopicRequest("addItem",AddItem)
handleTopicRequest("updateItem",UpdateItem)
handleTopicRequest("deleteItem",DeleteItem)
handleTopicRequest("oaccount1",Oaccount1)
handleTopicRequest("oaccount2",Oaccount2)
handleTopicRequest("oaccount3",Oaccount3)
handleTopicRequest("oaccount4",Oaccount4)