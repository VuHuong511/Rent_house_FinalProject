require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to RentRoom.");
});

const calculateOrderAmount = () => {
  return 1400 * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { description } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
