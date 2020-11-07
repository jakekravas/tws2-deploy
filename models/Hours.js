const Sequelize = require('sequelize');
const db = require('../config/database');
// const db = require('../config/db_sql_server');

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
  }
});

module.exports = Hours;