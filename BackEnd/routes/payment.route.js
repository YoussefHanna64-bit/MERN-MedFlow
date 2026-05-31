import express from "express"
import paymentController from "../controllers/payment.controller.js"


const paymentRouter = express.Router()


paymentRouter.route("/create-intent")
    .post(paymentController.createIntent)

/*
    The middleware here makes this route specifically ignore the middleware: express.json()
    to validate the originally string sent by stripe to validate the payment transaction
*/

paymentRouter.route("/webhook")
    .post(express.raw({ type: 'application/json' }), paymentController.confirmPayment_webHook)

export default paymentRouter
