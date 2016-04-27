"use strict";

(function () {
    angular
        .module("RentEasy")
        .controller("ResultController", ResultController);

    function ResultController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.selectedListing = $rootScope.selectedListing;
        $scope.map = null;
        $scope.marker = null;
        $scope.pinListing = pinListing;
        $scope.pinerror = false;

        function initMap() {
            if ($rootScope.selectedListing) {
                $scope.selectedListing = $rootScope.selectedListing;

                var mapcoords = {latitude: $scope.selectedListing.place_details.lat, longitude: $scope.selectedListing.place_details.lng};
                $scope.map = {center: mapcoords, zoom: 16};
                $scope.marker = {id:0, coords: mapcoords};
            }
        }

        initMap();

        function pinListing(listing) {
            var id = listing._id;
            var pinned = null;

            if (!$rootScope.currentUser) {
                $scope.pinerror = true;
            } else {
                pinned = $rootScope.currentUser.pinned;

                if (pinned.indexOf(id) == -1 && !$scope.pinerror) {
                    UserService.Pin($rootScope.currentUser._id, id).then(function(user) {
                        if (user) {
                            console.log("pinned");
                        } else {
                            console.log("not able to pin");
                        }
                    });
                } else {
                    console.log("already pinned");
                }
            }
        }
    }
})();
