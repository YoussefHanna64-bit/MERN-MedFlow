import asyncWrapper from "../middlewares/asyncWrapper.js";
import Doctor from "../models/Doctor.js";
import appError from "../utils/appError.js";
import { recommendDoctors } from "../utils/geminiService.js";
import httpStatus from "../utils/httpStatus.js";
import { generateEmbedding } from "../utils/ragService.js";

export const chatWithAI = asyncWrapper(async (req, res, next) => {
  const { message } = req.body;

  if (!message) {
    return next(
      appError.create("Please describe your symptoms", 400, httpStatus.FAIL),
    );
  }

  const queryVector = await generateEmbedding(message);

  const matchingDoctors = await Doctor.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embeddings",
        queryVector: queryVector,
        numCandidates: 20,
        limit: 3,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "doctorInfo",
      },
    },
    { $unwind: "$doctorInfo" },
    {
      $project: {
        embeddings: 0,
        "doctorInfo.password": 0,
        __v: 0,
      },
    },
  ]);

  if (matchingDoctors.length === 0) {
    return res.status(200).json({
      success: httpStatus.SUCCESS,
      botReply:
        "I couldn't find a specific specialist for those symptoms right now, but I highly recommend visiting a General Practitioner for an initial checkup",
      data: [],
    });
  }

  const botReply = await recommendDoctors(message, matchingDoctors);

  res.status(200).json({
    success: httpStatus.SUCCESS,
    message: "Doctors retrieved based on symptoms",
    botReply: botReply,
    data: matchingDoctors,
  });
});
