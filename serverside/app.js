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


//PRESCRIPTIONS
//in the app.get() method below we add a path for the students API 
//by adding /students, we tell the server that this method will be called every time http://localhost:8000/students is requested. 
app.get('/prescriptions', (req, res, next) => {
    //call mongoose method find (MongoDB db.Students.find())
Prescription.find() 
//if data is returned, send data as a response 
.then(data => res.status(200).json(data))
//if error, send internal server error
.catch(err => {
console.log('Error: ${err}');
res.status(500).json(err);
});

});

//serve incoming post requests to /students
app.post('/prescriptions', (req, res, next) => {
    // create a new student variable and save request’s fields 
    const prescription = new Prescription({
        dName: req.body.dName,
        strength: req.body.strength
    });
    //send the document to the database 
    prescription.save()
        //in case of success
        .then(() => { console.log('Success');})
        //if error
        .catch(err => {console.log('Error:' + err);});
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/prescriptions/:id", (req, res, next) => {
    Prescription.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//serve incoming put requests to /students 
app.put('/prescriptions/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        Prescription.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                dName : req.body.dName, 
                strength : req.body.strength 
            }}, 
            {new:true} 
        ) 
        .then((prescription) => { 
            if (prescription) { //what was updated 
                console.log(prescription); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

//in the app.get() method below we add a path for the students API 
//find a student based on the id
app.get('/prescriptions/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Students.findOne())
    Prescription.findOne({_id: req.params.id}) 
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});
//END PRESCRIPTIONS

module.exports = app;