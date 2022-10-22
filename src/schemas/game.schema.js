const mongoose = require("mongoose"),
  mongoosePaginate = require("mongoose-paginate"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const GameSchema = new Schema(
  {
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    team1: {
      type: Object,
      required: true,
    },
    team2: {
      type: Object,
      required: true,
    },
    risk: {
      type: String,
      enum: ["extreme", "medium", "high", "low", "best"],
    },
    sport: {
      type: String,
      enum: [
        "football",
        "basketball",
        "volleyball",
        "Regby",
        "tennis",
        "tableTennis",
        "hockey",
      ],
    },
    coeff: {
      type: Number,
      required: true,
    },
    league: {
      type: Object,
      required: true,
    },
    position: {
      type: Object,
      required: true,
    },
    description: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

GameSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Game", GameSchema);
