var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Course = require("./api/models/course");
var bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/coursedb"); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/courseRoutes");
routes(app);

app.use(express.static("public"))

app.get("/", function (req, res) {
  	res.redirect("index.html");
})

app.listen(8080)