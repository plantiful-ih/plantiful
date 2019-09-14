const mongoose = require('mongoose');
const Plant = require('../models/Plant');
const MyPlant = require('../models/MyPlant');
const data = require('../data');

mongoose.connect('mongodb+srv://powerdevgirls:plantifulapp@plantiful-2druw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

Plant.create(data)
    .then((plant) => {
        console.log('inserted plant ', plant);
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
        mongoose.connection.close();
    });
