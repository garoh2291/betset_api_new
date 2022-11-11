const mongoose = require("mongoose"),
  { Schema } = mongoose;

const HistorySchema = new Schema({
  games: {
    type: Array,
  },
  totalCoeff: {
    type: Number,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("History", HistorySchema);
