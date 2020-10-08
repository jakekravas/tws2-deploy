const express = require('express');
const router = express.Router();

const Location = require('../../models/Location');
const BayOneMondayHrs = require('../../models/BayOneMondayHrs');
const BayOneTuesdayHrs = require('../../models/BayOneTuesdayHrs');
const BayOneWednesdayHrs = require('../../models/BayOneWednesdayHrs');
const BayOneThursdayHrs = require('../../models/BayOneThursdayHrs');
const BayOneFridayHrs = require('../../models/BayOneFridayHrs');
const BayOneSaturdayHrs = require('../../models/BayOneSaturdayHrs');
const BayOneSundayHrs = require('../../models/BayOneSundayHrs');
const BayTwoMondayHrs = require('../../models/BayTwoMondayHrs');
const BayTwoTuesdayHrs = require('../../models/BayTwoTuesdayHrs');
const BayTwoWednesdayHrs = require('../../models/BayTwoWednesdayHrs');
const BayTwoThursdayHrs = require('../../models/BayTwoThursdayHrs');
const BayTwoFridayHrs = require('../../models/BayTwoFridayHrs');
const BayTwoSaturdayHrs = require('../../models/BayTwoSaturdayHrs');
const BayTwoSundayHrs = require('../../models/BayTwoSundayHrs');

// @route      GET api/locations
// @desc       Get all locations
// @access     Public
router.get("/", async (req, res) => {
  try {
    const locations = await Location.findAll({
      order: [
        ['city', 'ASC'],
      ]
    });

    res.json({ locations });
  } catch (err) {
    console.log(err);
  }
});

// @route      GET api/locations/:id
// @desc       Get specific location with its hours
// @access     Public
router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findOne({ where: { id: req.params.id } });

    if (!location) return res.json({ msg: "Location data not found" });
    
    const monday = await BayOneMondayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const tuesday = await BayOneTuesdayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const wednesday = await BayOneWednesdayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const thursday = await BayOneThursdayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const friday = await BayOneFridayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const saturday = await BayOneSaturdayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const sunday = await BayOneSundayHrs.findOne({ where: { location_id: location.dataValues.location_id } });

    const monday2 = await BayTwoMondayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const tuesday2 = await BayTwoTuesdayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const wednesday2 = await BayTwoWednesdayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const thursday2 = await BayTwoThursdayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const friday2 = await BayTwoFridayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const saturday2 = await BayTwoSaturdayHrs.findOne({ where: { location_id: location.dataValues.location_id } });
    const sunday2 = await BayTwoSundayHrs.findOne({ where: { location_id: location.dataValues.location_id } });

    const bayOneHours = {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    }
    
    const bayTwoHours = {
      monday: monday2,
      tuesday: tuesday2,
      wednesday: wednesday2,
      thursday: thursday2,
      friday: friday2,
      saturday: saturday2,
      sunday: sunday2
    }
    
    return res.json({ location, bayOneHours, bayTwoHours });
  } catch (err) {
    console.log(err);
    // console.error(err.message);
    // res.status(500).send("Server error");
  }
});

