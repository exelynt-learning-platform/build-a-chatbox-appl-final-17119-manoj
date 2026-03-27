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
    "gryphe/mythomax-l2-13b",        // ✅ most stable free
    "nousresearch/nous-capybara-7b", // ✅ backup
  ];

  const errors = [];

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

      // Check if the API returned a valid response
      if (response.data?.choices?.[0]?.message?.content) {
        return response.data.choices[0].message.content;
      } else {
        errors.push(`Model ${model} returned an invalid response.`);
        console.warn(`Invalid response from model: ${model}`, response.data);
      }

    } catch (error) {
      // Collect the error details for logging
      const errorMsg = error.response
        ? `HTTP ${error.response.status}: ${error.response.data?.error || error.message}`
        : error.message;
      errors.push(`Model ${model} failed: ${errorMsg}`);
      console.warn(`Model failed: ${model}`, error);
    }
  }

  // After trying all models, throw a clear, user-friendly error
  const combinedErrorMessage = `All available models failed. Details:\n${errors.join("\n")}`;
  throw new Error(combinedErrorMessage);
};