const express = require('express');
const router = express.Router();

const WorkOrder = require('../../models/WorkOrder');
const TrailerWashWo = require('../../models/TrailerWashWo');
const TrailerWashWoLog = require('../../models/TrailerWashWoLog');
const { sequelize } = require('../../models/WorkOrder');

// @route      GET api/workorders/:code
// @desc       Get all work orders of a specific location
// @access     Public
router.get("/:code", async (req, res) => {
  try {
    const workOrders = await WorkOrder.findAll(
      {
        where: { wash_location_id: req.params.code }
      }
    );
    
    res.json({ workOrders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      GET api/workorders/logs/:washId
// @desc       Get changelog of specific work order
// @access     Private
router.get("/logs/:washId", async (req, res) => {
  try {
    const logs = await sequelize.query(`
    SELECT * FROM tankwash.trailer_wash_wo_logs
    WHERE key_value = '${req.params.washId}'
    `);
    
    res.json({ logs });
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

    const workOrders = await sequelize.query(`SELECT * FROM tankwash.trailer_wash_wo wo
    LEFT JOIN (select id as ext_id, 
    wash_code as ext_wash_code, 
    description as ext_description, 
    type as ext_type, 
    team_hours as ext_team_hours, 
    team_minutes as ext_team_minutes, 
    solo_hours as ext_solo_hours, 
    solo_minutes as ext_solo_minutes
    from tankwash.wash_types where type = 'E') ext ON wo.ext_wash_code = ext.ext_wash_code 
      LEFT JOIN (select id as int_id, 
    wash_code as int_wash_code, 
    description as int_description, 
    type as int_type, 
    team_hours as int_team_hours, 
    team_minutes as int_team_minutes, 
    solo_hours as int_solo_hours, 
    solo_minutes as int_solo_minutes
    from tankwash.wash_types where type = 'I') int ON wo.int_wash_code = int.int_wash_code
    WHERE wo.wash_location_id IN (${locationsArr})
    AND wo.void = 'N'
    AND wo.history = false
    AND wo.wash_location_id IS NOT NULL
    AND wo.order_id IS NOT NULL
    AND wo.trailer_id IS NOT NULL
    AND wo.int_wash_code IS NOT null;`);

    const workOrderLogs = await sequelize.query(`
      SELECT * FROM tankwash.trailer_wash_wo_logs
    `);

    res.json({ workOrders, workOrderLogs: workOrderLogs[0] });

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
    const workOrderPrev = await sequelize.query(`SELECT * FROM tankwash.trailer_wash_wo WHERE wash_id = ${req.params.id}`);

    await TrailerWashWo.update(
      {
        resource: req.body.resource,
        start_time: req.body.start,
        end_time: req.body.end,
        is_scheduled: true
      },
      {where: { wash_id: req.params.id }}
    )

    const workOrder = await sequelize.query(`SELECT * FROM tankwash.trailer_wash_wo wo
    LEFT JOIN (select id as ext_id, 
    wash_code as ext_wash_code, 
    description as ext_description, 
    type as ext_type, 
    team_hours as ext_team_hours, 
    team_minutes as ext_team_minutes, 
    solo_hours as ext_solo_hours, 
    solo_minutes as ext_solo_minutes
    from tankwash.wash_types where type = 'E') ext ON wo.ext_wash_code = ext.ext_wash_code 
      LEFT JOIN (select id as int_id, 
    wash_code as int_wash_code, 
    description as int_description, 
    type as int_type, 
    team_hours as int_team_hours, 
    team_minutes as int_team_minutes, 
    solo_hours as int_solo_hours, 
    solo_minutes as int_solo_minutes
    from tankwash.wash_types where type = 'I') int ON wo.int_wash_code = int.int_wash_code
    WHERE wo.wash_id = ${req.params.id}`);
    
    res.json({ workOrder: workOrder[0][0] });

    let currentTime = new Date();
    currentTime = currentTime.toUTCString();
    
    if (workOrderPrev[0][0].is_scheduled) {
      let changedFrom = new Date(workOrderPrev[0][0].start_time);
      let month = changedFrom.getMonth()+1;
      if (month < 10) month = `0${month}`;
      changedFrom = changedFrom.toUTCString();
      let changedFromStr = `${changedFrom.split(" ")[3]}-${month}-${changedFrom.split(" ")[1]}T${changedFrom.split(" ")[4]}`;
  
      await sequelize.query(`
        INSERT INTO tankwash.trailer_wash_wo_logs(application_name, table_name, column_name, key_value, changed_by, changed_at, changed_from, changed_to)
        VALUES ('Scheduler', 'trailer_wash_wo', 'start_time', '${req.params.id}', '${req.body.user}', '${currentTime}', '${changedFromStr}', '${req.body.start}')
      `);
    } else {
      await sequelize.query(`
        INSERT INTO tankwash.trailer_wash_wo_logs(application_name, table_name, column_name, key_value, changed_by, changed_at, changed_from, changed_to)
        VALUES ('Scheduler', 'trailer_wash_wo', 'start_time', '${req.params.id}', '${req.body.user}', '${currentTime}', '', '${req.body.start}')
      `);
    }

    // const log = await TrailerWashWoLog.findOne({
    //   where: { wash_id: req.params.id }
    // });

    // let currentTime = new Date();
    // currentTime = currentTime.toUTCString();

    // if (log !== null) {
    //   await TrailerWashWoLog.update(
    //     {
    //       scheduled_by: req.body.user,
    //       scheduled_at: currentTime,
    //       is_scheduled: true
    //     },
    //     {where: { wash_id: req.params.id }}
    //   )
    // } else {
    //   await sequelize.query(`
    //     INSERT INTO tankwash.trailer_wash_wo_logs
    //     (wash_id, scheduled_by, scheduled_at, is_scheduled)
    //     VALUES (${req.params.id}, '${req.body.user}', '${currentTime}', true)
    //   `);
    // }

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
    const workOrderPrev = await sequelize.query(`SELECT * FROM tankwash.trailer_wash_wo WHERE wash_id = ${req.params.id}`);

    await TrailerWashWo.update(
      {
        is_scheduled: false,
      },
      {where: { wash_id: req.params.id }}
    );

    const workOrder = await sequelize.query(`SELECT * FROM tankwash.trailer_wash_wo wo
    LEFT JOIN (select id as ext_id, 
    wash_code as ext_wash_code, 
    description as ext_description, 
    type as ext_type, 
    team_hours as ext_team_hours, 
    team_minutes as ext_team_minutes, 
    solo_hours as ext_solo_hours, 
    solo_minutes as ext_solo_minutes
    from tankwash.wash_types where type = 'E') ext ON wo.ext_wash_code = ext.ext_wash_code 
      LEFT JOIN (select id as int_id, 
    wash_code as int_wash_code, 
    description as int_description, 
    type as int_type, 
    team_hours as int_team_hours, 
    team_minutes as int_team_minutes, 
    solo_hours as int_solo_hours, 
    solo_minutes as int_solo_minutes
    from tankwash.wash_types where type = 'I') int ON wo.int_wash_code = int.int_wash_code
    WHERE wo.wash_id = ${req.params.id}`);
    
    res.json({ workOrder: workOrder[0][0] });

    let currentTime = new Date();
    currentTime = currentTime.toUTCString();
    
    let changedFrom = new Date(workOrderPrev[0][0].start_time);
    let month = changedFrom.getMonth()+1;
    if (month < 10) month = `0${month}`;
    changedFrom = changedFrom.toUTCString();
    let changedFromStr = `${changedFrom.split(" ")[3]}-${month}-${changedFrom.split(" ")[1]}T${changedFrom.split(" ")[4]}`;

    await sequelize.query(`
      INSERT INTO tankwash.trailer_wash_wo_logs(application_name, table_name, column_name, key_value, changed_by, changed_at, changed_from, changed_to)
      VALUES ('Scheduler', 'trailer_wash_wo', 'start_time', '${req.params.id}', '${req.body.user}', '${currentTime}', '${changedFromStr}', '')
    `);

    // const log = await TrailerWashWoLog.findOne({
    //   where: { wash_id: req.params.id }
    // });

    // let currentTime = new Date();
    // currentTime = currentTime.toUTCString();

    // if (log !== null) {
    //   await TrailerWashWoLog.update(
    //     {
    //       scheduled_by: req.body.user,
    //       scheduled_at: currentTime,
    //       is_scheduled: false
    //     },
    //     {where: { wash_id: req.params.id }}
    //   )
    // } else {
    //   await sequelize.query(`
    //     INSERT INTO tankwash.trailer_wash_wo_logs
    //     (wash_id, scheduled_by, scheduled_at, is_scheduled)
    //     VALUES (${req.params.id}, '${req.body.user}', '${currentTime}', false)
    //   `);
    // }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;