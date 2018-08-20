const express = require("express");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var allRoutes = require("./routes/allRoutes");
var cors = require("cors");

//connecting to mongoLab test database
mongoose.connect('mongodb://pranav:pranav1234@ds125352.mlab.com:25352/shrturl');
//Handle uncaught exceptions
process.on("uncaughtException", function (error) {
    console.log(error.stack);
    console.log("Node NOT Exiting...");
});
//Create Express applications
var app = express();
app.set("views", __dirname + "/views");
app.use(cors()); //for cross browser comm
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
// Use environment defined port or 3000
var port = process.env.PORT || 3000;
//create express router
var router = express.Router();
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    //res.send("Hello World");
});
//Logging each API request on console
router.use(function (req, res, next) {
    // log each request to the console
    console.log("RouteLog>>" + req.method, req.url);

    var now = new Date().toString();
    var log = `${now}:${req.method}=>${req.url} \nBody:${JSON.stringify(
      req.body
    )} \nHeader:${JSON.stringify(req.headers.authorization)}\n\n`;
    next();
});

//Register your routes with the API
app.use("", router);
app.use("", allRoutes);



//Start server on Port 7000
app.listen(port, () => {
    console.log(`Server started on port`, port);
});