// @route      PUT api/locations/washbays/:id
// @desc       Update number of washbays at a location
// @access     Public
router.put("/washbays/:id", async (req, res) => {
  try {
    // let location = await Location.findById(req.params.id);
    let locationToUpdate = await Location.findOne({ where: {id: req.params.id} });
    
    if (!locationToUpdate) return res.json({ msg: "Location not found" });
    
    const location = await locationToUpdate.update(
      { wash_bays: parseInt(req.body.washBays) },
      { where: { id: req.params.id } }
    );

    // Bay one hours
    const monday = await BayOneMondayHrs.findOne({where:{location_id: location.location_id}});
    const tuesday = await BayOneTuesdayHrs.findOne({where:{location_id: location.location_id}});
    const wednesday = await BayOneWednesdayHrs.findOne({where:{location_id: location.location_id}});
    const thursday = await BayOneThursdayHrs.findOne({where:{location_id: location.location_id}});
    const friday = await BayOneFridayHrs.findOne({where:{location_id: location.location_id}});
    const saturday = await BayOneSaturdayHrs.findOne({where:{location_id: location.location_id}});
    const sunday = await BayOneSundayHrs.findOne({where:{location_id: location.location_id}});

    // Bay two hours
    const monday2 = await BayTwoMondayHrs.findOne({where:{location_id: location.location_id}});
    const tuesday2 = await BayTwoTuesdayHrs.findOne({where:{location_id: location.location_id}});
    const wednesday2 = await BayTwoWednesdayHrs.findOne({where:{location_id: location.location_id}});
    const thursday2 = await BayTwoThursdayHrs.findOne({where:{location_id: location.location_id}});
    const friday2 = await BayTwoFridayHrs.findOne({where:{location_id: location.location_id}});
    const saturday2 = await BayTwoSaturdayHrs.findOne({where:{location_id: location.location_id}});
    const sunday2 = await BayTwoSundayHrs.findOne({where:{location_id: location.location_id}});

    const bayOneHours = {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    };

    const bayTwoHours = {
      monday: monday2,
      tuesday: tuesday2,
      wednesday: wednesday2,
      thursday: thursday2,
      friday: friday2,
      saturday: saturday2,
      sunday: sunday2
    };

    return res.json({ location, bayOneHours, bayTwoHours });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      PUT api/locations/hours/:location_id
// @desc       Update hours at a location
// @access     Public
router.put("/hours/:location_id", async (req, res) => {
  try {
    // Get location
    const location = await Location.findOne({ where: { location_id: req.params.location_id }});

    // Bay one hours
    const monday = await BayOneMondayHrs.findOne({where:{location_id: req.params.location_id}});
    const tuesday = await BayOneTuesdayHrs.findOne({where:{location_id: req.params.location_id}});
    const wednesday = await BayOneWednesdayHrs.findOne({where:{location_id: req.params.location_id}});
    const thursday = await BayOneThursdayHrs.findOne({where:{location_id: req.params.location_id}});
    const friday = await BayOneFridayHrs.findOne({where:{location_id: req.params.location_id}});
    const saturday = await BayOneSaturdayHrs.findOne({where:{location_id: req.params.location_id}});
    const sunday = await BayOneSundayHrs.findOne({where:{location_id: req.params.location_id}});

    // Bay two hours
    const monday2 = await BayTwoMondayHrs.findOne({where:{location_id: req.params.location_id}});
    const tuesday2 = await BayTwoTuesdayHrs.findOne({where:{location_id: req.params.location_id}});
    const wednesday2 = await BayTwoWednesdayHrs.findOne({where:{location_id: req.params.location_id}});
    const thursday2 = await BayTwoThursdayHrs.findOne({where:{location_id: req.params.location_id}});
    const friday2 = await BayTwoFridayHrs.findOne({where:{location_id: req.params.location_id}});
    const saturday2 = await BayTwoSaturdayHrs.findOne({where:{location_id: req.params.location_id}});
    const sunday2 = await BayTwoSundayHrs.findOne({where:{location_id: req.params.location_id}});

    const monResult = await monday.update(
      {
        is_open: req.body.bayOneHours.monday.isOpen,
        shift_one_start: req.body.bayOneHours.monday.start,
        shift_one_end: req.body.bayOneHours.monday.end,
        shift_one_type: req.body.bayOneHours.monday.type,
        shift_two_open: req.body.bayOneHours.monday.shift2,
        shift_two_start: req.body.bayOneHours.monday.shift2Start,
        shift_two_end: req.body.bayOneHours.monday.shift2End,
        shift_two_type: req.body.bayOneHours.monday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );

    const tuesResult = await tuesday.update(
      {
        is_open: req.body.bayOneHours.tuesday.isOpen,
        shift_one_start: req.body.bayOneHours.tuesday.start,
        shift_one_end: req.body.bayOneHours.tuesday.end,
        shift_one_type: req.body.bayOneHours.tuesday.type,
        shift_two_open: req.body.bayOneHours.tuesday.shift2,
        shift_two_start: req.body.bayOneHours.tuesday.shift2Start,
        shift_two_end: req.body.bayOneHours.tuesday.shift2End,
        shift_two_type: req.body.bayOneHours.tuesday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );
    
    const wedResult = await wednesday.update(
      {
        is_open: req.body.bayOneHours.wednesday.isOpen,
        shift_one_start: req.body.bayOneHours.wednesday.start,
        shift_one_end: req.body.bayOneHours.wednesday.end,
        shift_one_type: req.body.bayOneHours.wednesday.type,
        shift_two_open: req.body.bayOneHours.wednesday.shift2,
        shift_two_start: req.body.bayOneHours.wednesday.shift2Start,
        shift_two_end: req.body.bayOneHours.wednesday.shift2End,
        shift_two_type: req.body.bayOneHours.wednesday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );

    const thursResult = await thursday.update(
      {
        is_open: req.body.bayOneHours.thursday.isOpen,
        shift_one_start: req.body.bayOneHours.thursday.start,
        shift_one_end: req.body.bayOneHours.thursday.end,
        shift_one_type: req.body.bayOneHours.thursday.type,
        shift_two_open: req.body.bayOneHours.thursday.shift2,
        shift_two_start: req.body.bayOneHours.thursday.shift2Start,
        shift_two_end: req.body.bayOneHours.thursday.shift2End,
        shift_two_type: req.body.bayOneHours.thursday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );
    
    const friResult = await friday.update(
      {
        is_open: req.body.bayOneHours.friday.isOpen,
        shift_one_start: req.body.bayOneHours.friday.start,
        shift_one_end: req.body.bayOneHours.friday.end,
        shift_one_type: req.body.bayOneHours.friday.type,
        shift_two_open: req.body.bayOneHours.friday.shift2,
        shift_two_start: req.body.bayOneHours.friday.shift2Start,
        shift_two_end: req.body.bayOneHours.friday.shift2End,
        shift_two_type: req.body.bayOneHours.friday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );
      
    const satResult = await saturday.update(
      {
        is_open: req.body.bayOneHours.saturday.isOpen,
        shift_one_start: req.body.bayOneHours.saturday.start,
        shift_one_end: req.body.bayOneHours.saturday.end,
        shift_one_type: req.body.bayOneHours.saturday.type,
        shift_two_open: req.body.bayOneHours.saturday.shift2,
        shift_two_start: req.body.bayOneHours.saturday.shift2Start,
        shift_two_end: req.body.bayOneHours.saturday.shift2End,
        shift_two_type: req.body.bayOneHours.saturday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );

    const sunResult = await sunday.update(
      {
        is_open: req.body.bayOneHours.sunday.isOpen,
        shift_one_start: req.body.bayOneHours.sunday.start,
        shift_one_end: req.body.bayOneHours.sunday.end,
        shift_one_type: req.body.bayOneHours.sunday.type,
        shift_two_open: req.body.bayOneHours.sunday.shift2,
        shift_two_start: req.body.bayOneHours.sunday.shift2Start,
        shift_two_end: req.body.bayOneHours.sunday.shift2End,
        shift_two_type: req.body.bayOneHours.sunday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );

    // Bay 2
    const monResult2 = await monday2.update(
      {
        is_open: req.body.bayTwoHours.monday.isOpen,
        shift_one_start: req.body.bayTwoHours.monday.start,
        shift_one_end: req.body.bayTwoHours.monday.end,
        shift_one_type: req.body.bayTwoHours.monday.type,
        shift_two_open: req.body.bayTwoHours.monday.shift2,
        shift_two_start: req.body.bayTwoHours.monday.shift2Start,
        shift_two_end: req.body.bayTwoHours.monday.shift2End,
        shift_two_type: req.body.bayTwoHours.monday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );

    const tuesResult2 = await tuesday2.update(
      {
        is_open: req.body.bayTwoHours.tuesday.isOpen,
        shift_one_start: req.body.bayTwoHours.tuesday.start,
        shift_one_end: req.body.bayTwoHours.tuesday.end,
        shift_one_type: req.body.bayTwoHours.tuesday.type,
        shift_two_open: req.body.bayTwoHours.tuesday.shift2,
        shift_two_start: req.body.bayTwoHours.tuesday.shift2Start,
        shift_two_end: req.body.bayTwoHours.tuesday.shift2End,
        shift_two_type: req.body.bayTwoHours.tuesday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );
    
    const wedResult2 = await wednesday2.update(
      {
        is_open: req.body.bayTwoHours.wednesday.isOpen,
        shift_one_start: req.body.bayTwoHours.wednesday.start,
        shift_one_end: req.body.bayTwoHours.wednesday.end,
        shift_one_type: req.body.bayTwoHours.wednesday.type,
        shift_two_open: req.body.bayTwoHours.wednesday.shift2,
        shift_two_start: req.body.bayTwoHours.wednesday.shift2Start,
        shift_two_end: req.body.bayTwoHours.wednesday.shift2End,
        shift_two_type: req.body.bayTwoHours.wednesday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );

    const thursResult2 = await thursday2.update(
      {
        is_open: req.body.bayTwoHours.thursday.isOpen,
        shift_one_start: req.body.bayTwoHours.thursday.start,
        shift_one_end: req.body.bayTwoHours.thursday.end,
        shift_one_type: req.body.bayTwoHours.thursday.type,
        shift_two_open: req.body.bayTwoHours.thursday.shift2,
        shift_two_start: req.body.bayTwoHours.thursday.shift2Start,
        shift_two_end: req.body.bayTwoHours.thursday.shift2End,
        shift_two_type: req.body.bayTwoHours.thursday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );
    
    const friResult2 = await friday2.update(
      {
        is_open: req.body.bayTwoHours.friday.isOpen,
        shift_one_start: req.body.bayTwoHours.friday.start,
        shift_one_end: req.body.bayTwoHours.friday.end,
        shift_one_type: req.body.bayTwoHours.friday.type,
        shift_two_open: req.body.bayTwoHours.friday.shift2,
        shift_two_start: req.body.bayTwoHours.friday.shift2Start,
        shift_two_end: req.body.bayTwoHours.friday.shift2End,
        shift_two_type: req.body.bayTwoHours.friday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );
      
    const satResult2 = await saturday2.update(
      {
        is_open: req.body.bayTwoHours.saturday.isOpen,
        shift_one_start: req.body.bayTwoHours.saturday.start,
        shift_one_end: req.body.bayTwoHours.saturday.end,
        shift_one_type: req.body.bayTwoHours.saturday.type,
        shift_two_open: req.body.bayTwoHours.saturday.shift2,
        shift_two_start: req.body.bayTwoHours.saturday.shift2Start,
        shift_two_end: req.body.bayTwoHours.saturday.shift2End,
        shift_two_type: req.body.bayTwoHours.saturday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );

    const sunResult2 = await sunday2.update(
      {
        is_open: req.body.bayTwoHours.sunday.isOpen,
        shift_one_start: req.body.bayTwoHours.sunday.start,
        shift_one_end: req.body.bayTwoHours.sunday.end,
        shift_one_type: req.body.bayTwoHours.sunday.type,
        shift_two_open: req.body.bayTwoHours.sunday.shift2,
        shift_two_start: req.body.bayTwoHours.sunday.shift2Start,
        shift_two_end: req.body.bayTwoHours.sunday.shift2End,
        shift_two_type: req.body.bayTwoHours.sunday.shift2Type
      },
      { where: { location_id: req.params.location_id } }
    );

    const bayOneHours = {
      monday: monResult,
      tuesday: tuesResult,
      wednesday: wedResult,
      thursday: thursResult,
      friday: friResult,
      saturday: satResult,
      sunday: sunResult
    };

    const bayTwoHours = {
      monday: monResult2,
      tuesday: tuesResult2,
      wednesday: wedResult2,
      thursday: thursResult2,
      friday: friResult2,
      saturday: satResult2,
      sunday: sunResult2
    };

    return res.json({ location, bayOneHours, bayTwoHours });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;