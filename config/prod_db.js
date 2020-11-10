const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  "bulkmatic", // database
  "postgres", // user
  "b55SGVzoO8QhJX9w3as7", // password
  {
    host: "bulkmatic-postgres.chsi0luwnscx.us-east-2.rds.amazonaws.com",
    dialect: "postgres",
    schema: "tankwash",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});