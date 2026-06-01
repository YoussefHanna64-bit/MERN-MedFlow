import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api";

const Storage_Key = "userAuth";

const getStoredAuth = () => {
  try {
    return JSON.parse(localStorage.getItem(Storage_Key)) || null;
  } catch {
    return null;
  }
};

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", payload);
      localStorage.setItem(Storage_Key, JSON.stringify(response.data.data));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to register",
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", payload);

      localStorage.setItem(Storage_Key, JSON.stringify(response.data.data));

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login",
      );
    }
  },
);

const storedAuth = getStoredAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedAuth?.user || null,
    token: storedAuth?.token || null,
    isAuthenticated: Boolean(storedAuth?.token),
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem(Storage_Key);
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.success = false;
    },
    clearAuthState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.success = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.success = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
