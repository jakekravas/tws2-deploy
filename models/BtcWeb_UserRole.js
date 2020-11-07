const Sequelize = require('sequelize');
// const db = require('../config/database');
const db = require('../config/db_sql_server');

const BtcWeb_UserRole = db.define("BtcWeb_UserRoles", {
  UserID: {
    type: Sequelize.STRING
  },
  RoleID: {
    type: Sequelize.STRING
  }
}, { timestamps: false });

BtcWeb_UserRole.removeAttribute('id');

module.exports = BtcWeb_UserRole;