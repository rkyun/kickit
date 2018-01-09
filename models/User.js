const mongoose = require('mongoose');

const { Schema } =  mongoose;

const userSchema = new Schema ({
  provider: String,
  id: String,
  username: String,
  password: String,
});

mongoose.model('users', userSchema);