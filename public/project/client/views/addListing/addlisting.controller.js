"use strict";

(function () {
    angular
        .module("RentEasy")
        .controller("AddListingController", AddListingController);

    function AddListingController($scope, $location, $rootScope, $routeParams, ListingService) {
        $scope.$location = $location;
        $scope.place = null;
        $scope.autocompleteResponse = autocompleteResponse;
        $scope.addListing = addListing;
        $scope.user = $rootScope.currentUser;
        $scope.createError = null;

        $scope.placedetails = {
            street_number: null,
            route: null,
            administrative_area_level_1: null,
            locality: null,
            postal_code: null,
            country: null
        };

        var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };

        function autocompleteResponse() {
            var addressComponents = $scope.place.address_components;

            if ($scope.place) {
                if (addressComponents) {
                    for (var i = 0; i < addressComponents.length; i++) {
                        var addressType = addressComponents[i].types[0];
                        if (componentForm[addressType]) {
                            var val = addressComponents[i][componentForm[addressType]];
                            $scope.placedetails[addressType] = val;
                        }
                    }

                    $scope.placedetails.displayAddress = $scope.placedetails.street_number + " " + $scope.placedetails.route;
                    $scope.placedetails.formatted_address = $scope.place.formatted_address;
                    $scope.placedetails.lat = $scope.place.geometry.location.lat();
                    $scope.placedetails.lng = $scope.place.geometry.location.lng();
                }
            }
        }

        function addListing() {
            var listing = {};

            listing['propertyType'] = $scope.propertyType;
            listing['userid'] = $scope.user._id;
            listing['bed'] = $scope.bed;
            listing['bath'] = $scope.bath;
            listing['place_details'] = $scope.placedetails;
            listing['rent'] = $scope.rent;
            listing['heat'] = $scope.heat;
            listing['pets'] = $scope.pets;
            listing['gym'] = $scope.gym;
            listing['parking'] = $scope.parking;
            listing['description'] = $scope.description;

            ListingService.Create(listing, $scope.user._id)
                .then(function (listing) {
                    debugger;
                    if (listing) {
                        $location.url('myListing/' + $scope.user._id);
                    } else {
                        $scope.createError = true;
                    }
                });
        }
    }
})();
