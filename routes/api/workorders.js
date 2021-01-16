const express = require('express');
const router = express.Router();

const WorkOrder = require('../../models/WorkOrder');
const TrailerWashWo = require('../../models/TrailerWashWo');
const WashType = require('../../models/WashType');
const { sequelize } = require('../../models/WorkOrder');

// @route      GET api/workorders/:code
// @desc       Get all work orders of a specific location
// @access     Public
router.get("/:code", async (req, res) => {
  try {
    const workOrders = await WorkOrder.findAll({where: {wash_location_id: req.params.code}});
    
    res.json({ workOrders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// @route      GET api/workorders/user/:code
// @desc       Get all work orders of locations that user has access to
// @access     Public
router.get("/user/:locations", async (req, res) => {
  try {

    const locationsArr = req.params.locations;

    const workOrders = await sequelize.query(`SELECT * FROM tankwash.trailer_wash_wo LEFT JOIN tankwash.ext_wash_types ON tankwash.trailer_wash_wo.ext_wash_code = tankwash.ext_wash_types.ext_wash_code LEFT JOIN tankwash.int_wash_types ON tankwash.trailer_wash_wo.int_wash_code = tankwash.int_wash_types.int_wash_code WHERE tankwash.trailer_wash_wo.wash_location_id IN (${locationsArr}) AND tankwash.trailer_wash_wo.void = 'N' AND tankwash.trailer_wash_wo.wash_location_id IS NOT NULL AND tankwash.trailer_wash_wo.order_id IS NOT NULL AND tankwash.trailer_wash_wo.trailer_id IS NOT NULL AND tankwash.trailer_wash_wo.int_wash_code IS NOT NULL;`);

    res.json({ workOrders: workOrders });

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
    // await WorkOrder.update(
    await TrailerWashWo.update(
      {
        resource: req.body.resource,
        start_time: req.body.start,
        end_time: req.body.end,
        is_scheduled: true
        // display_text: req.body.text,
      },
      // {where: { id: req.params.id }}
      {where: { order_id: req.params.id + "  " }}
    )

    const locationsArr = req.body.locations;

    const workOrders = await sequelize.query(`SELECT * FROM tankwash.trailer_wash_wo LEFT JOIN tankwash.ext_wash_types ON tankwash.trailer_wash_wo.ext_wash_code = tankwash.ext_wash_types.ext_wash_code LEFT JOIN tankwash.int_wash_types ON tankwash.trailer_wash_wo.int_wash_code = tankwash.int_wash_types.int_wash_code WHERE tankwash.trailer_wash_wo.wash_location_id IN (${locationsArr}) AND tankwash.trailer_wash_wo.void = 'N' AND tankwash.trailer_wash_wo.wash_location_id IS NOT NULL AND tankwash.trailer_wash_wo.order_id IS NOT NULL AND tankwash.trailer_wash_wo.trailer_id IS NOT NULL AND tankwash.trailer_wash_wo.int_wash_code IS NOT NULL;`);

    res.json({ workOrders: workOrders });
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

    await TrailerWashWo.update(
      {
        is_scheduled: false,
      },
      // {where: { id: req.params.id }}
      {where: { order_id: req.params.id + "  " }}
    );

    const locationsArr = req.body.locations;

    const workOrders = await sequelize.query(`SELECT * FROM tankwash.trailer_wash_wo LEFT JOIN tankwash.ext_wash_types ON tankwash.trailer_wash_wo.ext_wash_code = tankwash.ext_wash_types.ext_wash_code LEFT JOIN tankwash.int_wash_types ON tankwash.trailer_wash_wo.int_wash_code = tankwash.int_wash_types.int_wash_code WHERE tankwash.trailer_wash_wo.wash_location_id IN (${locationsArr}) AND tankwash.trailer_wash_wo.void = 'N' AND tankwash.trailer_wash_wo.wash_location_id IS NOT NULL AND tankwash.trailer_wash_wo.order_id IS NOT NULL AND tankwash.trailer_wash_wo.trailer_id IS NOT NULL AND tankwash.trailer_wash_wo.int_wash_code IS NOT NULL;`);
    
    res.json({ workOrders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;