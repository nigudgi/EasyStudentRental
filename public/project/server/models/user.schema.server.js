"use strict";

module.exports = function (mongoose) {
    var UserSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String,
        password: String,
        email: String,
        pinned: [String]
    }, {collection: 'easyRental.project.user'});

    return UserSchema;
};