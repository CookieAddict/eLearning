'use strict';
var mongoose = require('mongoose');
var Course = mongoose.model('Course');

exports.getAll = function(req, res) {
	Course.find({}, function(err, course) {
    	if (err) {
      		res.send(err);
    	}
    	res.json(course);
  	});
};

exports.create = function(req, res) {
  	var newCourse = new Course(req.body);
  	newCourse.save(function(err, course) {
	    if (err) {
	      	res.send(err);
	    }
	    res.json(course);
  	});
};

exports.getDetails = function(req, res) {
  	Course.findById(req.params.id, function(err, course) {
	    if (err) {
	      	res.send(err);
	    }
	    res.json(course);
  	});
};

exports.update = function(req, res) {

	Course.findById(req.body._id, function (err, course) {  
	    if (err) {
	        res.status(500).send(err);
	    } else {
    		course.title = req.body.title;
			course.slug = req.body.slug;
			course.description = req.body.description;
			course.language = req.body.language;
			course.lessons_count = req.body.lessons_count;
			course.skill = req.body.skill;
			course.time = req.body.time;
			course.last_update = req.body.last_update;
			course.imageSrc = req.body.imageSrc;

	        course.save(function (err, course) {
	            if (err) {
	                res.status(500).send(err)
	            }
	            res.send(course);
	        });
	    }
});
};

exports.delete = function(req, res) {
  	Course.remove({
    	id: req.params.id
  	}, function(err, course) {
    	if (err) {
      		res.send(err);
    	}
    	res.json({ message: 'Course successfully deleted' });
  	});
};