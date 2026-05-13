import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
export const getUserbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let profile;
    if (user.role === "doctor") {
      profile = await Doctor.findOne({ user: user._id });
    } else {
      profile = await Patient.findOne({ user: user._id });
    }
    res.status(200).json({
      success: true,
      data: { user, profile },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, password, ...profileData } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { name, email, phone } },
      { returnDocument: 'after', runValidators: true }
    ).select("-password"); 

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (updatedUser.role === "doctor") {
      await Doctor.findOneAndUpdate(
        { user: id },
        { $set: profileData },
        { returnDocument: 'after', runValidators: true }
      );
    } else if (updatedUser.role === "patient") {
      await Patient.findOneAndUpdate(
        { user: id },
        { $set: profileData },
        { returnDocument: 'after', runValidators: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user: updatedUser },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const register = async (req, res) => {
  try {
    const role = req.query.role;
    const { name, email, password, phone, ...profileData } = req.body;
    const user = await User.create({ name, email, password, role, phone });
    if (role === "doctor") {
      await Doctor.create({ user: user._id, ...profileData });
    } else {
      await Patient.create({ user: user._id, ...profileData });
    }
    return res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    return res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
