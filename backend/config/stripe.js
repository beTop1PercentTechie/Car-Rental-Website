const dotenv = require('dotenv')
dotenv.config()

if(!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key is missing')
}


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
module.exports = stripe