const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        userEmail: { type: String, required: true, unique: true },
        hashedPassword: String,
        userName: String,
        location: Array,
        age: Number,
        image: {
            type: String,
            default: 'images/default_profile_pic.png',
        },
        userPlants: [{ type: Schema.Types.ObjectId, ref: 'MyPlant' }]
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
