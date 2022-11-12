const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Doctor = require('../models/doctor');

/* GET ALL DOCTORS */
router.get('/', (req, res, next) => {
    Doctor.find((err, doctors) => {
        if(err) return next(err);
        res.json(doctors)
    });
});

/* GET SINGLE DOCTOR BY ID */
router.get('/details/:id', (req, res, next) => {
    Doctor.findById(req.params.id, (err, doctor) => {
        if (err) return next(err);
        res.json(doctor)
    });
});

/* ADD NEW DOCTOR INFO */
router.post('/new-doctor', (req, res, next) => {
    console.log("serverside ====> ", req.body )
    const newDoctor = new Doctor(req.body.data)
    Doctor.create(newDoctor, (err, doctor) => {
        if (err) return next(err);
        res.json(doctor);
    });
});

/* UPDATE DOCTOR INFO */
router.put('/details/:id', (req, res, next) => {
    Doctor.findByIdAndUpdate(req.params.id, req.body.data, (err, doctor) => {
        if (err) return next(err);
        res.json(doctor);
    });
});

/* DELETE DOCTOR INFO */
router.delete('/details/:id', (req, res, next) => {
    Doctor.findByIdAndRemove(req.params.id, req.body, (err, doctor) => {
        if (err) return next(err);
        res.json(doctor);
    });
});

module.exports = router;