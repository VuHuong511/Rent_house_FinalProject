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

const array = [];
const calculateOrderAmount = (items) => {
  items.map((item) => {
    const { regularPrice, discountedPrice } = item;
    const wishListItemAmount = regularPrice - discountedPrice;
    return array.push(wishListItemAmount);
  });
  const totalAmount = array.reduce((a, b) => {
    return a + b;
  }, 0);
  return totalAmount * 100000;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, description } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "vnd",
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
