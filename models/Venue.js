const mongoose = require('mongoose');

const { Schema } = mongoose;

const venueSchema = new Schema ({
  name: {
    type: String,
    required: true,
    minlength: 4
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: String,
    long: String
  }
})

mongoose.model('venues', venueSchema);