var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('backend', function(){

    it('POST /',function(){
        let req = {
            usertype: "customers",
            email: "zhizhouyang@gmail.com",
            password: "1234"
        }
        agent.post('/')
            .send(req)
            .then(function(res){
                expect(res.body.userid).to.equal('2');
                expect(res.body.fname).to.equal('Zhizhou');
            });
        req = {
            usertype: "Restaurant Owner",
            email: "tongjing2014@gmail.com",
            password: "1234"
        }
        agent.post('/')
            .send(req)
            .then(function(res){
                expect(res.body.userid).to.equal('1');
                expect(res.body.fname).to.equal('Jing');
            });
    });

    it('POST /csignup',function(){
        let req = {
            email: "ddd@gmail.com",
            password: "abcd",
            fname: "Jing",
            lname: "Tong"
        }
        agent.post('/csignup')
            .send(req)
            .then(function(res){
                expect(res.body.cid).to.equal(7);
            });
    });

    it('POST /account2',function(){
        let req = {
            cid: 4,
            email: "Alice@gmail.com",
            fname: "Alice",
            lname: "Wang",
            phone: "4122343321"
        }
        agent.post('/account2')
            .send(req)
            .then(function(res){
                expect(res.status).to.equal(200);
            });
        
    });

    it('POST /addSection',function(){
        let req = {
            rid: 2,
            section_name: "Snack"
        }
        agent.post('/addSection')
            .send(req)
            .then(function(res){
                expect(res.status).to.equal(200);
            });
        
    });

    it('POST /place',function(){
        let req = {
            rid: 2,
            cid: 3,
            status: 'new',
            items: '1,eggroll,2,4.5;',
            cname: 'Alex',
            caddress: '1345 blvd'
        }
        agent.post('/place')
            .send(req)
            .then(function(res){
                expect(res.status).to.equal(200);
            });
        
    });
})

