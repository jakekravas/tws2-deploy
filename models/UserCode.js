const Sequelize = require('sequelize');
const db = require('../config/prod_db');

const UserCode = db.define("user_code", {
  username: {
    type: Sequelize.STRING
  },
  code: {
    type: Sequelize.STRING
  }
});

UserCode.removeAttribute('id');

module.exports = UserCode;