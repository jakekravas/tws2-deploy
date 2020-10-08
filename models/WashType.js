const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WashTypeSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    defaultValue: "I"
  },
  teamHours: {
    type: Number,
    defaultValue: 2
  },
  teamMinutes: {
    type: Number,
    defaultValue: 0
  },
  soloHours: {
    type: Number,
    defaultValue: 2
  },
  soloMinutes: {
    type: Number,
    defaultValue: 0
  }
});

module.exports = WashType = mongoose.model("washtypes", WashTypeSchema);