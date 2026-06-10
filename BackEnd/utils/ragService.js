import axios from "axios";
import Doctor from "../models/Doctor.js";

export const generateEmbedding = async (text) => {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/thenlper/gte-large/pipeline/feature-extraction",
      {
        inputs: text,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      },
    );

    return response.data;
  } catch (e) {
    const errorMessage = e.response?.data?.error || e.message;
    throw new Error(`HF Error: ${errorMessage}`);
  }
};

export const updateDoctorEmbedding = async (userDoc, doctorProfileDoc) => {
  try {
    const availability =
      doctorProfileDoc.availability
        ?.map(
          (a) =>
            `  * ${a.day} at ${a.location} (Slots: ${a.slots.map((s) => s.startTime).join(", ")})`,
        )
        .join("\n") || "Schedule not updated yet.";

    const doctorText = `
      Doctor Name: ${userDoc.name}
      Specialization: ${doctorProfileDoc.specialization}
      Primary Location: The main clinic is located at ${doctorProfileDoc.mainClinic}.
      Consultation Fees: ${doctorProfileDoc.fees} EGP
      Addresses: ${doctorProfileDoc.addresses?.join(", ") || ""}
      Rating: ${doctorProfileDoc.rating || 0} out of 5 stars
      Description: ${doctorProfileDoc.description || "General practitioner"}
      Weekly Schedule and Availability: ${availability}
    `.trim();

    const embeddings = await generateEmbedding(doctorText);

    await Doctor.findByIdAndUpdate(doctorProfileDoc._id, {
      $set: { embeddings: embeddings },
    });
  } catch (e) {
    console.error("RAG Error:", e.message);
  }
};
