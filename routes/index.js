const express = require('express');
const {Router} = require("express");
const router = express.Router();
router.get('/',(req,res) =>{
  res.send('Hello World! from index.js router');
});

const cbC1 = (req,res,next) => {
    console.log('cbC1');
    next();
}
const cbC2=function (req,res,next){
    console.log('cbC2');
    next();
}
const cbC3=  (req,res) => {
    res.send('this is function cbC3');
};
router.post('/',(req,res)=> {
    console.log(req.body);
    res.send('recieved a post request');
});

router.get('/example/c',[cbC1,cbC2,cbC3])

module.exports = router;