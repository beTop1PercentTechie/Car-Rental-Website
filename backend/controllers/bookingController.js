const Booking = require('../models/bookingModel');
const Car = require('../models/carModel');

// Create booking
const createBooking = async (req, res) => {
    try {
      const {
        carId,
        userId,
        startDate,
        endDate,
        pickupTime,
        dropoffTime,
        pickupLocation,
        dropoffLocation,
        totalAmount
      } = req.body;

      // Validate Dates
      const start = new Date(startDate)
      const end = new Date(endDate)

      if(isNaN(start.getTime()) || isNaN(end.getTime())){
        return res.status(400).json({
            success: false,
            message: 'Invalid date format'
        })
      }

      if(start > end) {
        return res.status(400).json({
            success: false,
            message: 'Start date must be before end date'
        })
      }

      const car = await Car.findById(carId)
      if(!car) {
        return res.status(404).json({
            success: false,
            message: 'Car not found'
        })
      }

      if (!car.isAvaible){
        return res.status(400).json({
            success: false,
            message: 'Car is not available for rental'
        })
      }


      const exsistingBooking = await Booking.findOne({
        carId,
        status: { $nin: ['cancelled', 'completed'] },
        $or: [
            {
                startDate: { $lte: end },
                endDate: { $gte: start }
            }
        ]
      })
      if(exsistingBooking) {
        return res.status(400).json({
            success: false,
            message: 'Car is already booked.'
        })
      }

      const booking = await Booking.create({
        carId,
        userId,
        startDate,
        endDate,
        pickupTime,
        dropoffTime,
        pickupLocation,
        dropoffLocation,
        totalAmount,
        status: 'pending'
      });

      res.status(201).json({
        success: true,
        data: {
            _id: booking._id,
            carId: booking.carId,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            totalAmount: booking.totalAmount,
            status: booking.status
        }
      })

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
}

// Update booking status
const updateBookingStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // validate status
      const validStatus = ['pending', 'confirmed', 'cancelled', 'completed'];
      if(!validStatus.includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status'
        })
      }

      const booking = await Booking.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      )

      res.json({
        success: true,
        data: booking
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
}

// get the users booking
const getUserBookings = async (req, res) => {
    try {
      if(!req.user || !req.user._id){
        return res.status(401).json({
            success: false,
            message: 'User is not authed'
        })
      }

      const userId = req.user._id;

      const bookings = await Booking.find({userId})
        .populate({
            path: 'carId',
            select: 'name brand model year price image fuelType transmission seats features'
        })
      
      const formattedBooking = bookings.map(booking => ({
            _id: booking._id,
            carId: booking.carId,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            totalAmount: booking.totalAmount,
            status: booking.status
      }))

      res.json({
        success: true,
        data: formattedBooking
      })

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
}

// get booking by id
const getBookingById = async (req, res) => {
    try {
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
}

// cancel booking
const cancelBooking = async (req, res) => {
    try {
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
}

module.exports = { createBooking, updateBookingStatus, getUserBookings, getBookingById, cancelBooking }