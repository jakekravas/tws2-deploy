const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  "bulkmatic", // database
  // "d8gvbh0ij9qecq", // database
  "bmtDbAdmin187", // user
  // "swuuenwwpcogjh", // user
  "39qsYf73IJbakP3Ql5Oc", // password
  // "f7782b6c2576db4e7273dbde1b413bac234046f9170a3fe2ba3cb09642a4690c", // password
  {
    host: "bulkmatic-postgres-dev.chsi0luwnscx.us-east-2.rds.amazonaws.com",
    // host: "ec2-3-210-255-177.compute-1.amazonaws.com",
    dialect: "postgres",
    // schema: "tw_scheduler",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});