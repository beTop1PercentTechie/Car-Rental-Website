// Need stripe config and booking model(imports)
const stripe = require('../config/stripe');
const Booking = require('../models/bookingModel')


// Create Payment intent
const createPaymentIntent = async (req, res) => {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId).populate('carId')

    if(!booking) {
        return res.status(404).json({ message: 'Booking not found' })
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: booking.totalAmount * 100,
        currency: 'usd',
        metadata: {
            bookingId: booking._id.toString(),
            carId: booking.carId._id.toString(),
            userId: req.user._id.toString()
        }
    })

    res.json({
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret
    })
}


// Confirm Payment
const confirmPayment = async (req, res) => {
    const { bookingId, paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrive(paymentIntentId);

    switch (paymentIntent.status) {
        case "succeeded":
            const booking = await Booking.findById(bookingId)
                .populate('userId', 'name email')
                .populate('cardId', 'name brand model')
            booking.status = 'confirmed'
            await booking.save();

            const recipt = await generateRecipt(booking, paymentIntent);

            return res.json({
                message: 'payment confirmed successfully',
                booking,
                recipt
            })
        case 'processing':
            return res.status(202).json({message: 'payment is still processing'})
        case 'require_payment_method':
            return res.status(400).json({message: 'payment failed'})
        default: 
            return res.status(400).json({
                message: `Payment status: ${paymentIntent.status}. Please contact support`
            })
    }
}
