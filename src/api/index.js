const express = require('express');
const db = require('../queries')

const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        message: "Welcome to API"
    });
});

router.get('/getAllActivity', db.getAllActivities)

router.get('/activity/:id', db.getActivityById)

router.put('/activity/:id', db.updateActivityById)

router.delete('/activity/:id', db.deleteActivityById)

router.post('/createActivity', db.createActivity)

module.exports = router;