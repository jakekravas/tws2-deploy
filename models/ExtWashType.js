const Sequelize = require('sequelize');
// const db = require('../config/database');
const db = require('../config/prod_db');

const ExtWashType = db.define("ext_wash_type", {
  ext_wash_code: {
    type: Sequelize.STRING
  },
  ext_description: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
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

ExtWashType.removeAttribute('id');

module.exports = ExtWashType;