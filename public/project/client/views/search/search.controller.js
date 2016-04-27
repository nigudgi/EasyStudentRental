"use strict";

(function () {
    angular
        .module("RentEasy")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $rootScope, ListingService) {
        $scope.$location = $location;
        $scope.user = $rootScope.currentUser;
        $scope.search = search;
        $scope.checkSearchTerm = checkSearchTerm;
        $scope.showDetails = showDetails;
        $scope.listing = null;
        $scope.searchTerm = null;
        $scope.listings = null;




        function search() {
            if ($scope.searchTerm) {
             debugger;
                ListingService.SearchByLocality($scope.searchTerm)
                    .then(function (listings) {
                        
                        if (listings) {

                            $scope.listings = listings;
                        } else {
                            console.log("suggest a different method of search")
                        }
                    });
            }
        }

        function checkSearchTerm() {
            if ($scope.searchTerm == "" || $scope.searchTerm == null) {
                $scope.listings = null;
            }
        }

        function showDetails(listing) {
            $scope.listing = listing;
            $rootScope.selectedListing = listing;

            $location.url('/result');
        }
    }
})();
