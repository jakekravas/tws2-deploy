const express = require('express');
const router = express.Router();

const Location = require('../../models/Location');

// @route      GET api/location
// @desc       Get all locations
// @access     Public
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    res.json({ locations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      GET api/location/:id
// @desc       Get specific location
// @access     Public
router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.json({
        msg: "Location data not found"
      });
    }

    return res.json({ location });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      POST api/location/
// @desc       Add new location
// @access     Public
router.post("/", async (req, res) => {
  try {
    const newLocation = new Location({
      location_id: req.body.location_id,
      terminal_id: req.body.terminal_id,
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      washBays: req.body.washBays
    });

    const location = await newLocation.save();

    res.json({location});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      PUT api/location/washbays/:id
// @desc       Update number of washbays at a location
// @access     Public
router.put("/washbays/:id", async (req, res) => {
  try {
    let location = await Location.findById(req.params.id);

    if (!location) {
      return res.json({ msg: "Location not found" });
    }

    location = await Location.findByIdAndUpdate(
      req.params.id,
      { $set: {washBays: req.body.washBays} },
      { new: true }
    );

    return res.json({ location });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route      PUT api/location/hours/:id
// @desc       Update hours of a location
// @access     Public
router.put("/hours/:id", async (req, res) => {
    const bayOneHours = {
      monday: 
        {
          isOpen: req.body.bayOneHours.monday.isOpen,
          twentyFourHrs: req.body.bayOneHours.monday.twentyFourHrs,
          start: req.body.bayOneHours.monday.start,
          end: req.body.bayOneHours.monday.end,
          type: req.body.bayOneHours.monday.type,
          shift2: req.body.bayOneHours.monday.shift2,
          shift2Start: req.body.bayOneHours.monday.shift2Start,
          shift2End: req.body.bayOneHours.monday.shift2End,
          shift2Type: req.body.bayOneHours.monday.shift2Type
        },
      tuesday: 
        {
          isOpen: req.body.bayOneHours.tuesday.isOpen,
          twentyFourHrs: req.body.bayOneHours.tuesday.twentyFourHrs,
          start: req.body.bayOneHours.tuesday.start,
          end: req.body.bayOneHours.tuesday.end,
          type: req.body.bayOneHours.tuesday.type,
          shift2: req.body.bayOneHours.tuesday.shift2,
          shift2Start: req.body.bayOneHours.tuesday.shift2Start,
          shift2End: req.body.bayOneHours.tuesday.shift2End,
          shift2Type: req.body.bayOneHours.tuesday.shift2Type
        },
      wednesday: 
        {
          isOpen: req.body.bayOneHours.wednesday.isOpen,
          twentyFourHrs: req.body.bayOneHours.wednesday.twentyFourHrs,
          start: req.body.bayOneHours.wednesday.start,
          end: req.body.bayOneHours.wednesday.end,
          type: req.body.bayOneHours.wednesday.type,
          shift2: req.body.bayOneHours.wednesday.shift2,
          shift2Start: req.body.bayOneHours.wednesday.shift2Start,
          shift2End: req.body.bayOneHours.wednesday.shift2End,
          shift2Type: req.body.bayOneHours.wednesday.shift2Type
        },
      thursday: 
        {
          isOpen: req.body.bayOneHours.thursday.isOpen,
          twentyFourHrs: req.body.bayOneHours.thursday.twentyFourHrs,
          start: req.body.bayOneHours.thursday.start,
          end: req.body.bayOneHours.thursday.end,
          type: req.body.bayOneHours.thursday.type,
          shift2: req.body.bayOneHours.thursday.shift2,
          shift2Start: req.body.bayOneHours.thursday.shift2Start,
          shift2End: req.body.bayOneHours.thursday.shift2End,
          shift2Type: req.body.bayOneHours.thursday.shift2Type
        },
      friday: 
        {
          isOpen: req.body.bayOneHours.friday.isOpen,
          twentyFourHrs: req.body.bayOneHours.friday.twentyFourHrs,
          start: req.body.bayOneHours.friday.start,
          end: req.body.bayOneHours.friday.end,
          type: req.body.bayOneHours.friday.type,
          shift2: req.body.bayOneHours.friday.shift2,
          shift2Start: req.body.bayOneHours.friday.shift2Start,
          shift2End: req.body.bayOneHours.friday.shift2End,
          shift2Type: req.body.bayOneHours.friday.shift2Type
        },
      saturday: 
        {
          isOpen: req.body.bayOneHours.saturday.isOpen,
          twentyFourHrs: req.body.bayOneHours.saturday.twentyFourHrs,
          start: req.body.bayOneHours.saturday.start,
          end: req.body.bayOneHours.saturday.end,
          type: req.body.bayOneHours.saturday.type,
          shift2: req.body.bayOneHours.saturday.shift2,
          shift2Start: req.body.bayOneHours.saturday.shift2Start,
          shift2End: req.body.bayOneHours.saturday.shift2End,
          shift2Type: req.body.bayOneHours.saturday.shift2Type
        },
      sunday: 
        {
          isOpen: req.body.bayOneHours.sunday.isOpen,
          twentyFourHrs: req.body.bayOneHours.sunday.twentyFourHrs,
          start: req.body.bayOneHours.sunday.start,
          end: req.body.bayOneHours.sunday.end,
          type: req.body.bayOneHours.sunday.type,
          shift2: req.body.bayOneHours.sunday.shift2,
          shift2Start: req.body.bayOneHours.sunday.shift2Start,
          shift2End: req.body.bayOneHours.sunday.shift2End,
          shift2Type: req.body.bayOneHours.sunday.shift2Type
        }
    }

  let bayTwoHours;
  if (req.body.bayTwoHours ) {
    bayTwoHours = {
      monday: 
        {
          isOpen: req.body.bayTwoHours.monday.isOpen,
          twentyFourHrs: req.body.bayTwoHours.monday.twentyFourHrs,
          start: req.body.bayTwoHours.monday.start,
          end: req.body.bayTwoHours.monday.end,
          type: req.body.bayTwoHours.monday.type,
          shift2: req.body.bayTwoHours.monday.shift2,
          shift2Start: req.body.bayTwoHours.monday.shift2Start,
          shift2End: req.body.bayTwoHours.monday.shift2End,
          shift2Type: req.body.bayTwoHours.monday.shift2Type
        },
      tuesday: 
        {
          isOpen: req.body.bayTwoHours.tuesday.isOpen,
          twentyFourHrs: req.body.bayTwoHours.tuesday.twentyFourHrs,
          start: req.body.bayTwoHours.tuesday.start,
          end: req.body.bayTwoHours.tuesday.end,
          type: req.body.bayTwoHours.tuesday.type,
          shift2: req.body.bayTwoHours.tuesday.shift2,
          shift2Start: req.body.bayTwoHours.tuesday.shift2Start,
          shift2End: req.body.bayTwoHours.tuesday.shift2End,
          shift2Type: req.body.bayTwoHours.tuesday.shift2Type
        },
      wednesday: 
        {
          isOpen: req.body.bayTwoHours.wednesday.isOpen,
          twentyFourHrs: req.body.bayTwoHours.wednesday.twentyFourHrs,
          start: req.body.bayTwoHours.wednesday.start,
          end: req.body.bayTwoHours.wednesday.end,
          type: req.body.bayTwoHours.wednesday.type,
          shift2: req.body.bayTwoHours.wednesday.shift2,
          shift2Start: req.body.bayTwoHours.wednesday.shift2Start,
          shift2End: req.body.bayTwoHours.wednesday.shift2End,
          shift2Type: req.body.bayTwoHours.wednesday.shift2Type
        },
      thursday: 
        {
          isOpen: req.body.bayTwoHours.thursday.isOpen,
          twentyFourHrs: req.body.bayTwoHours.thursday.twentyFourHrs,
          start: req.body.bayTwoHours.thursday.start,
          end: req.body.bayTwoHours.thursday.end,
          type: req.body.bayTwoHours.thursday.type,
          shift2: req.body.bayTwoHours.thursday.shift2,
          shift2Start: req.body.bayTwoHours.thursday.shift2Start,
          shift2End: req.body.bayTwoHours.thursday.shift2End,
          shift2Type: req.body.bayTwoHours.thursday.shift2Type
        },
      friday: 
        {
          isOpen: req.body.bayTwoHours.friday.isOpen,
          twentyFourHrs: req.body.bayTwoHours.friday.twentyFourHrs,
          start: req.body.bayTwoHours.friday.start,
          end: req.body.bayTwoHours.friday.end,
          type: req.body.bayTwoHours.friday.type,
          shift2: req.body.bayTwoHours.friday.shift2,
          shift2Start: req.body.bayTwoHours.friday.shift2Start,
          shift2End: req.body.bayTwoHours.friday.shift2End,
          shift2Type: req.body.bayTwoHours.friday.shift2Type
        },
      saturday: 
        {
          isOpen: req.body.bayTwoHours.saturday.isOpen,
          twentyFourHrs: req.body.bayTwoHours.saturday.twentyFourHrs,
          start: req.body.bayTwoHours.saturday.start,
          end: req.body.bayTwoHours.saturday.end,
          type: req.body.bayTwoHours.saturday.type,
          shift2: req.body.bayTwoHours.saturday.shift2,
          shift2Start: req.body.bayTwoHours.saturday.shift2Start,
          shift2End: req.body.bayTwoHours.saturday.shift2End,
          shift2Type: req.body.bayTwoHours.saturday.shift2Type
        },
      sunday: 
        {
          isOpen: req.body.bayTwoHours.sunday.isOpen,
          twentyFourHrs: req.body.bayTwoHours.sunday.twentyFourHrs,
          start: req.body.bayTwoHours.sunday.start,
          end: req.body.bayTwoHours.sunday.end,
          type: req.body.bayTwoHours.sunday.type,
          shift2: req.body.bayTwoHours.sunday.shift2,
          shift2Start: req.body.bayTwoHours.sunday.shift2Start,
          shift2End: req.body.bayTwoHours.sunday.shift2End,
          shift2Type: req.body.bayTwoHours.sunday.shift2Type
        }
    }
  }

  try {
    let location = await Location.findById(req.params.id);

    if (!location) {
      return res.json({ msg: "Location not found" });
    }

    if (bayTwoHours) {
      location = await Location.findByIdAndUpdate(
        req.params.id,
        { $set: { bayOneHours, bayTwoHours } },
        { new: true }
      );
    } else {
      location = await Location.findByIdAndUpdate(
        req.params.id,
        { $set: { bayOneHours } },
        { new: true }
      );
    }

    return res.json({ location });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;