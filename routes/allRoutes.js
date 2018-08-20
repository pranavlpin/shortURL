var express = require('express');

var urlController = require('../controllers/shorturl');


var router = express.Router();

//POST request to generate shortened url and saving it in db
router
    .route("/shortenurl")
    .post(urlController.postShortenurl);
//GET request to redirect short url to original url
router
    .route("/:shorturl")
    .get(urlController.getRedirecturl);
//POST request to get analytics detail for any shortened URL
router
    .route("/urlAnalytics")
    .post(urlController.postUrlAnalytics);
module.exports = router;