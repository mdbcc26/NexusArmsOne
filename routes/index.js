const express = require('express');
const {Router} = require("express");
const router = express.Router();

router.get('/',(req,res) =>{
    res.render('index',{title:'Express'});
    //res.send('Hello World! from index.js router');
});

router.route('/tony/picture')
    .get((req, res)=> {
        res.send('GET request for pictures of the user "tony"');
    })
    .post((req, res) => {
        res.send('POST request for pictures of the user "tony"');
    })

router.post('/',(req,res)=>{
    console.log(req.body);
    res.send(' received a POST request for pictures of the user "tony"');
})
/*
const cbC1 = (req,res,next) => {
    console.log('cbC1');
    next();
}
const cbC2=function (req,res,next){
    console.log('cbC2');
    next();

const cbC3=  (req,res) => {
    res.send('this is function cbC3');
};
router.get('/example/c',[cbC1,cbC2,cbC3])
 */

router.post('/',(req,res)=> {
    console.log(req.body);
    res.send('recieved a post request');
});

router.get('/cookies',(req,res)=>{
    let counter =req.cookies['visitCounter'];
    console.log('Current value',counter)
    if(isNaN(counter))counter=0;
    counter++;
    console.log('New counter value', counter);
    res.cookie('visitCounter',counter,{maxAge:2*60*60*1000});
    res.send('Cookie was set to '+ counter);
})


module.exports = router;