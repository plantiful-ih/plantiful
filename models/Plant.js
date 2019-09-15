const mongoose = require('mongoose');

const { Schema } = mongoose;

const plantSchema = new Schema(
  {
    commonName: String,
    family: String,
    careDifficulty: Number,
    watering: String,
    lifeLength: String,
    img: String,
    careTips: Array,
    place: Array,
    description: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
