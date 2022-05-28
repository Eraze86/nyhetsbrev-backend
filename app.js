var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require ("mongoose")
const cors = require("cors")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);


app.use(cors());
async function init(){
    try{

        await mongoose.connect("mongodb://localhost:27017/users")
        console.log("vi har connectat")
    }catch (error){
        console.error(error)
    }
}
init()

const MongoClient = require ("mongodb").MongoClient
MongoClient.connect("mongodb://127.0.0.1:27017",  {
    useUnifiedTopology: true
})
.then(client => {console.log("funkar")
const db = client.db("newLetter")
app.locals.db = db;
})


module.exports = app;
