const express = require("express");
const { STRIPE_SECRET_KEY } = require("./constants");
const app = express();
const stripe = require("stripe")(STRIPE_SECRET_KEY);

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100"); // for ionic serve
    // res.header("Access-Control-Allow-Origin", "capacitor://localhost"); // for ionic capacitor run ios/android
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/payment", async (req, res) => {
    const { product, routes } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
            price_data: {
                currency: "USD",
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: product.amount * 100,
            },
            quantity: product.quantity,
        }],
        mode: "payment",
        success_url: routes.success_url,
        cancel_url: routes.cancel_url,
    });
    res.json({ id: session.id });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));