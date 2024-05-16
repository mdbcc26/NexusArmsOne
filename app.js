const express = require('express');
const app = express();
const port = 3000;

const db = require('./services/database.js');

const path = require('path');
const ejs =require('ejs');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

const bodyParcer =require('body-parser');
app.use(bodyParcer.json())
app.use(bodyParcer.urlencoded({extended:true}))

const cookieParser= require('cookie-parser');
app.use(cookieParser());


const indexRouter =require ('./routes/index');
const userRouter =require('./routes/users');


app.use('/',indexRouter);
app.use('/users',userRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
// this is igors branch