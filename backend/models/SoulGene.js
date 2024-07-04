const mongoose = require("mongoose");

const SoulGeneSchema = new mongoose.Schema({
  plotId: {
    type: String,
    required: true,
    unique: true, // 确保 plotId 唯一
  },
  name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true, // 确保 userId 唯一
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("SoulGene", SoulGeneSchema);
