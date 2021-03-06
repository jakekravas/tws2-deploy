const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false});

const BtcWeb_UserRole = require('../../models/BtcWeb_UserRole');
const BtcWeb_UserTerminal = require('../../models/BtcWeb_UserTerminal');
const Location = require('../../models/Location');
const Hours = require('../../models/Hours');

let userToSend = null;

router.post("/", urlencodedParser, async (req, res) => {
  try {
    
    const submittedUserID = req.body.ctl00$cphBody$UserID;
    
    userToSend = submittedUserID.replace("\\", "_");

    // Letting the front-end know that the data was successfully handled
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: "OK" }));
    res.end();

  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
});

// Check for user
router.get("/checkuser", async (req, res) => {
  try {

    if (userToSend !== null) {
      console.log(`User: ${userToSend}`);
      res.json({ userToSend });
      userToSend = null;
    }

  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
});

// GET user
router.get("/user/:user", async (req, res) => {
  try {
    const user = req.params.user.replace("_", "\\");
    const userRole = await BtcWeb_UserRole.findAll({
      where: { UserID: user }
    });

    const userTerminal = await BtcWeb_UserTerminal.findAll({
      where: { UserID: user }
    });

    const role = userRole[0].dataValues.RoleID;

    const terminalsToLoop = userTerminal.map(i => i.dataValues.Terminal);
    const terminals = [];
    const hours = [];

    for (let i = 0; i < terminalsToLoop.length; i++) {
      let location = await Location.findOne({ where: { terminal_id: terminalsToLoop[i]}});
      if (location) {

        let hoursOfLocation = await Hours.findAll({ where: { location_id: location.dataValues.location_id } });

        terminals.push(location);
        hours.push(hoursOfLocation);
      }
    }
    
    res.json({ user, role, terminals, hours });
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
});

module.exports = router;