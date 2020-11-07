const express = require('express');
const router = express.Router();

const Location = require('../../models/Location');
const WorkOrder = require('../../models/WorkOrder');
const Hours = require('../../models/Hours');

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
    
    const monday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Monday"
        }
    });
    const tuesday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Tuesday"
        }
    });
    const wednesday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Wednesday"
        }
    });
    const thursday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Thursday"
        }
    });
    const friday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Friday"
        }
    });
    const saturday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Saturday"
        }
    });
    const sunday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Sunday"
        }
    });

    // BAY 2
    const monday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Monday"
        }
    });
    const tuesday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Tuesday"
        }
    });
    const wednesday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Wednesday"
        }
    });
    const thursday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Thursday"
        }
    });
    const friday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Friday"
        }
    });
    const saturday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Saturday"
        }
    });
    const sunday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Sunday"
        }
    });

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

    if (req.body.washBays === 1) {
      // Find all orders of this location that are scheduled for bay 2
      let ordersToUnschedule = await WorkOrder.findAll({
        where: {wash_location_id: locationToUpdate.location_id, is_scheduled: true, resource: `${locationToUpdate.location_id}2`}
      });

      if (ordersToUnschedule.length > 0) {
        // Unscheduling orders that were scheduled on bay 2 of this location
        for (let i = 0; i < ordersToUnschedule.length; i++) {
          await ordersToUnschedule[i].update(
            { is_scheduled: false },
            { where: { id: ordersToUnschedule[i].id } }
          )
        }
      }
    }

    // Bay one hours
    const monday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Monday"
        }
    });
    const tuesday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Tuesday"
        }
    });
    const wednesday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Wednesday"
        }
    });
    const thursday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Thursday"
        }
    });
    const friday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Friday"
        }
    });
    const saturday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Saturday"
        }
    });
    const sunday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Sunday"
        }
    });

    // Bay two hours
    const monday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Monday"
        }
    });
    const tuesday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Tuesday"
        }
    });
    const wednesday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Wednesday"
        }
    });
    const thursday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Thursday"
        }
    });
    const friday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Friday"
        }
    });
    const saturday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Saturday"
        }
    });
    const sunday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Sunday"
        }
    });

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
    const monday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Monday"
        }
    });
    const tuesday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Tuesday"
        }
    });
    const wednesday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Wednesday"
        }
    });
    const thursday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Thursday"
        }
    });
    const friday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Friday"
        }
    });
    const saturday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Saturday"
        }
    });
    const sunday = await Hours.findOne({
      where:
        {
          bay: 1,
          location_id: location.dataValues.location_id,
          day: "Sunday"
        }
    });

    // Bay two hours
    const monday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Monday"
        }
    });
    const tuesday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Tuesday"
        }
    });
    const wednesday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Wednesday"
        }
    });
    const thursday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Thursday"
        }
    });
    const friday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Friday"
        }
    });
    const saturday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Saturday"
        }
    });
    const sunday2 = await Hours.findOne({
      where:
        {
          bay: 2,
          location_id: location.dataValues.location_id,
          day: "Sunday"
        }
    });

    // Update
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
      { where: { location_id: req.params.location_id, day: "Monday", bay: 1 } }
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
      { where: { location_id: req.params.location_id, day: "Tuesday", bay: 1 } }
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
      { where: { location_id: req.params.location_id, day: "Wednesday", bay: 1 } }
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
      { where: { location_id: req.params.location_id, day: "Thursday", bay: 1 } }
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
      { where: { location_id: req.params.location_id, day: "Friday", bay: 1 } }
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
      { where: { location_id: req.params.location_id, day: "Saturday", bay: 1 } }
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
      { where: { location_id: req.params.location_id, day: "Sunday", bay: 1 } }
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
      { where: { location_id: req.params.location_id, day: "Monday", bay: 2 } }
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
      { where: { location_id: req.params.location_id, day: "Tuesday", bay: 2 } }
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
      { where: { location_id: req.params.location_id, day: "Wednesday", bay: 2 } }
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
      { where: { location_id: req.params.location_id, day: "Thursday", bay: 2 } }
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
      { where: { location_id: req.params.location_id, day: "Friday", bay: 2 } }
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
      { where: { location_id: req.params.location_id, day: "Saturday", bay: 2 } }
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
      { where: { location_id: req.params.location_id, day: "Sunday", bay: 2 } }
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