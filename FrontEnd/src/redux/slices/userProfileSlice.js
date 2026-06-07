import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../api";

export const updateProfile = createAsyncThunk(
    'updateProfile/update',
    async ({ userId, profileData }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/user/${userId}`, profileData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update profile'
            );
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'updateProfile/fetchProfile',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/user/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch profile'
            );
        }
    }
);

const updateProfileSlice = createSlice({
    name: 'updateProfile',
    initialState: {
        profile: {
            name: '',
            phone: '',
            email: '',
        },
        doctorProfile: {
            fees: '',
            specialization: '',
            mainClinic: '',
            description: '',
            addresses: [''],
            assistant_phones: [''],
        },
        patientProfile: {
            bloodType: '',
            dateOfBirth: '',
            gender: '',
            emergencyContact: '',
        },
        loading: false,
        fetchLoading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearMessages(state) {
            state.error = null;
            state.successMessage = null;
        },
        setProfileField(state, action) {
            const { field, value } = action.payload;
            state.profile[field] = value;
        },
        setDoctorField(state, action) {
            const { field, value } = action.payload;
            state.doctorProfile[field] = value;
        },
        setPatientField(state, action) {
            const { field, value } = action.payload;
            state.patientProfile[field] = value;
        },
        setAddress(state, action) {
            const { index, value } = action.payload;
            state.doctorProfile.addresses[index] = value;
        },
        addAddress(state) {
            state.doctorProfile.addresses.push('');
        },
        removeAddress(state, action) {
            state.doctorProfile.addresses = state.doctorProfile.addresses.filter((_, i) => i !== action.payload);
        },
        setAssistantPhone(state, action) {
            const { index, value } = action.payload;
            state.doctorProfile.assistant_phones[index] = value;
        },
        addAssistantPhone(state) {
            state.doctorProfile.assistant_phones.push('');
        },
        removeAssistantPhone(state, action) {
            state.doctorProfile.assistant_phones = state.doctorProfile.assistant_phones.filter((_, i) => i !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.fetchLoading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.fetchLoading = false;
                const user = action.payload?.data?.user;
                const profile = action.payload?.data?.profile;

                state.profile = {
                    name: user?.name || '',
                    phone: user?.phone || '',
                    email: user?.email || '',
                };

                if (user?.role === 'doctor' && profile) {
                    state.doctorProfile = {
                        fees: profile.fees ?? '',
                        specialization: profile.specialization || '',
                        mainClinic: profile.mainClinic || '',
                        description: profile.description || '',
                        addresses: profile.addresses?.length ? profile.addresses : [''],
                        assistant_phones: profile.assistant_phones?.length ? profile.assistant_phones : [''],
                    };
                }

                if (user?.role === 'patient' && profile) {
                    state.patientProfile = {
                        bloodType: profile.bloodType || '',
                        dateOfBirth: profile.dateOfBirth
                            ? new Date(profile.dateOfBirth).toISOString().split('T')[0]
                            : '',
                        gender: profile.gender || '',
                        emergencyContact: profile.emergencyContact || '',
                    };
                }
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.fetchLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = 'Profile updated successfully!';
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearMessages,
    setProfileField,
    setDoctorField,
    setPatientField,
    setAddress, addAddress, removeAddress,
    setAssistantPhone, addAssistantPhone, removeAssistantPhone,
} = updateProfileSlice.actions;

export default updateProfileSlice.reducer;
