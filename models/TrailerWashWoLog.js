const Sequelize = require('sequelize');
const db = require('../config/prod_db');

const TrailerWashWoLog = db.define("trailer_wash_wo_logs", {
  wash_id: {
    type: Sequelize.INTEGER
  },
  scheduled_by: {
    type: Sequelize.STRING
  },
  scheduled_at: {
    type: Sequelize.DATE
  },
  is_scheduled: {
    type: Sequelize.BOOLEAN
  },
}, { freezeTableName: true });

TrailerWashWoLog.removeAttribute('id');

module.exports = TrailerWashWoLog;