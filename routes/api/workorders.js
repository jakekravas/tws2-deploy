const express = require('express');
const router = express.Router();

const WorkOrder = require('../../models/WorkOrder');
const TrailerWashWo = require('../../models/TrailerWashWo');
const WashType = require('../../models/WashType');

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
// @desc       Get all work orders of a specific location
// @access     Public
router.get("/user/:locations", async (req, res) => {
  try {

    const locationsArr = req.params.locations.split(",");
    const workOrders = [];
    
    for (let i = 0; i < locationsArr.length; i++) {
      let workOrdersOfLoc = await TrailerWashWo.findAll({ where: { wash_location_id: locationsArr[i] } });
      if (workOrdersOfLoc) {
        for (let i = 0; i < workOrdersOfLoc.length; i++) {
          
          let intWash = await WashType.findOne({
            where: { wash_code: workOrdersOfLoc[i].int_wash_code.trim() }
          });

          let extWash = await WashType.findOne({
            where: { wash_code: workOrdersOfLoc[i].ext_wash_code.trim() }
          });

          let obj = { wo: workOrdersOfLoc[i], intWash: intWash, extWash: extWash }

          // workOrders.push(workOrdersOfLoc[i]);
          workOrders.push(obj);
        }
      }
    }
    
    res.json({ workOrders });
    
    // const locationsArr = req.params.locations.split(",");
    // const workOrders = [];
    
    // for (let i = 0; i < locationsArr.length; i++) {
    //   let workOrdersOfLoc = await WorkOrder.findAll({ where: { wash_location_id: locationsArr[i] } });
    //   if (workOrdersOfLoc) {
    //     for (let i = 0; i < workOrdersOfLoc.length; i++) {
    //       workOrders.push(workOrdersOfLoc[i]);
    //     }
    //   }
    // }
    
    // res.json({ workOrders });
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
    console.log('AAAAAAAAAAAA');
    console.log('AAAAAAAAAAAA');
    console.log('AAAAAAAAAAAA');
    console.log('AAAAAAAAAAAA');
    console.log('AAAAAAAAAAAA');
    console.log('AAAAAAAAAAAA');
    console.log('AAAAAAAAAAAA');
    console.log(req.params.id + '  ');
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

    const locationsArr = req.body.locations.split(",");
    const workOrders = [];
    
    for (let i = 0; i < locationsArr.length; i++) {
      let workOrdersOfLoc = await TrailerWashWo.findAll({ where: { wash_location_id: locationsArr[i] } });
      if (workOrdersOfLoc) {
        for (let i = 0; i < workOrdersOfLoc.length; i++) {
          
          let intWash = await WashType.findOne({
            where: { wash_code: workOrdersOfLoc[i].int_wash_code.trim() }
          });

          let extWash = await WashType.findOne({
            where: { wash_code: workOrdersOfLoc[i].ext_wash_code.trim() }
          });

          let obj = { wo: workOrdersOfLoc[i], intWash: intWash, extWash: extWash }

          // workOrders.push(workOrdersOfLoc[i]);
          workOrders.push(obj);
        }
      }
      // let workOrdersOfLoc = await WorkOrder.findAll({ where: { wash_location_id: locationsArr[i] } });
      // if (workOrdersOfLoc) {
      //   for (let i = 0; i < workOrdersOfLoc.length; i++) {
      //     workOrders.push(workOrdersOfLoc[i]);
      //   }
      // }
    }

    // const workOrders = await WorkOrder.findAll(
    //   { where: { wash_location_id: req.body.washLocationId } }
    // );
    
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

    // const workOrder = await WorkOrder.findOne({where: {id: req.params.id}});
    // const intWash = await WashType.findOne({ where: { wash_code: workOrder.int_wash_code }});
    // const extWash = await WashType.findOne({ where: { wash_code: workOrder.ext_wash_code }});

    // Updating duration of work order, in case of wash type duration change
    // await WorkOrder.update(
    await TrailerWashWo.update(
      {
        is_scheduled: false,
        // int_duration_mins_team: (intWash.team_hours * 60) + intWash.team_minutes,
        // int_duration_mins_solo: (intWash.solo_hours * 60) + intWash.solo_minutes,
        // ext_duration_mins_team: (extWash.team_hours * 60) + extWash.team_minutes,
        // ext_duration_mins_solo: (extWash.solo_hours * 60) + extWash.solo_minutes
      },
      // {where: { id: req.params.id }}
      {where: { order_id: req.params.id + "  " }}
    );

    // Get all work orders of current location
    // const workOrders = await WorkOrder.findAll({where: { wash_location_id: req.body.washLocationId }});

    const locationsArr = req.body.locations.split(",");
    const workOrders = [];
    
    for (let i = 0; i < locationsArr.length; i++) {
      let workOrdersOfLoc = await TrailerWashWo.findAll({ where: { wash_location_id: locationsArr[i] } });
      if (workOrdersOfLoc) {
        for (let i = 0; i < workOrdersOfLoc.length; i++) {
          
          let intWash = await WashType.findOne({
            where: { wash_code: workOrdersOfLoc[i].int_wash_code.trim() }
          });

          let extWash = await WashType.findOne({
            where: { wash_code: workOrdersOfLoc[i].ext_wash_code.trim() }
          });

          let obj = { wo: workOrdersOfLoc[i], intWash: intWash, extWash: extWash }

          // workOrders.push(workOrdersOfLoc[i]);
          workOrders.push(obj);
        }
      }
      // let workOrdersOfLoc = await WorkOrder.findAll({ where: { wash_location_id: locationsArr[i] } });
      // if (workOrdersOfLoc) {
      //   for (let i = 0; i < workOrdersOfLoc.length; i++) {
      //     workOrders.push(workOrdersOfLoc[i]);
      //   }
      // }
    }
    
    res.json({ workOrders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;