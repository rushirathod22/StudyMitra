const axios = require("axios");

const callGroq = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",   // ✅ FIXED MODEL
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.log("🔥 GROQ ERROR:", error.response?.data || error.message);
    throw new Error("Groq API Failed");
  }
};

module.exports = callGroq;