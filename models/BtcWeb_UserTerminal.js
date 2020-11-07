const Sequelize = require('sequelize');
// const db = require('../config/database');
const db = require('../config/db_sql_server');

const BtcWeb_UserTerminal = db.define("BtcWeb_UserTerminals", {
  UserID: {
    type: Sequelize.STRING
  },
  Terminal: {
    type: Sequelize.INTEGER
  }
}, { timestamps: false });

BtcWeb_UserTerminal.removeAttribute('id');

module.exports = BtcWeb_UserTerminal;