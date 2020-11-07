const Sequelize = require('sequelize');
// const db = require('../config/database');
const db = require('../config/db_sql_server');

const Recent_User = db.define("recent_users", {
  User_ID: {
    type: Sequelize.STRING
  }
}, { timestamps: false });

module.exports = Recent_User;