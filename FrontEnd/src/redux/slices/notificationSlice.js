import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const fetchNotifications = createAsyncThunk(
    "notifications/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/notifications/");
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch notifications"
            );
        }
    }
);

export const markNotificationAsRead = createAsyncThunk(
    "notifications/markAsRead",
    async (notificationId, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/notifications/${notificationId}/read`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to mark notification as read"
            );
        }
    }
);

export const markAllNotificationsAsRead = createAsyncThunk(
    "notifications/markAllAsRead",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.patch("/notifications/allread");
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to mark all notifications as read"
            );
        }
    }
);

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        notifications: [],
        unreadCount: 0,
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.notifications = Array.isArray(action.payload) ? action.payload : [];
                state.unreadCount = Array.isArray(action.payload) ? action.payload.filter(n => !n.read).length : 0;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                const notification = state.notifications.find(n => n._id === action.payload._id);
                if (notification) {
                    notification.read = true;
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            })
            .addCase(markAllNotificationsAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
                state.loading = false;
                state.notifications = state.notifications.map(n => ({ ...n, read: true }));
                state.unreadCount = 0;
            })
            .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
