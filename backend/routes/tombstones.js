const express = require("express");
const router = express.Router();
const Tombstone = require("../models/Tombstone");

router.post("/", async (req, res) => {
  const newTombstone = new Tombstone({ ...req.body, deteted: false });
  await newTombstone.save();
  res.json(newTombstone);
});

// 获取所有墓碑（未逻辑删除）
router.get("/", async (req, res) => {
  try {
    const tombstones = await Tombstone.find({ deleted: false });
    res.json(tombstones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 根据 ID 获取墓碑（未逻辑删除）
router.get("/:id", async (req, res) => {
  try {
    const tombstone = await Tombstone.findOne({
      _id: req.params.id,
      deleted: false,
    });
    if (!tombstone) {
      return res.status(404).json({ message: "Cannot find tombstone" });
    }
    res.json(tombstone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 逻辑删除墓碑
router.patch("/:id", async (req, res) => {
  try {
    const tombstone = await Tombstone.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!tombstone) {
      return res.status(404).json({ message: "Cannot find tombstone" });
    }
    res.json({ message: "Tombstone deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
