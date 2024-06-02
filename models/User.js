// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
