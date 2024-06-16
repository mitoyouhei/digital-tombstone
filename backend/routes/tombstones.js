const express = require("express");
const router = express.Router();
const Tombstone = require("../models/Tombstone");

router.post("/", async (req, res) => {
  const newTombstone = new Tombstone(req.body);
  await newTombstone.save();
  res.json(newTombstone);
});

router.get("/", async (req, res) => {
  const tombstones = await Tombstone.find();
  res.json(tombstones);
});

router.get("/:id", async (req, res) => {
  try {
    const tombstone = await Tombstone.findById(req.params.id);
    if (tombstone == null) {
      return res.status(404).json({ message: "Cannot find tombstone" });
    }
    res.json(tombstone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
