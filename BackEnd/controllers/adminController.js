import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
//All the admin can do for now is banning the users instead of deleting them.
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res
      .status(200)
      .json({ success: true, count: users.length, data: { users } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { isActive: !user.isActive } }, 
      { returnDocument: 'after', runValidators: false }
    );
    return res.status(200).json({
      success: true,
      message: `User status changed to: ${updatedUser.isActive ? "Active" : "Suspended"}`,
      data: { isActive: updatedUser.isActive }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
