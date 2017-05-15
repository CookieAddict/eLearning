CourseFactory = function($resource) {
	return $resource('/courses/:id', { id: '@id' }, {
    	update: {
     	 	method: 'PUT'
    	}
  	});
}

angular.module("eLearningApp").factory("Course", CourseFactory);

angular.module("eLearningApp.controllers")
.controller("mainController", function($scope, $state, $http, Course) {

	$scope.courses = [];
	$scope.filteredCourses = [];
	$scope.course = new Course();

  	$scope.page = {"current":"1"};
  	$scope.page.coursesPerPage = 1;
  	$scope.maxSize = 5;

  	$scope.loadPage = function() {
	    begin = (($scope.page.current - 1) * $scope.page.coursesPerPage);
	    end = begin + $scope.page.coursesPerPage;
	    
	    $scope.filteredCourses = $scope.courses.slice(begin, end);
  	};	

  	$scope.viewDetails = function(c) {
  		$scope.course = new Course();
  		$scope.course._id = c._id;
		$scope.course.id = c.id;
		$scope.course.title = c.title;
		$scope.course.slug = c.slug;
		$scope.course.description = c.description;
		$scope.course.language = c.language;
		$scope.course.lessons_count = c.lessons_count;
		$scope.course.skill = c.skill;
		$scope.course.time = c.time;
		$scope.course.last_update = c.last_update;
		$scope.course.imageSrc = c.imageSrc;
  		$state.go("home.details");
  	}

  	$scope.viewNewPage = function() {
  		$scope.course = new Course();
  		$state.go("home.new");
  	}

  	$scope.save = function() {
  		$scope.course.last_update = Date.now();
  		
  		$scope.course.$save().then( function() {
  			console.log("Course saved");
  			$scope.refreshData();
  			alert("Course saved");
  		}, function () {
  			console.log("Save failed");
  			alert("Course failed");
  		}) 

  		$state.go("home.courses");
  	}

  	$scope.update = function() {
  		$scope.course.last_update = Date.now();
  		
  		$scope.course.$update().then( function() {
  			console.log("Course updated");
  			$scope.refreshData();
		 	alert("Course updated");
  		}, function () {
  			console.log("Update failed");
  			alert("Update failed");
  		}) 

  		
  		$state.go("home.courses");
  	}

  	$scope.delete = function() {
  		
  		$scope.course.$delete().then( function() {
  			console.log("Course deleted");
  			$scope.refreshData();
  			alert("Course deleted");
  		}, function () {
  			console.log("Delete failed");
  			alert("Delete failed");
  		}) 

  		$state.go("home.courses");
  	}

  	$scope.refreshData = function() {

		$scope.courses = Course.query().$promise.then(function (result) {
			$scope.courses = result;
			$scope.totalCourses = $scope.courses.length;
	   		$scope.loadPage();
		});
  	}

  	$scope.refreshData();

  	$scope.loadJsonData = function() {
	    $http.get('/data/inventory.json').then(function(result) {
		   	data = result.data	

	   		for (i = 0; i < data.length; i++) {
	   			jsonCourse = data[i];

				newCourse = new Course();
				newCourse.id = jsonCourse.id;
				newCourse.title = jsonCourse.title;
				newCourse.slug = jsonCourse.slug;
				newCourse.description = jsonCourse.description;
				newCourse.language = jsonCourse.language;
				newCourse.lessons_count = jsonCourse.lessons_count;
				newCourse.skill = jsonCourse.skill;
				newCourse.time = jsonCourse.time;
				newCourse.last_update = jsonCourse.last_update;
				newCourse.imageSrc = jsonCourse.graphic.src;

				newCourse.$save();
			}

			$scope.refreshData();
		});
  	}

})