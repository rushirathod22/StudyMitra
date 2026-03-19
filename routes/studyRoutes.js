const express = require("express");
const router = express.Router();

const {
  generateStudyPlan,
  getLatestPlan,
  updateTasks,
} = require("../controllers/studyController");

const protect = require("../middleware/authMiddleware");

router.post("/generate-plan", protect, generateStudyPlan);
router.get("/latest", protect, getLatestPlan);
router.post("/update-tasks", protect, updateTasks);

module.exports = router;