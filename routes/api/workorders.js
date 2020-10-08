const express = require('express');
const WashType = require('../../models/WashType');
const router = express.Router();

const WorkOrder = require('../../models/WorkOrder');

// @route      GET api/washtypes
// @desc       Get all work orders
// @access     Public
router.get("/", async (req, res) => {
  try {
    const workOrders = await WorkOrder.find();
    
    res.json({ workOrders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      GET api/washtypes/:id
// @desc       Get all work orders of a specific location
// @access     Public
router.get("/:code", async (req, res) => {
  try {
    const workOrders = await WorkOrder.find({ washLocationId: req.params.code });
    
    res.json({ workOrders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      POST api/workorders
// @desc       Add work order
// @access     Public
router.post("/", async (req, res) => {
  try {
    const newWorkOrder = new WorkOrder({
      mainId: req.body.mainId,
      id: req.body.id,
      trailerId: req.body.trailerId,
      extWashCode: req.body.extWashCode,
      intWashCode: req.body.intWashCode,
      washLocationId: req.body.washLocationId,
      neededDate: req.body.neededDate,
      neededDateDisplayStr: req.body.neededDateDisplayStr,
      intDurationMins: req.body.intDurationMins,
      extDurationMins: req.body.extDurationMins,
      start: req.body.start,
      end: req.body.end,
      text: req.body.text
    });

    await newWorkOrder.save();
    
    res.json({ newWorkOrder });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      PUT api/workorders/:id
// @desc       Update status of work order
// @access     Public
router.put("/:id", async (req, res) => {
  try {
    const updateFields = {};

    if (req.body.isScheduled) updateFields.isScheduled = req.body.isScheduled;
    if (req.body.bay) updateFields.bay = req.body.bay;
    if (req.body.start) updateFields.start = req.body.start;
    if (req.body.end) updateFields.end = req.body.end;
    if (req.body.text) updateFields.text = req.body.text;

    await WorkOrder.findByIdAndUpdate(
      req.params.id,
      {$set: updateFields},
      {new: true}
    );

    const workOrders = await WorkOrder.find({ washLocationId: req.body.washLocationId });
    
    res.json({ workOrders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      PUT api/workorders/unschedule/:id
// @desc       Unschedule a work order
// @access     Public
router.put("/unschedule/:id", async (req, res) => {
  try {

    const workOrder = await WorkOrder.findById(req.params.id);
    const intWash = await WashType.findOne({ code: workOrder.intWashCode });
    const extWash = await WashType.findOne({ code: workOrder.extWashCode });

    await workOrder.updateOne(
      {$set: {
        isScheduled: req.body.isScheduled,
        intDurationMins: (intWash.teamHours * 60) + intWash.teamMinutes,
        intDurationMinsSolo: (intWash.soloHours * 60) + intWash.soloMinutes,
        extDurationMins: (extWash.teamHours * 60) + extWash.teamMinutes,
        extDurationMinsSolo: (extWash.soloHours * 60) + extWash.soloMinutes
      }},
      {new: true}
    );

    const workOrders = await WorkOrder.find({ washLocationId: req.body.washLocationId });
    
    res.json({ workOrders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;