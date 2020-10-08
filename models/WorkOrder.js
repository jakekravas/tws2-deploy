const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkOrderSchema = new Schema({
  mainId: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  trailerId: {
    type: String,
    required: true
  },
  extWashCode: {
    type: String,
    required: true
  },
  intWashCode: {
    type: String,
    required: true
  },
  washLocationId: {
    type: String,
    required: true
  },
  neededDate: {
    type: String
  },
  neededDateDisplayStr: {
    type: String
  },
  intDurationMins: {
    type: Number,
    required: true
  },
  extDurationMins: {
    type: Number,
    required: true
  },
  intDurationMinsSolo: {
    type: Number,
    required: true
  },
  extDurationMinsSolo: {
    type: Number,
    required: true
  },
  isScheduled: {
    type: Boolean,
    default: false,
    required: true
  },
  bay: {
    type: Number
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  text: {
    type: String
  }
});

module.exports = WorkOrder = mongoose.model("workorders", WorkOrderSchema);