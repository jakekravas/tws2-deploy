const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  "bulkmatic", // database
  "bmtDbAdmin187", // user
  "39qsYf73IJbakP3Ql5Oc", // password
  {
    host: "bulkmatic-postgres-dev.chsi0luwnscx.us-east-2.rds.amazonaws.com",
    dialect: "postgres",
    schema: "tw_scheduler",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});