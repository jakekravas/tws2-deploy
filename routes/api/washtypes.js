const express = require('express');
const { sequelize } = require('../../models/WashType');
const router = express.Router();

const WashType = require('../../models/WashType');

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
    let teamHoursUpdateVal = req.body.teamHours;
    let teamMinutesUpdateVal = req.body.teamMinutes;
    let soloHoursUpdateVal = req.body.soloHours;
    let soloMinutesUpdateVal = req.body.soloMinutes;

    if (req.body.teamHours === null) teamHoursUpdateVal = 0;
    if (req.body.teamMinutes === null) teamMinutesUpdateVal = 0;
    if (req.body.soloHours === null) soloHoursUpdateVal = 0;
    if (req.body.soloMinutes === null) soloMinutesUpdateVal = 0;

    if (req.body.type === "I") {

      // update int_wash_type
      await sequelize.query(`
        UPDATE tankwash.int_wash_types
        SET int_team_hours = ${teamHoursUpdateVal},
        int_team_minutes = ${teamMinutesUpdateVal},
        int_solo_hours = ${soloHoursUpdateVal},
        int_solo_minutes = ${soloMinutesUpdateVal}
        WHERE int_wash_code = '${req.body.code}'
      `);

    } else if (req.body.type === "E") {

      // update ext_wash_type
      await sequelize.query(`
        UPDATE tankwash.ext_wash_types
        SET ext_team_hours = ${teamHoursUpdateVal},
        ext_team_minutes = ${teamMinutesUpdateVal},
        ext_solo_hours = ${soloHoursUpdateVal},
        ext_solo_minutes = ${soloMinutesUpdateVal}
        WHERE ext_wash_code = '${req.body.code}'
      `);

    }

    // update wash_type
    await sequelize.query(`
      UPDATE tankwash.wash_types
      SET team_hours = ${teamHoursUpdateVal},
      team_minutes = ${teamMinutesUpdateVal},
      solo_hours = ${soloHoursUpdateVal},
      solo_minutes = ${soloMinutesUpdateVal}
      WHERE wash_code = '${req.body.code}'
    `);

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