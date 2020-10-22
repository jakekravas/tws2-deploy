const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  // "bulkmatic", // database
  "BtcTws", // database
  // "bmtDbAdmin187", // user
  "TwsApp", // user
  // "39qsYf73IJbakP3Ql5Oc", // password
  "T@nkw@sh!", // password
  {
    // host: "bulkmatic-postgres-dev.chsi0luwnscx.us-east-2.rds.amazonaws.com",
    // host: "localhost",
    // host: "SQL_DB_Listener_DEV",
    // port: "5000",
    host: "SQL_DB_Listener_DEV",
    // dialect: "postgres",
    dialect: "mssql",
    // schema: "tw_scheduler",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});