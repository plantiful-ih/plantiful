const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        userEmail: String,
        hashedPassword: String,
        location: Array,
        age: Number,
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
