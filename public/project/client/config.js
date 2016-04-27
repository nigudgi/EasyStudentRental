"use strict";

(function () {
    angular
        .module("RentEasy")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {redirectTo: "/home",
                resolve: {
                    loggedin: verifyCurrentUser
                }
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
               controller: "HomeController",
                resolve: {
                    loggedin: verifyCurrentUser
                }
            }).when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: verifyCurrentUser
                }
            })
            .when("/search/:MyText?", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                resolve: {
                    loggedin: verifyCurrentUser
                }
            })
            .when("/addListing", {
                templateUrl: "views/addListing/addlisting.view.html",
                controller: "AddListingController",
                resolve: {
                    loggedin: verifyCurrentUser
                }
            })
            .when("/myListing/:userid", {
                templateUrl: "views/myListing/mylisting.view.html",
                controller: "MyListingController",
                resolve: {
                    loggedin: verifyCurrentUser
                }
            })
            .when("/result", {
                templateUrl: "views/result/result.view.html",
                controller: "ResultController",
                resolve: {
                    loggedin: verifyCurrentUser
                }
            })
            .otherwise("/",{
                redirectTo: "/home",
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var verifyCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get("/api/project/loggedin")
            .success(function(user){
                $rootScope.errorMessage = null;
                if (user !== '0')
                {
                    $rootScope.currentUser = user;
                    console.log($rootScope.currentUser);
                }
                deferred.resolve();
            });

        return deferred.promise;
    };
})();

