import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  fetchUserProfile,
  setProfileField,
} from "../redux/slices/userProfileSlice";
import ProfileHeader from "../components/updateProfileComponents/ProfileHeader";
import DoctorFields from "../components/updateProfileComponents/DoctorFields";
import PatientFields from "../components/updateProfileComponents/PatientFields";
import { toast } from "react-hot-toast";
import {
  Field,
  SectionHeading,
  Input,
  Icon,
} from "../components/updateProfileComponents/FormControls";

const UpdateProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, doctorProfile, patientProfile, loading, fetchLoading } =
    useSelector((state) => state.updateProfile);
  const user = useSelector((state) => state.auth?.user);
  const userId = user?._id;
  const role = user?.role;

  useEffect(() => {
    if (userId) dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  const handleSubmit = () => {
    if (!userId) return;
    const roleData =
      role === "doctor"
        ? {
            fees: Number(doctorProfile.fees),
            specialization: doctorProfile.specialization,
            mainClinic: doctorProfile.mainClinic,
            description: doctorProfile.description,
            addresses: doctorProfile.addresses.filter((a) => a.trim()),
            assistant_phones: doctorProfile.assistant_phones.filter((p) =>
              p.trim(),
            ),
          }
        : {
            bloodType: patientProfile.bloodType,
            dateOfBirth: patientProfile.dateOfBirth,
            gender: patientProfile.gender,
            emergencyContact: patientProfile.emergencyContact,
          };
    dispatch(
      updateProfile({
        userId,
        profileData: {
          name: profile.name,
          phone: profile.phone,
          email: profile.email,
          ...roleData,
        },
      }),
    )
      .unwrap()
      .then(() => toast.success("Profile updated successfully!"))
      .catch((err) => toast.error(err || "Failed to update profile"));
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-[#f0fafa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
          <p className="text-primary font-medium text-sm">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fafa] via-white to-[#e6f6f7] py-12 px-4">
      <div className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-[#00a8b2] to-primary" />

      <div className="max-w-2xl mx-auto">
        <ProfileHeader role={role} />

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
          <div className="bg-linear-to-r from-primary to-[#00a8b2] px-8 py-5">
            <p className="text-white/90 text-xl font-semibold">
              Profile Information
            </p>
          </div>

          <div className="px-8 py-8 flex flex-col gap-5">
            <SectionHeading>Account Details</SectionHeading>

            <Field label="Full Name">
              <Input
                icon={
                  <Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                }
                type="text"
                value={profile.name}
                onChange={(e) =>
                  dispatch(
                    setProfileField({ field: "name", value: e.target.value }),
                  )
                }
                placeholder={
                  role === "doctor" ? "Dr. John Smith" : "Your full name"
                }
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Phone Number">
                <Input
                  icon={
                    <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  }
                  type="text"
                  value={profile.phone}
                  onChange={(e) =>
                    dispatch(
                      setProfileField({
                        field: "phone",
                        value: e.target.value,
                      }),
                    )
                  }
                  placeholder="01XXXXXXXXX"
                />
              </Field>
              <Field label="Email">
                <Input
                  icon={
                    <Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  }
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    dispatch(
                      setProfileField({
                        field: "email",
                        value: e.target.value,
                      }),
                    )
                  }
                  placeholder="your@email.com"
                />
              </Field>
            </div>

            {role === "doctor" && <DoctorFields />}
            {role === "patient" && <PatientFields />}

            <div className="border-t border-dashed border-gray-200 mt-1" />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-primary hover:bg-[#006970] active:bg-[#005a60] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3.5 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Icon path="M5 13l4 4L19 7" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
