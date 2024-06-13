const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TombstoneSchema = new Schema({
  name: String,
  birthDate: String,
  deathDate: String,
  message: String,
});

module.exports = mongoose.model("Tombstone", TombstoneSchema);
