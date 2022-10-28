const mongoose = require("mongoose"),
  mongoosePaginate = require("mongoose-paginate"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const ExpressSchema = new Schema({
  games: {
    type: Array,
    required: true,
  },
  totalCoeff: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["win", "loose", "pending"],
    required: true,
  },
});

ExpressSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Express", ExpressSchema);
