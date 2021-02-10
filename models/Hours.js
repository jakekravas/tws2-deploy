const Sequelize = require('sequelize');
// const db = require('../config/database');
const db = require('../config/prod_db');

const Hours = db.define("hour", {
  location_id: {
    type: Sequelize.STRING
  },
  day: {
    type: Sequelize.STRING
  },
  bay: {
    type: Sequelize.INTEGER
  },
  is_open: {
    type: Sequelize.BOOLEAN
    // type: Sequelize.INTEGER
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
    // type: Sequelize.INTEGER
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
  sort_order: {
    type: Sequelize.INTEGER
  }
});

module.exports = Hours;