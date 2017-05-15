'use strict';
module.exports = function(app) {

	var course = require('../controllers/courseController');

	app.route('/courses')
	  	.get(course.getAll);

  	app.route('/courses/:id')
  		.post(course.create)
    	.get(course.getDetails)
    	.put(course.update)
    	.delete(course.delete);
};