const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    name: String,
    description: String,
    price: String,
    location: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);