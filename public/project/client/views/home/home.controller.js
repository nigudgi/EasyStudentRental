"use strict";

(function () {
    angular
        .module("RentEasy")
        .controller("HomeController", HomeController);

    function HomeController($scope,$location) {
      
      $scope.MyText=null;

        $scope.DoWork = function(){
            debugger;
          $location.url("/search");
    };
      
       
    }






})();
