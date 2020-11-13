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
// @desc       Get all work orders of locations that user has access to
// @access     Public
router.get("/user/:locations", async (req, res) => {
  try {
    console.log("CCCCCCCCC");
    console.log("CCCCCCCCC");
    console.log("CCCCCCCCC");
    console.log("CCCCCCCCC");
    console.log("CCCCCCCCC");
    console.log("CCCCCCCCC");
    console.log(req.params.locations);
    const locationsArr = req.params.locations.split(",");
    const workOrders = [];
    
    for (let i = 0; i < locationsArr.length; i++) {
      let workOrdersOfLoc = await TrailerWashWo.findAll({ where: { wash_location_id: locationsArr[i] } });
      if (workOrdersOfLoc) {
        for (let i = 0; i < workOrdersOfLoc.length; i++) {

          let intWash;
          let extWash;

          if (workOrdersOfLoc[i].int_wash_code) {
            intWash = await WashType.findOne({
              where: { wash_code: workOrdersOfLoc[i].int_wash_code.trim() }
            });
          }

          if (workOrdersOfLoc[i].ext_wash_code) {
            extWash = await WashType.findOne({
              where: { wash_code: workOrdersOfLoc[i].ext_wash_code.trim() }
            });
          }

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

          let intWash;
          let extWash;

          if (workOrdersOfLoc[i].int_wash_code) {
            intWash = await WashType.findOne({
              where: { wash_code: workOrdersOfLoc[i].int_wash_code.trim() }
            });
          }

          if (workOrdersOfLoc[i].ext_wash_code) {
            extWash = await WashType.findOne({
              where: { wash_code: workOrdersOfLoc[i].ext_wash_code.trim() }
            });
          }
          
          // let intWash = await WashType.findOne({
          //   where: { wash_code: workOrdersOfLoc[i].int_wash_code.trim() }
          // });

          // let extWash = await WashType.findOne({
          //   where: { wash_code: workOrdersOfLoc[i].ext_wash_code.trim() }
          // });

          let obj = { wo: workOrdersOfLoc[i], intWash: intWash, extWash: extWash }

          // workOrders.push(workOrdersOfLoc[i]);
          workOrders.push(obj);
        }
      }
    }
    
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

    await TrailerWashWo.update(
      {
        is_scheduled: false,
      },
      // {where: { id: req.params.id }}
      {where: { order_id: req.params.id + "  " }}
    );

    const locationsArr = req.body.locations.split(",");
    const workOrders = [];
    
    for (let i = 0; i < locationsArr.length; i++) {
      let workOrdersOfLoc = await TrailerWashWo.findAll({ where: { wash_location_id: locationsArr[i] } });
      if (workOrdersOfLoc) {
        for (let i = 0; i < workOrdersOfLoc.length; i++) {
          
          let intWash;
          let extWash;

          if (workOrdersOfLoc[i].int_wash_code) {
            intWash = await WashType.findOne({
              where: { wash_code: workOrdersOfLoc[i].int_wash_code.trim() }
            });
          }

          if (workOrdersOfLoc[i].ext_wash_code) {
            extWash = await WashType.findOne({
              where: { wash_code: workOrdersOfLoc[i].ext_wash_code.trim() }
            });
          }

          let obj = { wo: workOrdersOfLoc[i], intWash: intWash, extWash: extWash }

          // workOrders.push(workOrdersOfLoc[i]);
          workOrders.push(obj);
        }
      }
    }
    
    res.json({ workOrders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;