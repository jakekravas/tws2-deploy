const Sequelize = require('sequelize');
// const db = require('../config/database');
const db = require('../config/prod_db');

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
  },
  ext_team_hours: {
    type: Sequelize.INTEGER
  },
  ext_team_minutes: {
    type: Sequelize.INTEGER
  },
  ext_solo_hours: {
    type: Sequelize.INTEGER
  },
  ext_solo_minutes: {
    type: Sequelize.INTEGER
  }
});

// WashType.schema("tw_scheduler")

module.exports = WashType;