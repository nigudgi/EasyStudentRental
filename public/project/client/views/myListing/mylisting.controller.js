"use strict";

(function () {
    angular
        .module("RentEasy")
        .controller("MyListingController", MyListingController);

    function MyListingController($scope, $location, $rootScope, ListingService) {
        $scope.$location = $location;
        $scope.user = $rootScope.currentUser;
        $scope.deleteListing = deleteListing;
        $scope.showDetails = showDetails;
        $scope.listings = null;
        $scope.noListings = false;
        $scope.listing = null;
        $scope.pinned = [];

        function init() {
            ListingService.FindAll($scope.user._id)
                .then(function (userListings) {
                    if (userListings) {
                        $scope.listings = userListings;
                    } else {
                        $scope.noListings = true;
                    }
                });

            var pinned = $rootScope.currentUser.pinned;
          
            for (var i=0; i<pinned.length; i++) {
                ListingService.FindById(pinned[i])
                    .then(function (listing) {
                   
                        if (listing) {
                            $scope.pinned.push(listing);
                        }
                    });
            }
        }

        if ($scope.user) {
            init();
        }

        function deleteListing(listingid) {
            ListingService.Delete(listingid, $scope.user._id)
                .then(function (userListings) {
                    if (userListings) {
                        $scope.listings = userListings;
                    } else {
                        $scope.noListings = true;
                    }
                })
        }

        function showDetails(listing) {
            $scope.listing = listing;
            $rootScope.selectedListing = listing;

            $rootScope.$broadcast('listing', listing);

            $location.url('/result');
        }
    }
})();
