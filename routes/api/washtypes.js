const express = require('express');
const router = express.Router();

const WashType = require('../../models/WashType');
const WorkOrder = require('../../models/WorkOrder');

// @route      GET api/washtypes
// @desc       Get all wash types
// @access     Public
router.get("/", async (req, res) => {
  try {
    const washTypes = await WashType.findAll({
      order: [
        ['wash_code', 'ASC'],
      ]
    });

    res.json({ washTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      PUT api/washtypes/:id
// @desc       Edit wash type
// @access     Public
router.put("/:id", async (req, res) => {
  try {
    let washType = await WashType.findOne({ where: {id: req.params.id} });

    let ordersToUpdate;

    // If the wash type we're updating is an interior wash, get all unscheduled orders with that interior wash code
    if (washType.type === "I") {
      ordersToUpdate = await WorkOrder.findAll({
        where: {int_wash_code: washType.wash_code, is_scheduled: false}
      });

      for (let i = 0; i < ordersToUpdate.length; i++) {
        await ordersToUpdate[i].update(
          {
            int_duration_mins_team: (req.body.teamHours * 60) + req.body.teamMinutes,
            int_duration_mins_solo: (req.body.soloHours * 60) + req.body.soloMinutes
          },
          { where: { id: ordersToUpdate[i].id } }
        )
      }
      
    // If the wash type we're updating is an exterior wash, get all unscheduled orders with that exterior wash code
    } else if (washType.type === "E") {
      ordersToUpdate = await WorkOrder.findAll({
        where: {ext_wash_code: washType.wash_code, is_scheduled: false}
      });

      for (let i = 0; i < ordersToUpdate.length; i++) {
        await ordersToUpdate[i].update(
          {
            ext_duration_mins_team: (req.body.teamHours * 60) + req.body.teamMinutes,
            ext_duration_mins_solo: (req.body.soloHours * 60) + req.body.soloMinutes
          },
          { where: { id: ordersToUpdate[i].id } }
        )
      }
    }

    await washType.update(
      {
        team_hours: req.body.teamHours,
        team_minutes: req.body.teamMinutes,
        solo_hours: req.body.soloHours,
        solo_minutes: req.body.soloMinutes
      },
      { where: {id: washType.id} }
    );

    const washTypes = await WashType.findAll({
      order: [
        ['wash_code', 'ASC'],
      ]
    });

    res.json({ washTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;