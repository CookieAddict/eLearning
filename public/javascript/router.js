
angular.module("eLearningApp")
.config(function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise("/courses");

	$stateProvider

	.state("home", {
            // url: "/",
            templateUrl: "/templates/home.html"
    })	

	.state("home.courses", {
            url: "/courses",
            templateUrl: "/templates/courses.html"
    })	

	.state("home.details", {
            url: "/details",
            templateUrl: "/templates/courseDetails.html"
    })	


	.state("home.new", {
            url: "/details",
            templateUrl: "/templates/newCourse.html"
    })	
})