import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const recommendDoctors = async (symptoms, matchingDoctors) => {
  const doctorsList = matchingDoctors
    .map(
      (doc) => `
    - Dr. ${doc.doctorInfo.name} (${doc.specialization})
      Location: ${doc.mainClinic}
      Fees: ${doc.fees} EGP
  `,
    )
    .join("\n");

  const systemInstructions = `
    You are MedFlow's empathetic medical triage assistant. 
    A patient will describe their symptoms. Below is the list of top matching doctors from our database.
    
    Available Doctors:
    ${doctorsList}

    Your tasks:
    1. Acknowledge the symptoms empathetically.
    2. Suggest the type of specialist they likely need.
    3. Recommend the specific doctors provided in the list above.
    4. Advise booking an appointment for a formal medical opinion. Do not diagnose.
    Keep the response concise, professional, and friendly.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: symptoms,
      config: {
        systemInstruction: systemInstructions,
        temperature: 0.3,
      },
    });

    return response.text;
  } catch (e) {
    const errorMessage = e.response?.data?.error || e.message;
    throw new Error(`Gemini Error: ${errorMessage}`);
  }
};
