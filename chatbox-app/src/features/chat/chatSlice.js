import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageToAPI } from "./chatAPI";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      const response = await sendMessageToAPI(message);
      return response;
    } catch (error) {
      // ✅ Handle API errors properly
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data?.error?.message || "API Error",
        });
      } else if (error.request) {
        return rejectWithValue({
          status: "NETWORK",
          message: "Network error. Check your internet.",
        });
      } else {
        return rejectWithValue({
          status: "UNKNOWN",
          message: error.message,
        });
      }
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ role: "user", content: action.payload });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          role: "assistant",
          content: action.payload,
        });
      })

      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;

        // ✅ Smart error messages
        if (action.payload?.status === 429) {
          state.error =
            "⚠️ Too many requests or quota exceeded. Please try again later.";
        } else if (action.payload?.status === 401) {
          state.error = "🔐 Invalid API key. Check your configuration.";
        } else if (action.payload?.status === "NETWORK") {
          state.error = "🌐 Network error. Please check your connection.";
        } else {
          state.error = action.payload?.message || "Something went wrong.";
        }
      });
  },
});

export const { addUserMessage, clearError } = chatSlice.actions;
export default chatSlice.reducer;