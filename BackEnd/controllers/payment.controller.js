import asyncWrapper from "../middlewares/asyncWrapper.js";
import dotenv from "dotenv";
import Stripe from "stripe";
import httpStatus from "../utils/httpStatus.js";
import appError from "../utils/appError.js";
import Appointment from "../models/appointement.js";
import {createNotification} from "../utils/createNotification.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createIntent = asyncWrapper(async (req, res, next) => {
  // 1. Calculate the order total on the server to prevent price tampering
  const { amount, appointmentId } = req.body;
  if (!appointmentId) {
    return next(
      appError.create(
        "Appointment ID is required to create a payment intent.",
        400,
        httpStatus.FAIL,
      ),
    );
  }

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(amount), //in cents
    currency: "USD",
    payment_method_types: ["card"],
    metadata: {
      appointmentId: appointmentId,
    },
  });

  res.send({
    clientSecret: intent.client_secret,
  });
});

/*
    After payment transaction is successfully stripe send notification to this server
    by webhook but it must know the url to send to, so the url of deployed server is 
    entered in stripe dashboard then gives you back secret-key (WEB_HOOK_SECRET).
    You must acknowledge this notification to stripe again. 
*/
const confirmPayment_webHook = asyncWrapper(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let stripeEvent;

  try {
    // This line checks if the request actually came from Stripe
    stripeEvent = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEB_HOOK_SECRET,
    );
  } catch (err) {
    // If the signature is invalid, we stop immediately
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (stripeEvent.type === "payment_intent.succeeded") {
    const paymentIntent = stripeEvent.data.object;
    console.log(`Payment for ${paymentIntent.amount} was successful!`);
    if (!appointmentId) {
      console.error(
        "⚠️ Webhook warning: Payment succeeded but no appointmentId found in metadata.",
      );
      return res.json({ received: true });
    }

    try {
      const appointment = await Appointment.findById(appointmentId)
        .populate({
          path: "doctor",
          populate: { path: "user", select: "_id name" },
        })
        .populate("patient", "name");

      if (!appointment) {
        const recordNotFoundError = appError.create(
          "Target appointment record not found in database.",
          404,
          httpStatus.FAIL,
        );
        console.error("💥 DB EXCEPTION:", recordNotFoundError.message);
        return res.json({ received: true }); // Acknowledge to stop retries
      }

      // Update database attributes
      appointment.status = "confirmed";
      appointment.paymentStatus = "paid";
      await appointment.save();

      const formattedDate = new Date(appointment.date).toLocaleDateString(
        "en-US",
        { dateStyle: "medium" },
      );

      // 🔔 NOTIFICATION TO DOCTOR
      await createNotification(
        appointment.doctor.user._id,
        appointment.patient._id,
        "New Booking Confirmed 💳",
        `Patient ${appointment.patient.name} has successfully confirmed and paid for the slot on ${formattedDate} at ${appointment.timeSlot}.`,
        next,
      );

      // 🔔 NOTIFICATION TO PATIENT
      await createNotification(
        appointment.patient._id,
        appointment.doctor.user._id,
        "Payment Successful & Confirmed! 🎉",
        `Your booking with Dr. ${appointment.doctor.user.name} on ${formattedDate} at ${appointment.timeSlot} has been confirmed.`,
        next,
      );
    } catch (dbError) {
      const backgroundProcessingError = appError.create(
        `Database write failure during payment processing: ${dbError.message}`,
        500,
        httpStatus.ERROR,
      );
      console.error(
        "💥 CRITICAL BACKEND ERROR:",
        backgroundProcessingError.message,
      );
    }
  }

  // Must be sent to stripe server
  //(if not stripe will send this notification again for 3 days then disable it if not acknowledged)
  res.json({ received: true });
});

export default { createIntent, confirmPayment_webHook };
