const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


//  // Stripe
router.post('/stripe/charge',  async (req, res) => {
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id } = req.body; 
    console.log("stripe-routes.js 10 | amount and id", amount, id);
    
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Your Company Description",
        payment_method: id,  // Используем paymentMethod.id, который передается с фронтенда
        confirm: true,
        return_url: "http://localhost:3000/payment/success", 
      });
      
      console.log("stripe-routes.js 19 | paymentIntent", paymentIntent);
      res.json({
        message: "Payment Successful",
        success: true,
      });
    }  catch (error) {
      console.log("Stripe payment error:", error);  
      res.status(400).json({
        message: "Payment Failed",
        success: false,
        error: error.message,  // Возвращаем сообщение об ошибке
      });
    }
});  

module.exports = router;
