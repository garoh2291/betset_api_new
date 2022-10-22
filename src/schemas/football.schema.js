const mongoose = require("mongoose"),
  { Schema } = mongoose;

const FootballSchema = new Schema({
  express: {
    type: Array,
  },
  probability: {
    type: Number,
  },
  totalCf: {
    type: Number,
  },
  win: {
    type: Boolean,
  },
});
// {
//   team: {
//     type: Object,
//     required: true,
//   },
// },

module.exports = mongoose.model("Football", FootballSchema);
