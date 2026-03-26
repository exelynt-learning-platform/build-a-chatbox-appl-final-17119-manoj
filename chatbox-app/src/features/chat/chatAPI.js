import axios from "axios";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
  "HTTP-Referer": "http://localhost:5173",
  "X-Title": "Chat App",
};

export const sendMessageToAPI = async (message) => {
  const models = [
    "gryphe/mythomax-l2-13b",   // ✅ most stable free
    "nousresearch/nous-capybara-7b", // ✅ backup
  ];

  for (let model of models) {
    try {
      const response = await axios.post(
        API_URL,
        {
          model,
          messages: [{ role: "user", content: message }],
        },
        { headers }
      );

      return response.data.choices[0].message.content;

    } catch (error) {
      console.warn(`Model failed: ${model}`);
    }
  }

  throw new Error("All free models failed. Try again later.");
};