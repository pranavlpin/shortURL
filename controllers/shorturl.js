//controller has two functions, 
//to shorten URL,
//redirect to original URL on posting short URL

//requiring the model
var Shorturl = require('../models/Shorturl');
var Analytics = require('../models/Analytics');
const validUrl = require("valid-url");
const shortid = require("shortid");
var parser = require('ua-parser-js');

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
                originalURL: req.body.originalUrl,
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

//Creating function to redirect to original URL
exports.getRedirecturl = function (req, res) {
    console.log(req.params.shorturl);
    Shorturl.findOne({
        shortCode: req.params.shorturl
    }, function (err, shUrl) {
        if (shUrl) {
            //reading information from user-agent
            var ua = parser(req.headers['user-agent']);
            var analytics = new Analytics({
                ua: ua.ua,
                browser: ua.browser,
                engine: ua.engine,
                os: ua.os,
                cpu: ua.cpu,
            });
            analytics.shortCode = req.params.shorturl;
            analytics.shorturlId = shUrl._id;
            // write the result as response
            console.log(JSON.stringify(req.headers['user-agent'], null, '  '));
            analytics.save(function (err) {
                if (err) {
                    console.log("ERROR in saving Analytics data", err);
                } else {
                    console.log("Analytics details added to database");
                }
            })
            res.redirect(shUrl.originalURL);
        } else {
            res.json({
                error: err
            });
        }
    });
}

exports.postUrlAnalytics = function (req, res) {
    Analytics.find({
        shortCode: req.body.shortCode
    }, function (err, analytics) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                visits: analytics.length,
                data: analytics
            });
        }
    });
}