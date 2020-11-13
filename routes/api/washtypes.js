const express = require('express');
const { sequelize } = require('../../models/WashType');
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

// router.get("/test", async (req, res) => {
//   try {
//     const orders = await sequelize.query("SELECT * FROM tankwash.trailer_wash_wo LEFT JOIN tankwash.ext_wash_types ON tankwash.trailer_wash_wo.ext_wash_code = tankwash.ext_wash_types.ext_wash_code LEFT JOIN tankwash.int_wash_types ON tankwash.trailer_wash_wo.int_wash_code = tankwash.int_wash_types.int_wash_code;");

//     res.json({ orders });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// })

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

    if (washType.type === "E") {
      let intWashType = IntWashType.findAll({where: {int_wash_code: washType.washCode}}).dataValues[0];
      await intWashType.update(
        {
          int_team_hours: req.body.teamHours,
          int_team_minutes: req.body.teamMinutes,
          int_solo_hours: req.body.soloHours,
          int_solo_minutes: req.body.soloMinutes
        },
        { where: {int_wash_code: washType.washCode} }
      );
    } else {
      let extWashType = ExtWashType.findAll({where: {ext_wash_code: washType.washCode}}).dataValues[0];
      await extWashType.update(
        {
          ext_team_hours: req.body.teamHours,
          ext_team_minutes: req.body.teamMinutes,
          ext_solo_hours: req.body.soloHours,
          ext_solo_minutes: req.body.soloMinutes
        },
        { where: {ext_wash_code: washType.washCode} }
      );
    }

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

// router.put("/:id", async (req, res) => {
//   try {
//     let washType = await WashType.findOne({ where: {id: req.params.id} });

//     let ordersToUpdate;

//     // If the wash type we're updating is an interior wash, get all unscheduled orders with that interior wash code
//     if (washType.type === "I") {
//       ordersToUpdate = await WorkOrder.findAll({
//         where: {int_wash_code: washType.wash_code, is_scheduled: false}
//       });

//       for (let i = 0; i < ordersToUpdate.length; i++) {
//         await ordersToUpdate[i].update(
//           {
//             int_duration_mins_team: (req.body.teamHours * 60) + req.body.teamMinutes,
//             int_duration_mins_solo: (req.body.soloHours * 60) + req.body.soloMinutes
//           },
//           { where: { id: ordersToUpdate[i].id } }
//         )
//       }
      
//     // If the wash type we're updating is an exterior wash, get all unscheduled orders with that exterior wash code
//     } else if (washType.type === "E") {
//       ordersToUpdate = await WorkOrder.findAll({
//         where: {ext_wash_code: washType.wash_code, is_scheduled: false}
//       });

//       for (let i = 0; i < ordersToUpdate.length; i++) {
//         await ordersToUpdate[i].update(
//           {
//             ext_duration_mins_team: (req.body.teamHours * 60) + req.body.teamMinutes,
//             ext_duration_mins_solo: (req.body.soloHours * 60) + req.body.soloMinutes
//           },
//           { where: { id: ordersToUpdate[i].id } }
//         )
//       }
//     }

//     await washType.update(
//       {
//         team_hours: req.body.teamHours,
//         team_minutes: req.body.teamMinutes,
//         solo_hours: req.body.soloHours,
//         solo_minutes: req.body.soloMinutes
//       },
//       { where: {id: washType.id} }
//     );

//     const washTypes = await WashType.findAll({
//       order: [
//         ['wash_code', 'ASC'],
//       ]
//     });

//     res.json({ washTypes });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;