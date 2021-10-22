const mongoose = require("mongoose");

const PCSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  selected: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  coachName: {
    type: String,
    required: true,
  },
  coachContact: {
    type: String,
    required: true,
  },
  coachEmail: {
    type: String,
    required: true,
  },
  coachTshirt: {
    type: String,
    required: true,
  },

  TLName: {
    type: String,
    required: true,
  },
  TLContact: {
    type: String,
    required: true,
  },
  TLEmail: {
    type: String,
    required: true,
  },
  TLtshirt: {
    type: String,
    required: true,
  },

  TM1Name: {
    type: String,
    required: true,
  },
  TM1Contact: {
    type: String,
    required: true,
  },
  TM1Email: {
    type: String,
    required: true,
  },
  TM1tshirt: {
    type: String,
    required: true,
  },

  TM2Name: {
    type: String,
    required: true,
  },
  TM2Contact: {
    type: String,
    required: true,
  },
  TM2Email: {
    type: String,
    required: true,
  },
  TM2tshirt: {
    type: String,
    required: true,
  },
  key: { 
    type: String,
    required: true,
}
});

const ProgrammingContest = mongoose.model("ProgrammingContest", PCSchema);
module.exports = ProgrammingContest;