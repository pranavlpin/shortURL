//controller has two functions, 
//to shorten URL,
//redirect to original URL on posting short URL

//requiring the model
var Shorturl = require('../models/Shorturl');
const validUrl = require("valid-url");
const shortid = require("shortid");

//creating function to shorten the URL
exports.postShortenurl = function (req, res) {
    if (req.body === null) {
        res.json({
            message: "No data received"
        });
    } else if (JSON.stringify(req.body) === '{}') {
        res.json({
            message: "No data received"
        });
    } else {
        if (validUrl.isUri(req.body.originalUrl)) {
            const urlCode = shortid.generate();
            //baseurl is the url of our app to append to short code generated
            var shortedurl = req.body.baseurl + '/' + urlCode;
            var item = new Shorturl({
                originalURL: originalUrl,
                shortURL: shortedurl,
                shortCode: urlCode,
            });
            item.save(function (err) {
                if (err) {
                    console.log("ERROR in saving shortened URL");
                    res.send(err);
                } else {
                    res.json({
                        message: "URL details added to database",
                        data: item,
                        shortenedurl: shortedurl
                    });
                }
            });
        } else {
            res.status(401).json({
                message: "Invalid Original Url"
            });
        }

    }
}