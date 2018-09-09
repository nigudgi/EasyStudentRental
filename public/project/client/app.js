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


app.directive('slide-down', function($rootScope) {
  return {
    setup: function(element) {
      $(element).css({display: 'none'});
    },
    start: function(element, done, memo) {
      console.log('animationStart (slide-down)', arguments);
      $(element).slideDown(done);
    }
  };
});



app.directive('slide-up', function($rootScope) {
  return {
    setup: function(element) {
      //$(element).css({display: 'none'});
    },
    start: function(element, done, memo) {
      console.log('animationStart (slide-up)', arguments);
      $(element).slideUp(done);
    }
  };

});




app.directive("passwordStrength", function(){
    return {        
        restrict: 'A',
        link: function(scope, element, attrs){    
        debugger;                
            scope.$watch(attrs.passwordStrength, function(value) {
                console.log(value);
                if(angular.isDefined(value)){
                    if (value.length > 8) {
                        scope.strength = 'strong';
                    } else if (value.length > 3) {
                        scope.strength = 'medium';
                    } else {
                        scope.strength = 'weak';
                    }
                }
            });
        }
    };
});