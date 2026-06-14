import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const fetchNotifications = createAsyncThunk(
    "notifications/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/notifications/");
            return response.data.data.notifications;
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
            // API returns data.notification (singular)
            return response.data.data.notification;
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
            await api.patch("/notifications/allread");
            // API doesn't return notifications, so fetch them to update state
            const response = await api.get("/notifications/");
            return response.data.data.notifications;
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
                state.unreadCount = Array.isArray(action.payload) ? action.payload.filter(n => !n.isRead).length : 0;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(markNotificationAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                state.loading = false;
                // API returns single notification, update it in the list
                if (action.payload && action.payload._id) {
                    const notification = state.notifications.find(n => n._id === action.payload._id);
                    if (notification) {
                        notification.isRead = true;
                        state.unreadCount = Math.max(0, state.unreadCount - 1);
                    }
                }
            })
            .addCase(markNotificationAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(markAllNotificationsAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
                state.loading = false;
                // API returns updated notifications array after fetching
                if (Array.isArray(action.payload)) {
                    state.notifications = action.payload;
                } else {
                    // Fallback: mark all local notifications as read
                    state.notifications = state.notifications.map(n => ({ ...n, isRead: true }));
                }
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
