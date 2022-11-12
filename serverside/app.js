const path = require('path')
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/doctor');


const app = express();

//connect to cloud database
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@designstudio-g7.ld5joe6.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('mongo database connection successful!!!!');
})
app.use((req, res, next) => {
    console.log('This line is always called!!!!');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/doctor', apiRoutes)
//catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use((req, res, next) => {
    console.log(err); // print error message

    //set locals only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err: {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.status).send(err.message);
});

module.exports = app;