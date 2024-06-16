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

module.exports = router;
