const express = require('express');
const app = express();
const port = 3000;

const bodyParcer =require('body-parser');
app.use(bodyParcer.json())
app.use(bodyParcer.urlencoded({extended:true}))

const indexRouter =require ('./routes/index');
const userRouter =require('./routes/users');



app.use('/',indexRouter);
app.use('/users',userRouter);


app.listen(port, () => {
    console.log(`Example app listening at
http://localhost:${port}`);
});
// this is igors branch