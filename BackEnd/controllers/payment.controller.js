import  asyncWrapper  from '../middlewares/asyncWrapper.js'
import dotenv from "dotenv";
import Stripe from "stripe"

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const createIntent = asyncWrapper(async (req, res, next) => {

    // 1. Calculate the order total on the server to prevent price tampering
    const { amount } = req.body

    const intent = await stripe.paymentIntents.create({
        amount: Math.round(amount), //in cents
        currency: "USD",
        payment_method_types: ['card'],
    })

    res.send({
        clientSecret: intent.client_secret
    })
})

/*
    After payment transaction is successfully stripe send notification to this server
    by webhook but it must know the url to send to, so the url of deployed server is 
    entered in stripe dashboard then gives you back secret-key (WEB_HOOK_SECRET).
    You must acknowledge this notification to stripe again. 
*/
const confirmPayment_webHook = asyncWrapper(async (req, res) => {

    const sig = req.headers['stripe-signature'];
    let stripeEvent;

    try {
        // This line checks if the request actually came from Stripe
        stripeEvent = stripe.webhooks.constructEvent(req.body, sig, process.env.WEB_HOOK_SECRET);
    } catch (err) {
        // If the signature is invalid, we stop immediately
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (stripeEvent.type === 'payment_intent.succeeded') {

        const paymentIntent = stripeEvent.data.object;
        console.log(`Payment for ${paymentIntent.amount} was successful!`);
        // Update your database here 
    }

    // Must be sent to stripe server
    //(if not stripe will send this notification again for 3 days then disable it if not acknowledged)
    res.json({ received: true });
})

export default { createIntent, confirmPayment_webHook }