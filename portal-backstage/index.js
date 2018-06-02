const express = require('express')
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const musicRouter = require('./routes/music163')
const app = express()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser());

const port = process.env.PORT || 2222;

app.use('/api/music163', musicRouter);

app.use(function(req, res, next) {
    next(createError(404));
});


app.listen(port);
console.log('Magic happens on port ' + port);