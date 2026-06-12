import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      const response = await api.post("/chat", { message });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to communicate with the MedFlow AI",
      );
    }
  },
);

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState: {
    messages: [
      {
        sender: "bot",
        text: "Hello! I am the MedFlow AI assistant. Please describe your symptoms, and I will help you find the right specialist.",
        doctors: [],
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({
        sender: "user",
        text: action.payload,
      });
    },
    clearChat: (state) => {
      state.messages = [
        {
          sender: "bot",
          text: "Hello! I am the MedFlow AI assistant. Please describe your symptoms, and I will help you find the right specialist.",
          doctors: [],
        },
      ];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.messages.push({
        sender: "bot",
        text: action.payload.botReply,
        doctors: action.payload.data || [],
      });
    });

    builder.addCase(sendMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.messages.push({
        sender: "bot",
        text: "I'm sorry, I'm having trouble connecting to the server right now. Please try again later.",
      });
    });
  },
});

export const { addMessage, clearChat } = chatbotSlice.actions;
export default chatbotSlice.reducer;
