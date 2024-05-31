const mongoose = require('mongoose');
const cities = require('country-state-city').City.getCitiesOfCountry("EE");
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/campgrounds')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const randomInt = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            location: `${cities[randomInt].name}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'lorem ipsum',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});
