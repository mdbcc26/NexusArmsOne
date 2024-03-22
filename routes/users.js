const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    res.send('Hello World! from users.js router');
});

router.route('/tony/picture')
    .get((req,res)=>{
        res.send('got a get request at /tony/picture');
    })
    .post((req,res)=>{
        res.send('post request for the picture of the user tony');
    })


router.get('/:id',(req,res) =>{
    console.log(req.params);
    res.send('Respond with the info for the user id '+ req.params.id);
});

module.exports = router;