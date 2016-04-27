"use strict";

(function () {
    angular
        .module("RentEasy")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.update = update;
        $scope.updated = false;
        var doUpdate = true;
        $scope.noUpdate = false;
        $scope.passworderror = false;
        $scope.user = $rootScope.currentUser;

        function update(user) {
            UserService.Update($scope.user._id, $scope.user).then(function (updatedUser) {
                $rootScope.currentUser = updatedUser;
                $scope.updated = true;
            });
        }
    }
})();
