const mongoose = require("mongoose"),
  { Schema } = mongoose;

const FormSchema = new Schema(
  {
    email: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

module.exports = mongoose.model("Form", FormSchema);
