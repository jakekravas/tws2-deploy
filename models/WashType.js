const Sequelize = require('sequelize');
const db = require('../config/database');

const WashType = db.define("wash_type", {
  wash_code: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  team_hours: {
    type: Sequelize.INTEGER
  },
  team_minutes: {
    type: Sequelize.INTEGER
  },
  solo_hours: {
    type: Sequelize.INTEGER
  },
  solo_minutes: {
    type: Sequelize.INTEGER
  }
});

// WashType.schema("tw_scheduler")

module.exports = WashType;