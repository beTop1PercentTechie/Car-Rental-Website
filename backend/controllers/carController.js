const Car = require('../models/carModel');

// Add car
const addCar = async (req, res) => {
    try {
        if(!req.body || !req.file){
            return res.status(400).json({
                success: false,
                message: 'Missing required data or image'            
            })
        }
        //   Create car from data
        const car = await Car.create({
            name: req.body.name,
            brand: req.body.brand,
            model: req.body.model,
            year: parseInt(req.body.year),
            price: parseInt(req.body.price),
            seats: parseInt(req.body.seats),
            fuelType: req.body.fuelType.toLowerCase(),
            transmission: req.body.transmission.toLowerCase(),
            features: req.body.features,
            image: `/uploads/car/${req.file.filename}`,
            isAvaible: true,
            category: req.body.category
        })

        res.status(201).json({
            success: true,
            data: car
        })

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
}


// Get a single car by ID
const getCarById = async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);

      if (!car) {
        return res.status(404).json({message: 'car not found'});
      }

      const carDetails = {
        id: car._id,
        name: car.name,
        price: car.price,
        image: car.image,
        category: car.category,
        availble: car.isAvaible,
        feature: car.features || [],
        power: car.power,
        speed: car.speed,
        transmission: car.transmission,
        fuelType: car.fuelType,
        seatingCapacity: car.seats,
        category: car.category
      }

      res.json(carDetails)
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
}


// Search cars
const searchCars = async (req, res) => {
    try {
      const {
        search,
        priceRange,
        category,
        sortBy = 'name',
        page = 1,
        limit = 12
      } = req.query;
    
      let query = {};

      if(search) {
        query.$or = [
            {name: { $regex: search, $options: 'i' }},
            { category: { $regex: search, $options: 'i' } }
        ]
      }

      if(category) {
        query.category = category;
      }

      if(priceRange) {
        switch(priceRange) {
            case 'under50':
                query.price = {$lt: 50};
                break;
            case '50to100':
                query.price = { $gte: 50, $lt: 100 };
                break;
            case 'over100':
                query.price = { $gte : 100 };
                break;
        }
      }

    //   Sort options
    let sortOptions = {}
    switch (sortBy) {
        case 'price-low':
            sortOptions = { price: 1};
            break;
        case 'price-high':
            sortOptions = { price: -1 };
            break;
        default:
            sortOptions: { name: 1 };
    }

    const skip = (page - 1) * limit;

    const cars = await Car.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .select('name price image category isAvailable features power speed transmission fuelType seats model year brand')
    
    const totalItems = await Car.countDocuments(query);
    const categories = await Car.distinct('category');

    const formattedCars = cars.map(car => ({
        id: car._id,
        name: car.name,
        price: car.price,
        image: car.image,
        category: car.category,
        availble: car.isAvaible,
        features: car.features || [],
        transmission: car.transmission,
        fuelType: car.fuelType,
        seatingCapacity: car.seats
    }));

    res.json({
        cars: formattedCars,
        pagination: {
            currentPage: parseInt(page),
            totalPage: Math.ceil(totalItems / limit),
            totalItems
        },
        categories
    })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
}


const getCarImage = async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if(!car || !car.image) { 
        return res.status(404).json({message: 'Car image not found'})
      }

      res.json({imageUrl: car.image})
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
}



// Check car availibility