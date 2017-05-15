var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Course = require("./api/models/course");
var bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/coursedb"); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var auth = require("./api/users/users");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(
  	function(username, password, cb) {
	    auth.users.authenticate(username, password, function(err, success) {
		      	if (err) { 
		      		return cb(err); 
		      	}
		      	if (!success) { 
		      		return cb(null, false); 
		      	} else {
		      		return cb(null, true); 
		      	}
	    });
	}
));

app.use(passport.initialize());
app.use(passport.session());

app.use('/courses/:id', 
 	passport.authenticate('local', { failureRedirect: '/login' }),
	function (req, res, next) {
  		console.log('Request Type:', req.method)
  		next();
	}
);

var routes = require("./api/routes/courseRoutes");
routes(app);

app.use(express.static("public"))

app.get("/", function (req, res) {
  	res.redirect("index.html");
})

app.listen(8080)