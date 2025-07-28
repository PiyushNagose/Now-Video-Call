const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const MeetingSchema = new Schema({
  user_id: {
    type: String,
  },
  meeting_code: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const MeetingModel = mongoose.model("meeting", MeetingSchema);

module.exports = { MeetingModel };
