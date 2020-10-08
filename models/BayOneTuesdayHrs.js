const Sequelize = require('sequelize');
const db = require('../config/database');

const BayOneTuesdayHrs = db.define("bay_one_tuesday_hr", {
  is_open: {
    type: Sequelize.BOOLEAN
  },
  shift_one_start: {
    type: Sequelize.STRING
  },
  shift_one_end: {
    type: Sequelize.STRING
  },
  shift_one_type: {
    type: Sequelize.STRING
  },
  shift_two_open: {
    type: Sequelize.BOOLEAN
  },
  shift_two_start: {
    type: Sequelize.STRING
  },
  shift_two_end: {
    type: Sequelize.STRING
  },
  shift_two_type: {
    type: Sequelize.STRING
  },
  location_id: {
    type: Sequelize.STRING
  }
});

// BayOneTuesdayHrs.schema("tw_scheduler");

module.exports = BayOneTuesdayHrs;