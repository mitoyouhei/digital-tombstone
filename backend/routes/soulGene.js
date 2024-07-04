const express = require("express");
const router = express.Router();
const SoulGene = require("../models/SoulGene");

// 创建新的灵魂基因
router.post("/", async (req, res) => {
  const { plotId, name, birthdate } = req.body;
  const userId = req.user.id; // 从 Passport 中获取 userId

  try {
    const soulGene = new SoulGene({ plotId, name, birthdate, userId });
    await soulGene.save();
    res.status(201).json(soulGene);
  } catch (error) {
    if (error.code === 11000) {
      // 处理唯一索引冲突错误
      const errorMessage = error.keyPattern.plotId
        ? "PlotId must be unique"
        : "UserId must be unique";
      res.status(400).json({ error: errorMessage });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// 获取当前登录用户的所有灵魂基因
router.get("/me", async (req, res) => {
  const userId = req.user.id; // 从 Passport 中获取 userId

  try {
    const soulGenes = await SoulGene.find({ userId, isDeleted: false });
    res.status(200).json(soulGenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取所有灵魂基因
router.get("/", async (req, res) => {
  const userId = req.user.id;
  try {
    const soulGenes = await SoulGene.find({ isDeleted: false });

    const enrichedSoulGenes = soulGenes.map((gene) => ({
      ...gene.toObject(),
      isOwned: gene.userId.toString() === userId,
    }));
    res.status(200).json(enrichedSoulGenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取特定灵魂基因
router.get("/:id", async (req, res) => {
  try {
    const soulGene = await SoulGene.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!soulGene) {
      return res.status(404).json({ error: "Soul Gene not found" });
    }
    res.status(200).json(soulGene);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新灵魂基因
router.put("/", async (req, res) => {
  const { plotId, name, birthdate } = req.body;
  const userId = req.user.id; // 从 Passport 中获取 userId

  try {
    const soulGene = await SoulGene.findOne({
      userId,
      isDeleted: false,
    });

    if (!soulGene) {
      return res.status(404).json({ error: "Soul Gene not found" });
    }

    soulGene.plotId = plotId;
    soulGene.name = name;
    soulGene.birthdate = birthdate;

    await soulGene.save();
    res.status(200).json(soulGene);
  } catch (error) {
    if (error.code === 11000) {
      // 处理唯一索引冲突错误
      const errorMessage = error.keyPattern.plotId
        ? "PlotId must be unique"
        : "UserId must be unique";
      res.status(400).json({ error: errorMessage });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// 逻辑删除灵魂基因
router.delete("/:id", async (req, res) => {
  const userId = req.user.id; // 从 Passport 中获取 userId

  try {
    const soulGene = await SoulGene.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!soulGene) {
      return res.status(404).json({ error: "Soul Gene not found" });
    }

    // 检查当前用户是否是灵魂基因的所有者
    if (soulGene.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this Soul Gene" });
    }

    soulGene.isDeleted = true;

    await soulGene.save();
    res
      .status(200)
      .json({ message: "Soul Gene logically deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
