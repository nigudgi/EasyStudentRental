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
        $scope.checkSearch==false;
        $scope.field="";



      


        function search() {
            if ($scope.searchTerm!= null && $scope.searchTerm != undefined) {
             
                ListingService.SearchByLocality($scope.searchTerm)
                    .then(function (listings) {
                        
                        if (listings.length !=0) {

                            $scope.listings = listings;
                        } 
                        else {
                            $scope.field="Enter a correct search field"
                            console.log("suggest a different method of search")
                        }
                    });
            }

        else{
                  $scope.field= "* This field is required!"
            return;
        }


        }





      $scope.checkSearch = function(){
         if($scope.MyText == null || $scope.MyText == undefined){
         
         return true;
                  }

      else{
 
        return false;
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
