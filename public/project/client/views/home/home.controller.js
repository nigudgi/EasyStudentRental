"use strict";

(function () {
    angular
        .module("RentEasy")
        .controller("HomeController", HomeController);

    function HomeController($scope,$location,$timeout) {
      
      $scope.MyText=null;
     $scope.checkSearch== null
     $scope.field="";

        $scope.DoWork = function(){
           

           if($scope.MyText == null || $scope.MyText == undefined){
             $scope.field= "* This field is required!"
            return;

           }
           else{
        $scope.checkSearch==true;
          $location.url("/search");
}


    };
      

      $scope.checkSearch = function(){
         if($scope.MyText == null || $scope.MyText == undefined){
         
         return true;
                  }

      else{
 
        return false;
      }

      };



      $scope.show = true;
      $scope.locate=false;
      $scope.gallery=false;
    
    $scope.toggle = function() {
        $scope.show = !$scope.show;
      
    };
       
       $scope.toggleLocation = function() {
         $scope.locate = !$scope.locate;
    };
      

   $scope.toggleGallery = function() {
        $scope.gallery = !$scope.gallery;
      
    }; 


    }






})();




