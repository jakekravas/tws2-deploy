const Sequelize = require('sequelize');
// const db = require('../config/database');
const db = require('../config/prod_db');

const IntWashType = db.define("int_wash_type", {
  int_wash_code: {
    type: Sequelize.STRING
  },
  int_description: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  int_team_hours: {
    type: Sequelize.INTEGER
  },
  int_team_minutes: {
    type: Sequelize.INTEGER
  },
  int_solo_hours: {
    type: Sequelize.INTEGER
  },
  int_solo_minutes: {
    type: Sequelize.INTEGER
  }
});

IntWashType.removeAttribute('id');

module.exports = IntWashType;