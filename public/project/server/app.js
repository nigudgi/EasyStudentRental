"use strict";

module.exports = function (app, mongoose, db, passport, LocalStrategy) {
    var userModel = require('./models/user.model.server.js')(mongoose, db, passport, LocalStrategy);
    var listingModel = require('./models/listing.model.server.js')(mongoose, db);

    require('./services/user.service.server.js')(app, userModel, passport, LocalStrategy);
    require('./services/listing.service.server.js')(app, listingModel);
};