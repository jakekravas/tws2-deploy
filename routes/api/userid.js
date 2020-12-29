const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const open = require('open');

const urlencodedParser = bodyParser.urlencoded({ extended: false});

const BtcWeb_UserRole = require('../../models/BtcWeb_UserRole');
const BtcWeb_UserTerminal = require('../../models/BtcWeb_UserTerminal');
const Recent_User = require('../../models/Recent_User');
const Location = require('../../models/Location');
const Hours = require('../../models/Hours');
const UserCode = require('../../models/UserCode');

let userToSend;

// POST request to http://localhost:3000/api/userid
router.post("/", urlencodedParser, async (req, res) => {
  try {

    console.log("ROUTE HIT");
    console.log("ROUTE HIT");
    console.log("ROUTE HIT");
    console.log("ROUTE HIT");
    console.log("ROUTE HIT");
    
    const submittedUserID = req.body.ctl00$cphBody$UserID;
    const urlUser = submittedUserID.replace("\\", "_");
    userToSend = submittedUserID.replace("\\", "_");

    // await open(`http://localhost:3000`);
    // await open(`https://tank-wash-scheduler-v2.herokuapp.com/user_${urlUser}`);        
  } catch (err) {
    console.log(err);
  }
});

// Check for user
router.get("/checkuser", async (req, res) => {
  try {
    let intervalId = setInterval(() => {
      if (userToSend) {
        console.log(userToSend);
        stopInterval();
        res.json({ userToSend });
      }
    }, 1000);

    const stopInterval = () => clearInterval(intervalId);

  } catch (err) {
    console.log(err);
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
        // let monday = await Hours.findOne({
        //   where:
        //     {
        //       bay: 1,
        //       location_id: location.dataValues.location_id,
        //       day: "Monday"
        //     }
        // });

        let hoursOfLocation = await Hours.findAll({ where: { location_id: location.dataValues.location_id } });

        // terminals.push(location, bayOneHours, bayTwoHours);
        terminals.push(location);
        hours.push(hoursOfLocation);
      }
    }
    
    res.json({ user, role, terminals, hours });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;