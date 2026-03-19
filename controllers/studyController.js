const callGroq = require("../services/groqService");
const StudyPlan = require("../models/StudyPlan");

// 🔥 Safe JSON extraction
const extractJSON = (text) => {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
};

// 🔥 Light validation
const cleanPlan = (plan) => {
  if (!plan || !plan.weeks) return null;

  const seenDates = new Set();

  for (const week of plan.weeks) {
    if (!week.topics) continue;

    week.topics = week.topics.filter((day) => {
      if (!day.day || seenDates.has(day.day)) return false;
      seenDates.add(day.day);
      return true;
    });
  }

  return plan;
};

// 🔥 Generate + Save Study Plan
const generateStudyPlan = async (req, res) => {
  try {
    const { subject, goal, examDate, dailyHours } = req.body;

    const today = new Date();
    const exam = new Date(examDate);

    const diffTime = exam - today;
    const totalDays = Math.max(
      1,
      Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    );

    const startDate = today.toISOString().split("T")[0];

    const prompt = `
You are an expert study planner.

Create a CLEAN, SIMPLE, STUDENT-FRIENDLY plan.

RULES:
- Start: ${startDate}
- End: ${examDate}
- Total days: ${totalDays}
- Use REAL dates
- No duplicate dates
- Keep tasks SHORT and SIMPLE

Structure:
- 1 topic per day
- 2–3 tasks per day

Plan flow:
- First days: learning
- Middle: practice
- Last 5 days: revision + mock tests

Return ONLY JSON:

{
  "title": "${subject} Study Plan",
  "totalDays": ${totalDays},
  "weeks": [
    {
      "week": "",
      "topics": [
        {
          "day": "",
          "topic": "",
          "tasks": []
        }
      ]
    }
  ]
}

Subject: ${subject}
Goal: ${goal}
Daily Study Hours: ${dailyHours}
`;

    // 🔹 Call Groq
    const rawResult = await callGroq(prompt);

    console.log("RAW AI:", rawResult);

    let parsedPlan = extractJSON(rawResult);

    // 🔁 Retry if failed
    if (!parsedPlan) {
      console.log("Retrying AI...");
      const retry = await callGroq(prompt);
      parsedPlan = extractJSON(retry);
    }

    // 🔥 Fallback
    if (!parsedPlan) {
      console.log("Using fallback plan");

      parsedPlan = {
        title: `${subject} Study Plan`,
        totalDays,
        weeks: [
          {
            week: `${startDate} to ${examDate}`,
            topics: [
              {
                day: startDate,
                topic: subject,
                tasks: [
                  "Study basic concepts",
                  "Practice questions",
                  "Revise important topics",
                ],
              },
            ],
          },
        ],
      };
    }

    // 🔹 Clean duplicates
    parsedPlan = cleanPlan(parsedPlan);

    // 💾 Save (UPDATED)
    const savedPlan = await StudyPlan.create({
      userId: req.user.id,
      subject,
      goal,
      examDate,
      dailyHours,
      plan: parsedPlan,

      // ✅ NEW FIELD
      completedTasks: [],
    });

    res.json({
      success: true,
      plan: parsedPlan,
      savedPlan,
    });

  } catch (error) {
    console.log("🔥 ERROR:", error.message);

    res.json({
      success: false,
      message: "Something went wrong but server is alive",
    });
  }
};

// 🔥 Get all plans
const getMyPlans = async (req, res) => {
  try {
    const plans = await StudyPlan.find({ userId: req.user.id });

    res.json({
      success: true,
      plans,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 Get latest plan
const getLatestPlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findOne({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 NEW → Save completed tasks
const updateTasks = async (req, res) => {
  try {
    const { tasks } = req.body;

    const plan = await StudyPlan.findOne({ userId: req.user.id })
      .sort({ createdAt: -1 });

    if (!plan) {
      return res.status(404).json({ message: "No plan found" });
    }

    plan.completedTasks = tasks;
    await plan.save();

    res.json({ success: true });
  } catch (error) {
    console.log("🔥 TASK ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateStudyPlan,
  getMyPlans,
  getLatestPlan,
  updateTasks, // ✅ IMPORTANT
};