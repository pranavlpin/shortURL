//Adding routes here to read database values for development purpose only
var express = require('express');

var devController = require('../controllers/dev');


var router = express.Router();


//GET request to get analytics data
router
    .route("/dev/analytics")
    .get(devController.getAnalyticsData);
//GET request to get analytics data
router
    .route("/dev/shorturl")
    .get(devController.getshorturlData);

module.exports = router;