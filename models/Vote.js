// models/Vote.js
const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  candidate: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  votingDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vote", VoteSchema);
