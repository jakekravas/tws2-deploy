const Sequelize = require('sequelize');
// const db = require('../config/database');
const db = require('../config/prod_db');

// const TrailerWashWo = db.define("trailer_wash_wo", {freezeTableName: true, tableName: "trailer_wash_wo"}, {
const TrailerWashWo = db.define("trailer_wash_wo", {
  wash_id: {
    type: Sequelize.INTEGER
  },
  company_id: {
    type: Sequelize.STRING
  },
  charge_type: {
    type: Sequelize.STRING
  },
  commodity_id: {
    type: Sequelize.STRING
  },
  customer_id: {
    type: Sequelize.STRING
  },
  driver_id: {
    type: Sequelize.STRING
  },
  entered_user_id: {
    type: Sequelize.STRING
  },
  equip_type: {
    type: Sequelize.STRING
  },
  ext_wash_amount: {
    type: Sequelize.INTEGER
  },
  ext_wash_amount_c: {
    type: Sequelize.STRING
  },
  ext_wash_amount_d: {
    type: Sequelize.TIME
  },
  ext_wash_amount_n: {
    type: Sequelize.INTEGER
  },
  ext_wash_amount_r: {
    type: Sequelize.INTEGER
  },
  ext_wash_code: {
    type: Sequelize.INTEGER
  },
  hazmat_code: {
    type: Sequelize.INTEGER
  },
  heel: {
    type: Sequelize.INTEGER
  },
  heel_unit_type: {
    type: Sequelize.INTEGER
  },
  in_date: {
    type: Sequelize.TIME
  },
  int_wash_amount: {
    type: Sequelize.INTEGER
  },
  int_wash_amount_c: {
    type: Sequelize.STRING
  },
  int_wash_amount_d: {
    type: Sequelize.TIME
  },
  int_wash_amount_n: {
    type: Sequelize.INTEGER
  },
  int_wash_amount_r: {
    type: Sequelize.INTEGER
  },
  int_wash_code: {
    type: Sequelize.STRING
  },
  intra_co_seg_code: {
    type: Sequelize.STRING
  },
  invoice_po_date: {
    type: Sequelize.TIME
  },
  invoice_po_num: {
    type: Sequelize.STRING
  },
  movement_id: {
    type: Sequelize.STRING
  },
  order_id: {
    type: Sequelize.STRING
  },
  other_equip: {
    type: Sequelize.STRING
  },
  out_date: {
    type: Sequelize.TIME
  },
  ready_to_xfer: {
    type: Sequelize.STRING
  },
  seg_alloc_code: {
    type: Sequelize.STRING
  },
  tractor_id: {
    type: Sequelize.STRING
  },
  vendor_id: {
    type: Sequelize.STRING
  },
  void: {
    type: Sequelize.STRING
  },
  voucher_id: {
    type: Sequelize.STRING
  },
  wash_date: {
    type: Sequelize.TIME
  },
  wash_location_id: {
    type: Sequelize.STRING
  },
  washed_for: {
    type: Sequelize.STRING
  },
  tank_wash_assigned: {
    type: Sequelize.STRING
  },
  trailer_wash_assigned: {
    type: Sequelize.STRING
  },
  needed_date: {
    type: Sequelize.STRING
  },
  commodity_desc2: {
    type: Sequelize.STRING
  },
  is_scheduled: {
    type: Sequelize.BOOLEAN
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
  source: {
    type: Sequelize.INTEGER
  },
  resource: {
    type: Sequelize.STRING
  },
  history: {
    type: Sequelize.BOOLEAN
  }
}, { freezeTableName: true });

TrailerWashWo.removeAttribute('id');

module.exports = TrailerWashWo;