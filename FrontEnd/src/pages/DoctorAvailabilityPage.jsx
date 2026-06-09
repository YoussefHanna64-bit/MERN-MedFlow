import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchDoctorAvailability } from "../redux/thunks/doctor/fetchDoctorAvailability";
import { updateDoctorAvailability } from "../redux/thunks/doctor/updateAvailability";
import Spinner from "../components/spinner"
import DoctorAvailabilityForm from "../components/doctorManageAvailability/AvailabilityForm"
import ScheduleSidebar from "../components/doctorManageAvailability/doctorScheduleSideBar"   

const DoctorAvailabilityPage = () => {
  const dispatch = useDispatch();
  const availability = useSelector((state) => state.doctor.availability);
  const loading = useSelector((state) => state.doctor.loading);

  useEffect(() => {
    dispatch(fetchDoctorAvailability());
  }, [dispatch]);

  const handleSaveAvailability = async (formData) => {
    if (formData.slots.length === 0) {
      toast.error("Please add at least one time slot");
      return false;
    }

    try {
      const result = await dispatch(
        updateDoctorAvailability({
          action: "update",
          ...formData,
        })
      );

      if (updateDoctorAvailability.fulfilled.match(result)) {
        toast.success("Availability updated successfully!");
        dispatch(fetchDoctorAvailability());
        return true; 
      } else {
        toast.error(result.payload || "Failed to update availability");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while updating availability");
      console.error(error);
      return false;
    }
  };

  const handleCancelSlot = async (date, startTime) => {
    if (!window.confirm("Are you sure you want to delete this slot?")) return;

    try {
      const result = await dispatch(
        updateDoctorAvailability({
          action: "cancel",
          date,
          startTime,
        })
      );

      if (updateDoctorAvailability.fulfilled.match(result)) {
        toast.success("Slot deleted successfully!");
        dispatch(fetchDoctorAvailability());
      } else {
        toast.error(result.payload || "Failed to delete slot");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the slot");
      console.error(error);
    }
  };

  if (loading && (!availability || availability.length === 0)) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fafa] via-white to-[#e6f6f7] py-12 px-4">
      <div className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-[#00a8b2] to-primary" />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Manage Your Availability</h1>
          <p className="text-slate-600">
            Update your clinic schedules and manage appointment slots
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DoctorAvailabilityForm onSave={handleSaveAvailability} isLoading={loading} />
          </div>
          <div className="lg:col-span-1">
            <ScheduleSidebar availability={availability} onDeleteSlot={handleCancelSlot} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoctorAvailabilityPage;
