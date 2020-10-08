const Sequelize = require('sequelize');
const db = require('../config/database');

const WorkOrder = db.define("work_order", {
  is_scheduled: {
    type: Sequelize.BOOLEAN
  },
  main_id: {
    type: Sequelize.STRING
  },
  trailer_id: {
    type: Sequelize.STRING
  },
  ext_wash_code: {
    type: Sequelize.STRING
  },
  int_wash_code: {
    type: Sequelize.STRING
  },
  wash_location_id: {
    type: Sequelize.STRING
  },
  needed_date: {
    type: Sequelize.STRING
  },
  needed_date_display_str: {
    type: Sequelize.STRING
  },
  int_duration_mins_team: {
    type: Sequelize.INTEGER
  },
  ext_duration_mins_team: {
    type: Sequelize.INTEGER
  },
  int_duration_mins_solo: {
    type: Sequelize.INTEGER
  },
  ext_duration_mins_solo: {
    type: Sequelize.INTEGER
  },
  text: {
    type: Sequelize.STRING
  },
  bay: {
    type: Sequelize.INTEGER
  },
  start_time: {
    type: Sequelize.STRING
  },
  end_time: {
    type: Sequelize.STRING
  },
  resource: {
    type: Sequelize.STRING
  }
});

// WorkOrder.schema("tw_scheduler");

module.exports = WorkOrder;