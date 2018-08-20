var mongoose = require('mongoose');

var analyticsSchema = new mongoose.Schema({
    shorturlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shorturl'
    },
    shortCode: String,
    ua: String,
    browser: {
        name: String,
        version: String
    },
    engine: {
        name: String,
        version: String
    },
    os: {
        name: String,
        version: String
    },
    // device: {
    //     model: String,
    //     type: String,
    //     vendor: String
    // },
    cpu: {
        architecture: String
    },
    addedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Analytics', analyticsSchema);