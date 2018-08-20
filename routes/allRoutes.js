var express = require('express');

var urlController = require('../controllers/shorturl');


var router = express.Router();

//POST request to generate shortened url and saving it in db
router
    .route("/shortenurl")
    .post(urlController.postShortenurl);

module.exports = router;