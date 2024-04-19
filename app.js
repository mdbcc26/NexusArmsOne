const express = require('express');
const app = express();
const port = 3000;
const db = require('./services/database.js');

const path = require('path');
const ejs = require('ejs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening at
http://localhost:${port}`);
});

