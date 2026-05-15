import userModel from "../models/User.js";
import doctorModel from "../models/Doctor.js";
import httpStatus from "../utils/httpStatus.js";

export const searchDoctors = async (req, res, next) => {
  const { search } = req.query;

  let query = {};

  if (search) {
    const matchingUsers = await userModel
      .find({
        role: "doctor",
        name: { $regex: search, $options: "i" },
      })
      .select("_id");

    const matchedUsersIds = matchingUsers.map((user) => user.id);

    query = {
      $or: [
        {
          specialization: {
            $regex: search,
            $options: "i",
          },
        },
        {
          user: {
            $in: matchedUsersIds,
          },
        },
      ],
    };
  }

  const doctors = await doctorModel.find(query).populate({
    path: "user",
  });

  res.status(200).json({
    success: httpStatus.success,
    count: doctors.length,
    data: { doctors },
    message: "Doctors retrieved  successfully",
  });
};
