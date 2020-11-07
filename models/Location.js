const Sequelize = require('sequelize');
const db = require('../config/database');
// const db = require('../config/db_sql_server');

const Location = db.define("location", {
  location_id: {
    type: Sequelize.STRING
  },
  terminal_id: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.INTEGER
  },
  wash_bays: {
    type: Sequelize.INTEGER
  }
});

module.exports = Location;