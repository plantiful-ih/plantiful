const mongoose = require('mongoose');

const { Schema } = mongoose;

const myPlantSchema = new Schema(
    {
        typePlant: { type: Schema.Types.ObjectId, ref: 'Plant' },
        nickname: String,
        rating: Number,
        userPics: Array,
        shoppingPoint: Array
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

const MyPlant = mongoose.model('MyPlant', myPlantSchema);

module.exports = MyPlant;