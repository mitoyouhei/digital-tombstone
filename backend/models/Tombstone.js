const mongoose = require("mongoose");

const tombstoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: false,
  },
  deathDate: {
    type: Date,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },

  facebookId: String,
  facebookToken: String,
  facebookName: String,
  facebookEmail: String,
  facebookPhoto: String,
});

module.exports = mongoose.model("Tombstone", tombstoneSchema);
