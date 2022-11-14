const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Prescription = require('../models/prescription');

//PRESCRIPTIONS
//in the app.get() method below we add a path for the students API 
//by adding /students, we tell the server that this method will be called every time http://localhost:8000/students is requested. 
router.get('/prescriptions', (req, res, next) => {
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
router.post('/prescriptions', (req, res, next) => {
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
router.delete("/prescriptions/:id", (req, res, next) => {
    Prescription.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//serve incoming put requests to /students 
router.put('/prescriptions/:id', (req, res, next) => { 
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

//in the router.get() method below we add a path for the students API 
//find a student based on the id
router.get('/prescriptions/:id', (req, res, next) => {
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

module.exports = router;