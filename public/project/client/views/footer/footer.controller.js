"use strict";

(function () {
    angular
        .module("RentEasy")
        .controller("FooterController", FooterController);

    function FooterController($scope, $location) {
        $scope.$location = $location;
    }
})();
