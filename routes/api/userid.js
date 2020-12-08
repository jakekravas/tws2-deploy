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

// POST request to http://localhost:3000/api/userid
router.post("/", urlencodedParser, async (req, res) => {
  try {
    const submittedUserID = req.body.ctl00$cphBody$UserID;
    const urlUser = submittedUserID.replace("\\", "_");

    // const UserRole = await BtcWeb_UserRole.findAll({
    //   where: { UserID:  submittedUserID}
    // });

    // const userCode = await UserCode.findAll({ where: { username: submittedUserID } }).dataValues[0].code;

    // const userCodeInfo = await UserCode.findAll({ where: { username: submittedUserID } });
    // const userCode = userCodeInfo[0].dataValues.code;

    // const role = UserRole[0].dataValues.RoleID; //their role

    // const UserTerminal = await BtcWeb_UserTerminal.findAll({
    //   where: { UserID:  submittedUserID}
    // });

    // const terminalArr = UserTerminal.map(i => i.dataValues.Terminal); //arr of terminals

    // const ranStr = "asdf";

    // await open(`http://localhost:3000/user_${urlUser}`);
    await open(`https://tank-wash-scheduler-v2.herokuapp.com/user_${urlUser}`);
    // await open(`http://localhost:3000/${submittedUserID}`);
    // await open(`http://localhost:3000/${submittedUserID}/${userCode}`);
    // await open(`http://localhost:3000/${submittedUserID.split(".")[0]}`);
        
    // res.json({ role_id: role, terminals: terminalArr });
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