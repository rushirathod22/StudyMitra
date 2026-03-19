const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subject: String,
  goal: String,
  examDate: String,
  dailyHours: Number,

  // 🔥 FIXED HERE
  plan: {
    type: Object
  }

}, { timestamps: true });

module.exports = mongoose.model("StudyPlan", studyPlanSchema);