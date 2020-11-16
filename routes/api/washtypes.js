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

    if (req.body.type === "I") {

      // update int_wash_type
      await sequelize.query(`
        UPDATE tankwash.int_wash_types
        SET int_team_hours = ${req.body.teamHours},
        int_team_minutes = ${req.body.teamMinutes},
        int_solo_hours = ${req.body.soloHours},
        int_solo_minutes = ${req.body.soloMinutes}
        WHERE int_wash_code = '${req.body.code}'
      `);

    } else if (req.body.type === "E") {

      // update ext_wash_type
      await sequelize.query(`
        UPDATE tankwash.ext_wash_types
        SET ext_team_hours = ${req.body.teamHours},
        ext_team_minutes = ${req.body.teamMinutes},
        ext_solo_hours = ${req.body.soloHours},
        ext_solo_minutes = ${req.body.soloMinutes}
        WHERE ext_wash_code = '${req.body.code}'
      `);

    }

    // update wash_type
    await sequelize.query(`
      UPDATE tankwash.wash_types
      SET team_hours = ${req.body.teamHours},
      team_minutes = ${req.body.teamMinutes},
      solo_hours = ${req.body.soloHours},
      solo_minutes = ${req.body.soloMinutes}
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