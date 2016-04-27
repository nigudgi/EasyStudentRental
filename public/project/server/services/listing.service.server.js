"use strict";

module.exports = function (app, model) {
    app.post('/api/project/listing/:userid', createListing);
    app.get('/api/project/listing/user/:userid', findAllListingsForUser);
    app.get('/api/project/listing/:listingid', findListingById);
    app.delete('/api/project/listing/:listingid/user/:userid', deleteListing);
    app.get('/api/project/search', searchListings);

    function createListing(req, res) {
        var listing = req.body;
        var userid = req.params.userid;

        model.Create(listing)
            .then(function (newListing) {
                res.json(newListing);
            });
    }

    function findAllListingsForUser(req, res) {
        var userid = req.params.userid;

        model.FindAll(userid)
            .then(function (listings) {
                res.json(listings);
            });
    }

    function findListingById(req, res){
        var listingid = req.params.listingid;

        model.FindById(listingid)
            .then(function (listing) {
                res.json(listing);
            });
    }

    function deleteListing(req, res) {
        var listingid = req.params.listingid;
        var userid = req.params.userid;

        model.Delete(listingid, userid)
            .then(function (listings) {
                res.json(listings);
            });
    }

    function searchListings(req, res) {
        var searchTerm = req.query.searchterm;
        if (isNaN(searchTerm)) {
            model.SearchByLocality(searchTerm)
                .then(function (listings) {
                    res.json(listings);
                });
        } else {
            model.SearchByZipCode(searchTerm)
                .then(function (listings) {
                    res.json(listings);
                });
        }
    }
};