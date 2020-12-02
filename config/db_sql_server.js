const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  "BtcTws", // database
  "TwsApp", // user
  "T@nkw@sh!", // password
  {
    host: "SQL_DB_Listener_DEV",
    dialect: "mssql",
    operatorsAliases: 0,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});