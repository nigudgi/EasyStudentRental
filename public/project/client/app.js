"use strict";

var app = angular.module("RentEasy", ["ngRoute", "google.places", "uiGmapgoogle-maps"]);

app.directive("navigation", function () {
    return {
        restrict: 'E',
        templateUrl: 'views/header/header.view.html',
        controller: 'HeaderController'
    }
});

app.directive("pageFooter", function () {
    return {
        restrict: 'E',
        templateUrl: 'views/footer/footer.view.html'
    }
});


app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});