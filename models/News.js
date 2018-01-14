'use strict';

// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var newsSchema = mongoose.Schema({

    title: {
        type: String,
        min: [1, 'Too few characters'],
        max: 100,
        required: [true, 'Please enter a title.']
    },
    link: {
        type: String,
        min: [1, 'Please enter an link with at least 1 character'],
        required: [true, 'Please enter an link']
    },
    comments: {
    	type: Array
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('News', newsSchema);