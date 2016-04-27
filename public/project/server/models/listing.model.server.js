"use strict";

module.exports = function (mongoose, db) {
    var q = require('q');
    var ListingSchema = require('./listing.schema.server.js')(mongoose);
    var RentListingModel = db.model('RentListingModel', ListingSchema);

    var api = {
        Create: createListing,
        FindAll: findAllForUser,
        FindById: findListingById,
        Delete: deleteListing,
        SearchByLocality: searchByLocality,
        SearchByZipCode: searchByZipcode
    };

    return api;

    function createListing(listing) {
        var deferred = q.defer();

        RentListingModel.create(listing, function (err, newListing) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newListing);
            }
        });

        return deferred.promise;
    }

    function findAllForUser(userid) {
        var deferred = q.defer();

        RentListingModel.find({userid: userid}, function (err, listings) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(listings);
            }
        });

        return deferred.promise;
    }

    function findListingById(listingid) {
        var deferred = q.defer();

        RentListingModel.findById(listingid, function (err, listing) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(listing);
            }
        });

        return deferred.promise;
    }

    function deleteListing(listingid, userid) {
        var deferred = q.defer();

        RentListingModel.remove({_id: listingid}, function (err, status) {
            RentListingModel.find({userid: userid}, function (err, listings) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(listings);
                }
            });
        });

        return deferred.promise;
    }

    function searchByLocality(searchTerm) {
        var deferred = q.defer();

        RentListingModel.find({'place_details.locality': searchTerm}, function (err, listings) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(listings);
            }
        });

        return deferred.promise;
    }

    function searchByZipcode(searchTerm) {
        var deferred = q.defer();

        RentListingModel.find({'place_details.postal_code': searchTerm.toString()}, function (err, listings) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(listings);
            }
        });

        return deferred.promise;
    }

};
