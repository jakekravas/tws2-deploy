const express = require('express');
const router = express.Router();

const WashType = require('../../models/WashType');
const WorkOrder = require('../../models/WorkOrder');

// @route      GET api/washtypes
// @desc       Get all wash types
// @access     Public
router.get("/", async (req, res) => {
  try {
    const washTypes = await WashType.find();

    res.json({ washTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      POST api/washtypes
// @desc       Add wash type
// @access     Public
router.post("/", async (req, res) => {
  try {
    const washType = new WashType({
      code: req.body.code,
      description: req.body.description,
      type: req.body.type,
      hours: req.body.hours,
      minutes: req.body.minutes
    });
    
    await washType.save();
    
    const washTypes = await WashType.find();
    res.json({ washTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      PUT api/washtypes
// @desc       Edit wash type
// @access     Public
router.put("/:id", async (req, res) => {
  try {
    const updatedFields = {};
    
    if (req.body.code) {updatedFields.code = req.body.code};
    if (req.body.description) {updatedFields.description = req.body.description};

    if (req.body.teamHours || req.body.teamHours === 0) {
      updatedFields.teamHours = req.body.teamHours
    };
    if (req.body.teamMinutes || req.body.teamMinutes === 0) {
      updatedFields.teamMinutes = req.body.teamMinutes
    };
    if (req.body.soloHours || req.body.soloHours === 0) {
      updatedFields.soloHours = req.body.soloHours
    };
    if (req.body.soloMinutes || req.body.soloMinutes === 0) {
      updatedFields.soloMinutes = req.body.soloMinutes
    };

    if (req.body.type === "I") {
      await WorkOrder.updateMany(
        {intWashCode: req.body.code, isScheduled: false},
        {$set: {
          intDurationMins: (req.body.teamHours * 60) + req.body.teamMinutes,
          intDurationMinsSolo: (req.body.soloHours * 60) + req.body.soloMinutes
        }}
      );
    } else if (req.body.type === "E") {
      await WorkOrder.updateMany(
        {extWashCode: req.body.code, isScheduled: false},
        {$set: {
          extDurationMins: (req.body.teamHours * 60) + req.body.teamMinutes,
          extDurationMinsSolo: (req.body.soloHours * 60) + req.body.soloMinutes
        }}
      );
    }

    const washType = await WashType.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    // await WorkOrder.updateMany(
    //   {intWashCode: req.body.code, isScheduled: false},
    //   {intWashDurationMins: }
    // );
    
    await washType.save();

    const washTypes = await WashType.find();

    res.json({ washTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      DELETE api/washtypes
// @desc       Delete wash type
// @access     Public
router.delete("/:id", async (req, res) => {
  try {
    await WashType.findByIdAndDelete(req.params.id);
    const washTypes = await WashType.find();

    res.json({ washTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;