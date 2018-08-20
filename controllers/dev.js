//requiring the model
var Shorturl = require('../models/Shorturl');
var Analytics = require('../models/Analytics');

//create endpoint for 'dev/analytics/' for POST
exports.getAnalyticsData = function (req, res) {
    Analytics.find(function (err, items) {
        if (err) {
            res.send(err);
        } else {
            res.json(items);
        }
    });
};

exports.getshorturlData = function (req, res) {
    Shorturl.find(function (err, items) {
        if (err) {
            res.send(err);
        } else {
            res.json(items);
        }
    });
};