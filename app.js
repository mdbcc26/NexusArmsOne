const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const ws = require('./services/websockets.js');

//Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//Set up logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/requests.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
app.use(morgan('short'));

//Use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Serve static files
app.use(express.static('public'));

//Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('error', {error: err});
}
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

